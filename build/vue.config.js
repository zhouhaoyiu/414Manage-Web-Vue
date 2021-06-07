const path = require('path');
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
// const webpack = require('webpack')

let PROXY = {
    test: {
        '/api/class': {
            target: 'https://server2.19x19.com/api/training',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/class': ''
            }
        },
        '/api/user':{
            target: 'https://server2.19x19.com/api/user',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/user': ''
            }
        },
        '/api/engine':{
            target: 'https://server2.19x19.com/api/engine',
            // target: 'https://tate.19x19.com/api/engine',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/engine': ''
            }
        },
        
        '/api/auth':{
            target: 'https://server2.19x19.com/api/auth',
            // target: 'https://tate.19x19.com/api/auth',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/auth': ''
            }
        },
        '/api/training': {
            target: 'https://server2.19x19.com/api/training',
            // target: 'https://tate.19x19.com/api/training',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/training': ''
            }
        },
        '/staticApi':{
            target: 'https://assets.19x19.com/',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/staticApi': ''
            }
        },
        '/api/game': {
            target: 'http://222.74.63.156:8089',
            // target: 'https://tate.19x19.com/api/training',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/game': ''
            }
        },
        '/api/school': {
            target: 'https://server2.19x19.com/api/school',
            // target: 'http://server2.19x19.com:8081',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/school': ''
            }
        }
        // '222.74.63.156:8089'
    },
    local: {
        '/api/auth':{
            target: 'http://10.16.1.116:8083',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/auth': ''
            }
        },
        '/api/user':{
            target: 'http://10.16.1.116:8084',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/user': ''
            }
        },
        '/api/engine':{
            target: 'http://10.16.1.116:8084',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/engine': ''
            }
        },
        '/api/class': {
            target: 'http://10.16.1.116:8085',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/class': ''
            }
        },
        '/api/training': {
            target: 'http://10.16.1.116:8085',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/training': ''
            }
        },
        '/staticApi':{
            target: 'http://assets.19x19.com/',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/staticApi': ''
            }
        },
    },
    pro: {
        '/api/auth':{
            // target: 'https://www.19x19.com:8083',
            target: 'https://api.19x19.com/api/auth',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/auth': ''
            }
        },
        '/api/user':{
            target: 'https://www.19x19.com:8084',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/user': ''
            }
        },
        '/api/engine':{
            target: 'https://api.19x19.com/api/engine',
            // target: 'https://www.19x19.com:8084',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/engine': ''
            }
        },
        '/api/class': {
            target: 'https://server1.19x19.com:8085',
            // target: 'https://server2.19x19.com:9005',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/class': ''
            }
        },
        '/api/training': {
            target: 'https://server1.19x19.com/api/training',
            // target: 'https://api.19x19.com/api/training',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/training': ''
            }
        },
        '/staticApi':{
            target: 'https://assets.19x19.com/',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/staticApi': ''
            }
        },
        '/api/school': {
            target: 'https://www.19x19.com/api/school',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api/school': ''
            }
        }
    }
}
let model = 'test'
// let model = 'local'
// let model = 'pro'
let proxyData = PROXY[`${model}`]
module.exports = {
    // baseUrl: '/',
    // publicPath: process.env.NODE_ENV === 'production' ? 'https://assets.weiqiai.com' : '/',
    publicPath: '/',
    productionSourceMap: false,
    devServer: {
        // open: false,
        https: false,
        // host: 'localhost',
        port:8081,
        proxy: proxyData
    },
    configureWebpack: (config)=>{
        if(process.env.NODE_ENV === 'production'){
          config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
        if (process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [
                // new PrerenderSPAPlugin({
                //     // 生成文件的路径，也可以与webpakc打包的一致。
                //     // 下面这句话非常重要！！！
                //     // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                //     staticDir: path.join(__dirname,'dist'),
                //     // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                //     routes: ['/intro', '/productIntro', '/contactus', '/weblink', '/linkContent/link1', '/engineOl'],
                //     // 这个很重要，如果没有配置这段，也不会进行预编译
                //     renderer: new Renderer({
                //         inject: {
                //             foo: 'bar'
                //         },
                //         headless: false,
                //         // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                //         renderAfterDocumentEvent: 'render-event'
                //     })
                // }),


                
                // new webpack.ProvidePlugin({
                //     $: 'jquery',
                //     jQuery: 'jquery',
                //     'windows.jQuery': 'jquery'
                // })
            ],
        }
    },
    chainWebpack: (config) => {
        if(process.env.NODE_ENV === 'production'){
            // config.module.rule('images')
            // .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            // .use('image-webpack-loader')
            // .loader('image-webpack-loader')
            // .options({ bypassOnDebug: true })
          }
        config.module.rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('url-loader')
        .tap(options => {
            return {
            limit: 4096,
            fallback: {
                loader: 'file-loader',
                options: {
                    name: `img/[name].[ext]`
                    // name: 'http://assets.19x19.com/img/[name].[ext]'
                }
            }
            };
        })

        // 处理vue-pdf打包文件404
        config.module
        .rule('worker')
        .test(/\.worker\.js$/)
        .use('worker-loader').loader('worker-loader')
        .options({
            inline: true,
            fallback: false,
        }).end();
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/css/global.less'),
            ],
        },
    },
    // plugins: [
    //     new PrerenderSPAPlugin({
    //         staticDir: path.join(__dirname, '../dist'), 
    //         // outputDir: path.join(__dirname, '../prerendered'),
    //         indexPath: path.join(__dirname, '../dist', 'index.html'), 
    //         routes: ['/intro', '/productIntro', '/contactus'], 
    //         renderer: new Renderer({
    //             inject: {
    //                 foo: 'bar'
    //             },
    //             headless: false, 
    //             renderAfterDocumentEvent: 'render-active' 
    //             // renderAfterElementExists: '.container', 
    //             // renderAfterTime: 5000 
    //         })
    //     })
    // ]
}
