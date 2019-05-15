module.exports = {
    devServer : {
        open : true,
        port : 8888,
        proxy : {
            "/chu" : {
                target : "http://127.0.0.1",
                changeOrigin : true,
                pathRewrite : {
                    "^/chu" : ""
                }
            }
        }
    }
}