# 舒翔个人作品集网站

这是一个基于 React + Vite 的个人作品集基础版本，用于展示个人能力、精选项目和联系方式。

## 运行命令

```bash
npm install
npm run dev
```

## 构建命令

```bash
npm run build
npm run preview
```

## GitHub 上传提醒

- 不要把 `node_modules` 上传到 GitHub，它可以通过 `npm install` 自动安装。
- 不要上传 `.env` 或包含手机号、真实微信号、邮箱密码等隐私信息的文件。
- `dist` 是打包产物，通常也不需要提交到源码仓库。

## 后续替换内容

- `src/assets/avatar.jpg`：头像图片。
- `src/components/Hero.jsx`：首页一句话介绍和个人定位。
- `src/components/About.jsx`：个人经历、联系方式、项目数据。
- `src/components/Projects.jsx`：真实项目名称、介绍、职责、亮点、标签和项目图片。
- `src/components/Strengths.jsx`：真实能力描述或案例。
- `src/components/Contact.jsx`：结束语、公开联系方式、服务范围。
