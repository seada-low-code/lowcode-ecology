# formily materials

## how to use

1. 安装注册插件

2. assets.json 中添加资产包

```json
{
  "packages": [
    {
      "package": "@seada/formily-materials",
      "version": "0.1.1",
      "library": "SeadaFormilyMaterials",
      "urls": [
        "https://cdn.jsdelivr.net/npm/@seada/formily-materials@latest/build/lowcode/view.js",
        "https://cdn.jsdelivr.net/npm/@seada/formily-materials@latest/build/lowcode/view.css"
      ],
      "editUrls": [
        "https://cdn.jsdelivr.net/npm/@seada/formily-materials@latest/build/lowcode/view.js",
        "https://cdn.jsdelivr.net/npm/@seada/formily-materials@latest/build/lowcode/view.css"
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
      "url": "https://cdn.jsdelivr.net/npm/@seada/formily-materials@latest/build/lowcode/meta.js",
      "urls": {
        "default": "https://cdn.jsdelivr.net/npm/@seada/formily-materials@latest/build/lowcode/meta.js"
      }
    }
  ]
}
```
