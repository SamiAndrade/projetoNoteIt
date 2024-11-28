// config-overrides.js
module.exports = {
    webpack: (config, env) => {
      // Configura fallbacks para os módulos nativos do Node.js
      config.resolve.fallback = {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),
        assert: require.resolve('assert/')
      };
  
      return config;
    },
  };
  