# 电影海报数据优化方案

## 问题诊断

50 部电影海报全部使用 `image.tmdb.org` CDN。经批量检测（HTTP HEAD），26/50 正常，**24 部电影的海报 hash 已失效**（404）。

TMDB 图片 CDN 本身可从国内访问，API 不通，问题纯粹是数据过期。

## 解决方案

### 数据源修复

通过 WMDB API (`api.wmdb.tv`) 的搜索接口，以中文电影名逐部查询获取有效海报 URL。

- 搜索接口：`GET https://api.wmdb.tv/api/v1/movie/search?q={中文名}&limit=1&lang=Cn`
- 海报路径：`response.data[0].data[0].poster`
- 海报 CDN：`https://img.wmdb.tv/movie/poster/xxx.jpg`（已验证国内可访问）
- 限流控制：每请求间隔 12 秒

替换了以下 24 部电影的 poster URL（TMDB → WMDB）：

m01 肖申克的救赎、m03 蝙蝠侠：黑暗骑士、m10 好家伙、m14 沉默的羔羊、m15 角斗士、m16 泰坦尼克号、m20 寻梦环游记、m25 异形、m27 楚门的世界、m28 银翼杀手2049、m29 老男孩、m30 被解救的姜戈、m32 闪灵、m33 爱乐之城、m36 疯狂的麦克斯、m38 美丽心灵、m39 萤火虫之墓、m42 逃出绝命镇、m43 哈尔的移动城堡、m44 无间道风云、m45 奥本海默、m47 布达佩斯大饭店、m48 釜山行、m49 钢琴家

其余 26 部电影保留原 TMDB URL（已验证可用）。

### 容错机制

在 `MovieCard.tsx` 中添加了图片加载失败的容错：
- `imgError` state 追踪加载状态
- `<img onError>` 失败时隐藏裂图（`display: none`）
- 标题覆盖层在失败时永久显示（`opacity: (hovered || imgError) ? 1 : 0`）
- 背景变暗确保标题可读

## 改动文件

| 文件 | 操作 |
|------|------|
| `src/data/movies.ts` | 替换 24 个失效 poster URL |
| `src/components/MovieCard.tsx` | 添加 imgError 容错逻辑 |
| `scripts/sync-posters.ts` | 新建（一次性数据同步脚本，已执行完毕） |
