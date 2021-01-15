const path = require('path');

module.exports = {
  // productionSourceMap: false,
  filenameHashing: false,
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 3001,
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    resolve: {
      alias: {
        '@': path.resolve('src'),
        Scss: path.resolve(__dirname, 'src/styles/scss'),
      },
    },
    optimization: {
      splitChunks: {
        maxAsyncRequests: 1,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugins
      .delete('pwa')
      .delete('workbox')
      .delete('prefetch');
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          $ENV: ${process.env.NODE_ENV};
          $VER_PATH: ${process.env.VUE_APP_VERSION_PATH};
        `,
      },
    },
  },
};
