const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: "./script.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(mp3)$/,
                use: ["file-loader"],
            },
        ]
    }
}