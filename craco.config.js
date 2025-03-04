/* eslint-disable @typescript-eslint/no-var-requires */
//对webpack配置别名
// eslint-disable-next-line no-undef
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const LogServerAddressPlugin =  require("./src/utils/LogServerPlugin");

// eslint-disable-next-line no-undef
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src'),
    },
    // 插件
    plugins: [
      new LogServerAddressPlugin(),
      new CopyPlugin({
        patterns:[{
          from: path.resolve(__dirname, './version.json'),
          to: path.resolve(__dirname, './build/version.json'),
          transform(){
            return new Date().toLocaleString();
          }
        }]
        
      })
    ]
  },
}