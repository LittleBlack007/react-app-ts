const {createProxyMiddleware } =  require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    createProxyMiddleware('/openai', { // openAI 接口
      target: process.env.OPEN_AI_URL,
      changeOrigin: true,
      pathRewrite: { '^/openai': '' }
    }),
    createProxyMiddleware('/api', {
      target: process.env.SERVER_URL,
      changeOrigin: true,
      pathRewrite: { '^/test': '' }
    }),
  )
}