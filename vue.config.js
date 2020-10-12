module.exports = {
    publicPath: './',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '趣考研 :) 待办事项'
                return args
            })
    },
    pwa: {
        name: '趣考研待办事项',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // 配置 workbox 插件
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
        // InjectManifest 模式下 swSrc 是必填的。
        swSrc: 'src/sw.js',
        // ...其它 Workbox 选项...
        }     
    }
}