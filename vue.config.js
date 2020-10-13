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
        themeColor: '#2a2aee',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
    }
}