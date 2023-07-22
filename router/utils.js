
const qs = require('querystring');

const { getLogger } = require('../logger');

const logger = getLogger(module.id);

function pageMiddleware({ requiresAuth, pageName, beforeLoad }) {
    return function (req, res, next) {
        asyncMiddleware(req, res, next).catch(e => {
            logger.error(e);
            next(e)
        });
    };

    async function asyncMiddleware(req, res, next) {
        /** @type {import('express-session').Session} */
        const session = req.session || {};

        const { userId, username } = session;
        const loggedIn = (userId != null);

        if (requiresAuth) {
            logger.debug(`The '${pageName}' page requires authentication.`);
            if (!loggedIn) {
                logger.warn(`The user is not logged in. Redirecting...`);
                res.redirect('/login?returnTo=' + qs.escape(req.url));
                return;
            } else {
                logger.debug(`The user is logged in as '${username}'. Proceeding to render page.`);
            }
        }

        let initialData = null;
        if (beforeLoad != null) {
            logger.debug(`The '${pageName}' page requires some data. Loading...`);
            try {
                initialData = await beforeLoad({ params: req.params, session: req.session });
            } catch (e) {
                logger.warn(e);
                next(e);
                return;
            }
        }
        
        res.render('model', { scriptPath: `/${pageName}.js`, sessionData: { loggedIn, userId, username }, initialData });
    }
}

module.exports.pageMiddleware = pageMiddleware;
