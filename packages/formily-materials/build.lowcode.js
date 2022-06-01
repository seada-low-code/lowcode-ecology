// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('@ant-design/icons');

const library = 'SeadaFormilyMaterials';

module.exports = {
  alias: {
    '@': './src',
  },
  plugins: [
    [
      // 插件文档：https://fusion.design/help.html/iuu6cm#xJBge
      '@alifd/build-plugin-lowcode',
      {
        noParse: true,
        engineScope: '@alilc',
        library,
        npmInfo: {
          package: name,
          version,
        },
        lowcodeDir: 'lowcode',
        entryPath: 'src/index.tsx',
        staticResources: {
          engineCoreCssUrl:
            'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/css/engine-core.css',
          // engineExtCssUrl: 'https://unpkg.com/@alilc/lowcode-engine-ext@1.0.0-beta.1/dist/css/engine-ext.css',
          engineCoreJsUrl:
            'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/js/engine-core.js',
          engineExtJsUrl:
            'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/js/engine-ext.js',
        },
      },
    ],
    './build.plugin.js',
  ],
};
