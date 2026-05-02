# 电影网站优化计划

## Context
对现有电影搜索标记网站进行5项UI/数据优化，提升视觉质量和用户体验。

---

## 1. 电影封面图片 — 替换数据源

**问题：** TMDB CDN 的部分海报 URL 失效，导致图片加载失败显示 fallback。

**方案：** 移除 `<img>` 标签，改为使用 CSS 渐变背景 + 电影中文标题生成海报图。每张海报根据电影首个类型使用对应的类型颜色，确保 100% 可靠且视觉统一。

**修改文件：**
- `src/components/MovieCard.tsx` — 替换海报区 `<img>` 为渐变背景 div，显示中文标题
- `src/data/movies.ts` — 移除 `poster` 字段引用（保留数据不动，代码层面不再读取即可）

**具体改动：**
- 移除 `<img>` 标签和 `onError` 处理
- 新增一个根据 `movie.genre[0]` 取对应渐变色的海报 div
- 海报内展示 `movie.titleZh`，字体大号居中

---

## 2. 标记按钮冗余显示 — 移除重叠

**问题：** `MovieCard.tsx` 第130-145行的状态标签（"想看"/"正在看"）与第148行的书签按钮在相同位置（`top:8px;right:8px`），书签按钮 z-index 更高会遮挡文字标签，造成视觉重叠。

**方案：** 直接删除第129-145行的状态标签 JSX。书签按钮本身已通过金色填充/发光效果传达了标记状态，不需要额外的文字标签。

**修改文件：**
- `src/components/MovieCard.tsx` — 删除 `{currentStatus && !hovered && !dropdownOpen && (...)}` 整块代码

---

## 3. 自定义字体

**需求：** 中文标题用"阿里妈妈东方大楷"，英文标题用"阿里妈妈数黑体"。

**方案：** 下载字体 woff2 文件到 `public/fonts/`，通过 CSS `@font-face` 声明；在 MovieCard 中分别应用。

**修改文件：**
- `public/fonts/AlimamaDongFangDaKai.woff2` — 东方大楷字体文件
- `public/fonts/AlimamaShuHeiTi.woff2` — 数黑体字体文件
- `src/app/globals.css` — 添加 `@font-face` 声明和 CSS 自定义属性
- `src/components/MovieCard.tsx` — 中文标题使用东方大楷，英文标题使用数黑体

---

## 4. 网站图标 (Favicon)

**方案：** 创建 SVG 格式的电影场记板图标，放在 `public/` 目录，在 `layout.tsx` 的 metadata 中引用。

**修改文件：**
- `public/favicon.svg` — 新建 SVG 图标
- `src/app/layout.tsx` — metadata 添加 icons 配置

---

## 5. 上映日期前加提示

**方案：** 在 MovieCard 信息区的上映年份前添加文字提示。

**修改文件：**
- `src/components/MovieCard.tsx` — 第295-297行，在 `releaseDate.slice(0,4)` 前加上提示文字或图标

**具体改动：**
- 添加一个小日历图标或文字前缀，如 `📅 ` + 年份

---

## 涉及文件汇总

| 文件 | 改动类型 |
|------|----------|
| `src/components/MovieCard.tsx` | 修改 — 海报区重做、删重叠标签、字体应用、日期前缀 |
| `src/app/globals.css` | 修改 — 添加 @font-face |
| `src/app/layout.tsx` | 修改 — 添加 favicon metadata |
| `public/fonts/` | 新建 — 字体文件 |
| `public/favicon.svg` | 新建 — SVG 图标 |

## 验证方式
1. `npm run dev` 启动开发服务器
2. 浏览器访问 http://localhost:3000
3. 确认所有电影卡片海报为渐变色+中文标题，无加载失败
4. 确认标记按钮处无重叠文字
5. 确认中英文标题分别使用东方大楷/数黑体
6. 确认浏览器标签页显示电影图标
7. 确认上映年份前有提示标识
