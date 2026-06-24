const { createProxyMiddleware } = require("http-proxy-middleware");

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

module.exports = function (app) {
  app.use(
    ["/api", "/uploads"],
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
    })
  );
};
