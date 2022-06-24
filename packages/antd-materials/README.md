# antd-materials

- ProContainer
- ProDrawer
- ProModal
- ProPopconfirm
- ProTable

## 开发

1. 在根目录执行 yarn start
2. 进入 antd-materials 目录，yarn lowcode:dev
3. 配置 XSwitch 代理
4. 访问 http://localhost:8000

XSwitch 代理如下

```json
{
  "proxy": [
    [
      "https://unpkg.com/@seada/antd-materials@latest/build/lowcode/view.js",
      "http://localhost:5551/view.js"
    ],
    [
      "https://unpkg.com/@seada/antd-materials@latest/build/lowcode/meta.js",
      "http://localhost:5551/meta.js"
    ]
  ]
}
```
