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
        "https://cdn.scredit.sg/th/seada/live/react-components@0.1.2/lowcode/view.js",
        "https://cdn.scredit.sg/th/seada/live/react-components@0.1.2/lowcode/view.css"
      ],
      "editUrls": [
        "https://cdn.scredit.sg/th/seada/live/react-components@0.1.2/lowcode/view.js",
        "https://cdn.scredit.sg/th/seada/live/react-components@0.1.2/lowcode/view.css"
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
      "url": "https://cdn.scredit.sg/th/seada/live/react-components@0.1.2/lowcode/meta.js",
      "urls": {
        "default": "https://cdn.scredit.sg/th/seada/live/react-components@0.1.2/lowcode/meta.js"
      }
    }
  ]
}
```
