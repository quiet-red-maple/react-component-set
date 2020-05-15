// @ts-ignore

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/femaleNameApi', { 
       target: 'https://www.apiopen.top' ,
       secure: false,
       changeOrigin: true,
      //  pathRewrite: {
      //   "^/souche/api": "/"
      //  }
    }));

    app.use(proxy('/fast', {
      target: 'http://abex.co',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/fast": "/"
      }
    }));
};