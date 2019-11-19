const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const { VueLoaderPlugin } = require('vue-loader')

const basePath = path.resolve(__dirname)
const distPath = path.resolve(__dirname, '../apps/dists/clients')
const webDevPath = path.resolve(__dirname, '../web-dev')

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: `${basePath}/src/app.js`,
    output: {
        path: `${distPath}`,
        filename: 'app.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: {
            rewrites: [
                {
                    from: /.*/,
                    to: path.posix.join('/', 'src/index.html')
                }
            ]
        },
        index: `./src/index.html`,
        contentBase: webDevPath
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js|\.vue$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            noquotes: true,
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|woff|woff2|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: `./src/index.html`,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        })
    ]
}
