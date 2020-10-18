module.exports = {
    publicPath: './',
    productionSourceMap: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = ':) 待办事项'
                return args
            })
    },
    pwa: {
        name: '待办事项',
        themeColor: '#aeaeae',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

/*         workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js'
        } */
    }
}