module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // NOTE: This must be the last plugin
      'react-native-reanimated/plugin',
    ],
  };
};


