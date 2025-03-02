/* eslint-disable @typescript-eslint/no-var-requires */
//对webpack配置别名
// eslint-disable-next-line no-undef
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

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
    configure: (webpackConfig, { env, paths }) => {
      !webpackConfig.devServer ? webpackConfig.devServer = {} : null;
      if(env === 'development') {
        webpackConfig.devServer.after = (app, server, compiler) => {
          const address = server.options.host || 'localhost';
          const port = server.options.port || 3000;
          console.log(`\nProject is running at http://${address}:${port}\n`);
        }
      }
      return webpackConfig;
    },
    // 插件
    plugins: [
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