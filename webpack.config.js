const webpack = require('webpack')
const TimePlugin = require('./custom-plugin/time-plugin')

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    devtool: false,
    plugins: [new TimePlugin()],
    cache: {
        // 1. 将缓存类型设置为文件系统
        type: 'filesystem',
        buildDependencies: {
          // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
          config: [__filename],
    
          // 3. 如果你有其他的东西被构建依赖，你可以在这里添加它们
          // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
        },
    },
}