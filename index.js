const express = require('express');
const webpack = require('webpack');
const bodyParserMiddleware = require('body-parser')
const webpackDevMiddleware = require('webpack-dev-middleware');
const sessionMiddleware = require('express-session');
const FileStore = require('session-file-store')(sessionMiddleware);

const { pagesRouter } = require('./router/pages');
const { apiRouter } = require('./router/api');

const { PORT, FRONT_COMPILATION, NODE_ENV } = process.env;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './front/templates');

async function prepareFrontMiddleware() {
    const webpackConfig = require('./webpack.config');
    webpackConfig.mode = NODE_ENV;

    const compiler = webpack(webpackConfig);
    if (FRONT_COMPILATION == 'live') {
        return webpackDevMiddleware(compiler, {});
    } else {
        if (FRONT_COMPILATION == 'once') {
            const fs = require('fs');
            const path = require('path');
            fs.readdirSync(webpackConfig.output.path).forEach(file => {
                fs.unlinkSync(path.join(webpackConfig.output.path, file));
            });
            const compilation = await new Promise((resolve, reject) => compiler.compile((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }));
            await new Promise((resolve, reject) => compiler.emitAssets(compilation, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }));
        }
        return express.static(webpackConfig.output.path, { fallthrough: true });
    }
}

prepareFrontMiddleware().then(frontRouter => {
    const fileStoreOptions = {};

    app.use(bodyParserMiddleware.json());
    app.use(bodyParserMiddleware.urlencoded({ extended: true }))
    app.use(sessionMiddleware({
        secret: 'viva o alquymia!',
        store: new FileStore(fileStoreOptions),
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 600000 }
    }));
    app.use(frontRouter);
    app.use('/api', apiRouter);
    app.use(pagesRouter);

    app.listen(parseInt(PORT), () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
