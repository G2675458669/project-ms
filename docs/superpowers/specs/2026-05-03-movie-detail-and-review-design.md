# 电影详情弹窗与观影记录 — 设计规格

## 目标

为 CINEMA 应用新增两个体验增强功能：电影详情 Modal 和扩展的观影记录系统（已看 + 评分 + 短评）。

## 数据模型

扩展 `UserMark`（`src/types/index.ts`）：

```typescript
interface UserMark {
  movieId: string;
  status: 'want_to_watch' | 'watching' | 'watched';
  rating?: number;       // 1-5 星，仅 status === 'watched' 时有值
  review?: string;        // 短评，最多 200 字，仅 status === 'watched' 时有值
  watchedDate?: string;   // ISO 日期，仅 status === 'watched' 时自动记录为当天
}
```

规则：
- `rating`、`review`、`watchedDate` 仅当 `status === 'watched'` 时有效
- 从 "watched" 切换到其他状态时，这三个字段被清除
- localStorage key 保持 `"film-marks"`，旧数据自动兼容（新字段均为 optional）

## MovieDetailModal 组件

**新增文件：** `src/components/MovieDetailModal.tsx`

**触发：** 点击 MovieCard 卡片（非标记按钮区域）

**布局：** 居中弹窗，左侧海报大图，右侧信息区

**显示内容：**
- 中文片名 + 英文片名
- 上映日期
- 类型标签（带颜色）
- 完整简介
- 标记按钮组：[想看] [正在看] [看过]
- 选"看过"时展开：星级评分 + 短评输入框（200字限制）+ 观看日期

**交互：**
- 点击遮罩层或 ✕ 关闭；ESC 关闭
- 标记按钮行为与现有 MovieCard 一致（点击切换/取消）
- 选"看过"时自动填入当天日期，可手动修改
- 切换到其他状态时评分区收折并清除评分/短评数据

## ProfileView 改造

**修改文件：** `src/components/ProfileView.tsx`

新增"看过"标签页：
- 按观看日期倒序排列
- 每条显示：海报缩略图、片名、星级评分、观看日期、短评摘要（未写则显示"未写短评"）
- 点击条目打开 MovieDetailModal 查看/编辑

## 其余改动

| 文件 | 变更 |
|------|------|
| `src/types/index.ts` | `UserMark` 新增 `'watched'` 状态 + `rating`/`review`/`watchedDate` 可选字段 |
| `src/components/MovieDetailModal.tsx` | **新建**，Modal 组件 |
| `src/components/MovieCard.tsx` | 卡片添加 `onClick` → 打开 Modal；标记按钮 `stopPropagation` |
| `src/components/ProfileView.tsx` | 新增"看过"标签页 |
| `src/context/AppContext.tsx` | 新增 `selectedMovie` 状态 + `setSelectedMovie` 方法 |
| `src/app/page.tsx` | 渲染 `<MovieDetailModal />` |
| `src/app/globals.css` | Modal 相关样式（遮罩、面板、动画） |

## 不涉及

- 不新增后端/API
- 不新增第三方依赖
- 不做响应式适配（仍桌面优先）

## 验证

1. 点击电影卡片 → Modal 弹出，显示完整信息
2. 在 Modal 中标记"看过" → 展开评分区，打星、写短评 → 关闭 Modal
3. 切换到"我的片单" → "看过"标签页可见，评分/短评/日期正确展示
4. 再次打开同一电影的 Modal → 之前填的评分/短评还在
5. 将"看过"改为"想看" → 评分/短评/日期被清除
6. 点击标记按钮时不触发 Modal 打开
