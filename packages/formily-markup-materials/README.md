# Formily Markup Materials

### 开发

#### 方式一

1. 在根目录执行 yarn start
2. 进入 formily-markup-materials 目录，yarn lowcode:dev
3. 配置 XSwitch 代理
4. 访问 http://localhost:8000

XSwitch 代理如下

```json
{
  "proxy": [
    [
      "https://unpkg.com/@seada/formily-markup-materials@latest/build/lowcode/view.js",
      "http://localhost:5551/view.js"
    ],
    [
      "https://unpkg.com/@seada/formily-markup-materials@latest/build/lowcode/meta.js",
      "http://localhost:5551/meta.js"
    ],
    [
      "https://unpkg.com/@seada/formily-markup-materials@latest/build/lowcode/view.css",
      "http://localhost:5551/view.css"
    ]
  ]
}
```

#### 方式二

1. cd packages/formily-markup-materials
2. yarn lowcode:dev
3. 访问 http://localhost:5551
