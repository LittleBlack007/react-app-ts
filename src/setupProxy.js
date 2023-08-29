const {createProxyMiddleware } =  require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    createProxyMiddleware('/openai', { // openAI 接口
      target: 'http://10.20.4.66:3001',
      changeOrigin: true,
      pathRewrite: { '^/openai': '' }
    }),
    createProxyMiddleware('/test', {
      target: 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: { '^/test': '' }
    }),
  )
}