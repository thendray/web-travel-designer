const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://51.250.77.99:8083",
    // proxy: "http://localhost:8083",
  },
});
