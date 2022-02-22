/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const {getDefaultConfig} = require('metro-config');
const {resolver: defaultResolver} = getDefaultConfig.getDefaultValues();

module.exports = {
  transformer: {
    // getTransformOptions: async () => ({
    //   transform: {
    //     experimentalImportSupport: false,
    //     inlineRequires: true,
    //   },
    // }),
  },
  resolver: {
    // ...defaultResolver,
    sourceExts: [...defaultResolver.sourceExts, 'cjs'],
  },
};

// const {getDefaultConfig} = require('metro-config');
// module.exports = (async () => {
//   const {
//     resolver: {sourceExts, assetExts},
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       // babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     },
//     resolver: {
//       // assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'cjs'],
//     },
//   };
// })();
