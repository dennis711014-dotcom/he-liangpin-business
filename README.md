# 和优良品·海上花岛经营管理系统

这是一个面向门店和运营团队的管理系统 MVP，包含后端 API 服务和 Web 管理后台。

## 目录结构

- `backend/`：Express + TypeScript 后端服务
- `admin/`：React + Vite 管理后台

## 本地运行

### 1. 后端

进入 `backend/` 并安装依赖：

```bash
cd backend
npm install
```

运行开发模式：

```bash
npm run dev
```

后端默认监听：

- `http://127.0.0.1:3000`

### 2. 管理后台

进入 `admin/` 并安装依赖：

```bash
cd ../admin
npm install
```

运行开发模式：

```bash
npm run dev
```

默认启动后，可访问：

- `http://127.0.0.1:5173`

> 请确保后端服务已启动，否则管理后台无法正常获取订单、客户、商品和促销数据。

## 功能概览

- 订单管理
- 客户管理
- 商品管理
- 促销管理
- 管理后台登录与页面切换

## 代码说明

- `backend/src/`：后端路由与控制器
- `admin/src/`：前端页面组件与数据交互

## GitHub 仓库

已推送到：

`https://github.com/dennis711014-dotcom/he-liangpin-business.git`

如果需要，我也可以继续帮你补充部署文档、生产环境配置或 CI 工作流。