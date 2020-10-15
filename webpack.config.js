const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./example/index.html"),
    filename: "./index.html",
});

module.exports = {
    entry: ["core-js/es/map","core-js/es/set",path.join(__dirname, "./example/app.tsx")],
    output: {
        path: path.join(__dirname, "./example/dist"),
        filename: "index.js",
        //libraryTarget: "commonjs2",
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
        ],
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    // externals: [
    //     // nodeExternals(),
    //     {
    //         react: {
    //             root: "React",
    //             commonjs2: "react",
    //             commonjs: "react",
    //             amd: "react",
    //         },
    //         "react-dom": {
    //             root: "ReactDOM",
    //             commonjs2: "react-dom",
    //             commonjs: "react-dom",
    //             amd: "react-dom",
    //         },
    //     },
    // ],
    // devtool: "source-map", 
    devtool:'cheap-module-source-map',
    devServer: {
        port: 9000,
    },
};
