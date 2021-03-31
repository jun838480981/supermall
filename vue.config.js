const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack:(config)=>{
    config.resolve.alias
    //set第一个参数：设置的别名，第二个参数：设置的路径
    .set('common',resolve('./src/common'))
    .set('assets',resolve('./src/assets'))
    .set('components',resolve('./src/components'))
    .set('network',resolve('./src/network'))
    .set('views',resolve('./src/views'))
    //注意 store 和 router 没必要配置
  }
}

// configureWebpack: {
//   resolve: {
//     alias: {
//       'assets' : './src/assets',
//       'common' : './src/common',
//       'components' : './src/components',
//       'network' : './src/network',
//       'views' : './src/views'
//     }
//   }
// }