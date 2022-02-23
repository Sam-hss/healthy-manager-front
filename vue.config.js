module.exports = {
  filenameHashing: false,
  // webpack配置
  devServer: {
    open: true,
    host: "localhost",
    port: 8083,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
}
