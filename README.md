# lowcode-ecology

阿里[lowcode-engine](https://lowcode-engine.cn/)生态项目，基于 antd 和 formily 组件库实现，包括 plugins、setters 和 materials。

## 开发

首先在项目根目录安装依赖：

```bash
// 根目录安装依赖
yarn
```

### setters 和 plugins 开发

直接到 `packages/antd-setters` 和 `packages/antd-plugins` 中开发即可。具体效果可以通过启动 demo 项目进行调试。

demo 项目基于 umi4 实现，配置 alias 指向 packages 里面的包，修改 packages 里面的代码可以实现热更新调试。

```bash
// 在 demo 目录或者项目根目录执行 yarn start 启动 demo，打开lcoalhost:8000即可访问
yarn start
```

### materials 开发

项目根目录下执行以下命令：

```bash
// 开发调试
yarn start:materials

// 构建物料
yarn build:materials
```

## formily materials

[formily materials 文档](packages/formily-materials/README.md)
