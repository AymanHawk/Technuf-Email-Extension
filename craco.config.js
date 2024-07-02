module.exports = {
    webpack: {
      configure: {
        output: {
          filename: 'static/js/[name].js',
        },
        optimization: {
          splitChunks: {
            cacheGroups: {
              default: false,
            },
          },
        },
      },
    },
  };
  