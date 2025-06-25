# 文书查询系统前端

这是文书查询系统的前端项目，基于Vue 3、Element Plus构建。

## 功能特点

- 文书搜索：支持关键词、案由、案号、日期范围搜索
- 搜索结果展示：以卡片形式展示文书列表
- 文书详情：查看文书详细内容
- 响应式设计：适配不同屏幕尺寸

## 技术栈

- Vue 3 (Composition API)
- Element Plus
- Axios
- Vue Router
- Vite

## 运行环境要求

- Node.js 16+
- npm 或 yarn

## 安装与运行

```bash
# 安装依赖
npm install
# 或
yarn

# 开发环境运行
npm run dev
# 或
yarn dev

# 构建生产环境
npm run build
# 或
yarn build
```

构建完成后，生成的静态文件在`dist`目录下。

## 项目结构

```
frontend/
├── src/                  # 源代码
│   ├── api/              # API请求
│   ├── assets/           # 静态资源
│   ├── components/       # 组件
│   ├── router/           # 路由配置
│   ├── views/            # 页面视图
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── public/               # 公共资源
└── index.html            # HTML模板
```

## 与后端API对接

前端默认连接到`http://localhost:8000`的后端API。如需修改API地址，请编辑`src/api/http.js`文件中的`baseURL`。

## 浏览器兼容性

- Chrome
- Firefox
- Safari
- Edge 