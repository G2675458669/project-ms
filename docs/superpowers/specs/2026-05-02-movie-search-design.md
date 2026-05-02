# 电影搜索网站 — 设计规格

**日期**: 2026-05-02
**技术栈**: Next.js + HeroUI + localStorage

---

## 1. 概述

一个本地电影搜索与标记网站，50部热门电影数据硬编码在前端，用户可搜索、筛选、标记电影为「想看」或「正在看」，标记状态持久化到 localStorage。

## 2. 页面结构

单页应用，Header 导航切换两个视图：

- **首页** (`/`): 搜索 + 筛选 + 电影卡片网格
- **我的片单** (`/profile`): 查看已标记电影

## 3. 数据模型

### Movie

```typescript
interface Movie {
  id: string;
  title: string;
  titleZh: string;      // 中文名
  genre: string[];       // 类型标签
  poster: string;        // 封面图（本地路径或占位图）
  overview: string;      // 简介
  releaseDate: string;   // YYYY-MM-DD
}
```

### UserMark

```typescript
interface UserMark {
  movieId: string;
  status: 'want_to_watch' | 'watching';
}
```

标记数据存储于 `localStorage`，键名 `film-marks`，格式为 `UserMark[]`。

## 4. 组件树

```
App
├── Header
│   ├── Logo (CINEMA, 金色衬线)
│   └── NavTabs (首页 | 我的片单)
├── HomeView
│   ├── SearchBar (输入框)
│   ├── GenreTags (类型标签横向排列)
│   └── MovieGrid (4列卡片网格)
│       └── MovieCard × N
└── ProfileView
    ├── StatusTabs (想看 | 正在看)
    └── MovieGrid (复用同上)
```

## 5. 交互规格

### 搜索与筛选
- 搜索框输入关键词 → 实时模糊匹配 `title` 和 `titleZh` 字段
- 类型标签点击切换选中态，多选取并集，金色高亮选中标签
- 搜索和标签筛选同时生效，取交集

### 卡片悬停
- 封面图片模糊（`filter: blur(8px)` + 暗色半透明遮罩）
- 居中浮出两个操作按钮：想看 / 正在看
- 过渡动画 300ms ease-in-out
- 已标记状态在卡片底部显示对应标签（小金色标记点）

### 用户中心
- Tab 切换「想看」「正在看」，显示对应标记的电影卡片
- 再次悬停已标记卡片时，显示「取消标记」按钮
- 无数据时显示空状态提示

## 6. 视觉设计

- **背景色**: `#0a0a0f` (深黑)
- **卡片背景**: `#12121a`
- **主强调色**: `#d4af37` (金色)
- **文字色**: `#e0e0e0` / `#888`
- **边框色**: `#222`
- **标题字体**: Georgia / serif (Logo 及大标题)
- **正文字体**: 系统无衬线字体
- **卡片圆角**: 12px
- **卡片网格**: 4 列，gap 20px

## 7. Mock 数据

50部电影，类型覆盖：动作、科幻、剧情、喜剧、恐怖、动画、悬疑、爱情、奇幻、犯罪、战争、纪录片。以 IMDb 热门电影为参考，使用占位封面图（可使用 picsum 或自定义色块）。

## 8. 边界情况

- 搜索无结果 → 显示「未找到相关电影」
- 用户中心为空 → 显示引导去首页浏览的提示
- localStorage 不可用 → 静默降级，标记仅存在于内存中
- 同一电影重复标记 → 更新状态而非新增

## 9. 不在范围内

- 后端/API 集成
- 用户登录/多用户
- 电影详情页
- 评分/评论功能
- 响应式移动端适配（PC 优先）
