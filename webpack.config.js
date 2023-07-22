const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fs = require('fs');

const distFolder = path.join(__dirname, "front-dist");
const srcFolder = path.join(__dirname, "front");

const pagesFolder = path.join(srcFolder, "pages");

const entry = {};
fs.readdirSync(pagesFolder).forEach(file => {
    if (file.endsWith('.js')) {
        entry[file.substring(0, file.length - 3)] = path.join(pagesFolder, file);
    }
    entry[file.substring()]
});

module.exports = {
    entry,
    output: {
        path: distFolder, // the bundle output path
        filename: "[name].js", // the name of the bundle
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // .js and .jsx files
                exclude: /node_modules/, // excluding the node_modules folder
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/, // styles files
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                loader: "url-loader",
                options: { limit: false },
            },
        ],
    },
};