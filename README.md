# lowcode-ecology

阿里[lowcode-engine](https://lowcode-engine.cn/)生态项目，基于 antd 和 formily 组件库实现，包括 plugins、setters 和 materials。

## 开发

首先在项目根目录安装依赖：

```bash
// 根目录安装依赖
yarn
```

## setters 和 plugins 开发

直接到 `packages/antd-setters` 和 `packages/antd-plugins` 中开发即可。具体效果可以通过启动 demo 项目进行调试。

demo 项目基于 umi4 实现，配置 alias 指向 packages 里面的包，修改 packages 里面的代码可以实现热更新调试。

```bash
// 在 demo 目录或者项目根目录执行 yarn start 启动 demo，打开lcoalhost:8000即可访问
yarn start
```

## Antd materials 开发

使用方式：

```json
{
  "packages": [
    {
      "package": "@seada/antd-materials",
      "version": "0.1.1",
      "library": "SeadaAntdMaterials",
      "urls": [
        "https://unpkg.com/@seada/antd-materials@0.0.1-alpha.11/build/lowcode/view.js",
        "https://unpkg.com/@seada/antd-materials@0.0.1-alpha.11/build/lowcode/view.css"
      ],
      "editUrls": [
        "https://unpkg.com/@seada/antd-materials@0.0.1-alpha.11/build/lowcode/view.js",
        "https://unpkg.com/@seada/antd-materials@0.0.1-alpha.11/build/lowcode/view.css"
      ]
    }
  ],
  "components": [
    {
      "exportName": "SeadaAntdMaterialsMeta",
      "npm": {
        "package": "@seada/antd-materials",
        "version": "0.1.1"
      },
      "url": "https://unpkg.com/@seada/antd-materials@0.0.1-alpha.11/build/lowcode/meta.js",
      "urls": {
        "default": "https://unpkg.com/@seada/antd-materials@0.0.1-alpha.11/build/lowcode/meta.js"
      }
    }
  ]
}
```

[Antd Pro 系列组件详细文档](packages/antd-materials)

## Formily materials

使用方式：

```json
{
  "packages": [
    {
      "package": "@seada/formily-materials",
      "version": "0.1.1",
      "library": "SeadaFormilyMaterials",
      "urls": [
        "https://unpkg.com/@seada/formily-materials@latest/build/lowcode/view.js",
        "https://unpkg.com/@seada/formily-materials@latest/build/lowcode/view.css"
      ],
      "editUrls": [
        "https://unpkg.com/@seada/formily-materials@latest/build/lowcode/view.js",
        "https://unpkg.com/@seada/formily-materials@latest/build/lowcode/view.css"
      ]
    }
  ],
  "components": [
    {
      "exportName": "SeadaFormilyMaterialsMeta",
      "npm": {
        "package": "@seada/formily-materials",
        "version": "0.1.1"
      },
      "url": "https://unpkg.com/@seada/formily-materials@latest/build/lowcode/meta.js",
      "urls": {
        "default": "https://unpkg.com/@seada/formily-materials@latest/build/lowcode/meta.js"
      }
    }
  ]
}
```

[Formily 物料详细文档](packages/formily-materials)
