module.exports = {
  devServer: {
    port: 8090,
    open: true,   // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://10.20.158.29:9000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
