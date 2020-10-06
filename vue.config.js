module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '趣考研 :) 计划管理'
                return args
            })
    }
}