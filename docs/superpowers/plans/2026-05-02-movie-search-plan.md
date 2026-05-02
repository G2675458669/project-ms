# 电影搜索网站 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个本地电影搜索与标记网站，支持模糊搜索、类型筛选、悬停标记，数据持久化到 localStorage。

**Architecture:** Next.js App Router 单页应用，React Context 管理全局状态（当前视图 + 用户标记），HeroUI 提供 UI 组件，CSS 变量实现暗夜影院主题。

**Tech Stack:** Next.js 15, HeroUI (@heroui/react), React 19, TypeScript, localStorage

---

## 文件结构

```
src/
  app/
    layout.tsx             - 根布局，HeroUI Provider + 全局样式
    page.tsx                - 主页面，组装 Header + 视图切换
    globals.css             - 全局暗夜影院主题
  components/
    Header.tsx              - Logo + 导航切换
    SearchBar.tsx           - 搜索输入框
    GenreTags.tsx           - 类型标签筛选
    MovieCard.tsx           - 电影卡片（含悬停标记交互）
    MovieGrid.tsx           - 4列卡片网格
    HomeView.tsx            - 首页组装
    ProfileView.tsx         - 用户中心
  context/
    AppContext.tsx           - React Context (当前视图 + 标记状态)
  data/
    movies.ts               - 50部电影数据
  types/
    index.ts                - TypeScript 类型定义
  lib/
    storage.ts              - localStorage 读写工具
```

---

### Task 1: 项目脚手架

**Files:**
- Create: 整个 Next.js 项目

- [ ] **Step 1: 创建 Next.js 项目**

```bash
cd D:/Programming/project-ms && npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-npm
```

- [ ] **Step 2: 安装 HeroUI 依赖**

```bash
cd D:/Programming/project-ms && npm install @heroui/react framer-motion
```

framer-motion 是 HeroUI 的必需依赖。

- [ ] **Step 3: 验证项目能启动**

```bash
cd D:/Programming/project-ms && npm run dev
```

打开 `http://localhost:3000` 确认 Next.js 默认页面正常显示，然后停掉 dev server。

- [ ] **Step 4: 清理默认文件**

删除 `src/app/page.module.css`，清空 `src/app/page.tsx` 内容（保留最简骨架）。

- [ ] **Step 5: Commit**

```bash
cd D:/Programming/project-ms && git init && git add -A && git commit -m "chore: scaffold Next.js with HeroUI"
```

---

### Task 2: 类型定义

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: 写入类型定义**

```typescript
// src/types/index.ts

export interface Movie {
  id: string;
  title: string;
  titleZh: string;
  genre: string[];
  poster: string;
  overview: string;
  releaseDate: string; // YYYY-MM-DD
}

export type MarkStatus = 'want_to_watch' | 'watching';

export interface UserMark {
  movieId: string;
  status: MarkStatus;
}

export type ViewType = 'home' | 'profile';
```

- [ ] **Step 2: 验证 TypeScript 编译**

```bash
cd D:/Programming/project-ms && npx tsc --noEmit
```

预期：无错误。

- [ ] **Step 3: Commit**

```bash
cd D:/Programming/project-ms && git add src/types/index.ts && git commit -m "feat: add TypeScript type definitions"
```

---

### Task 3: localStorage 工具

**Files:**
- Create: `src/lib/storage.ts`

- [ ] **Step 1: 写入存储工具**

```typescript
// src/lib/storage.ts
import type { UserMark } from '@/types';

const STORAGE_KEY = 'film-marks';

function isLocalStorageAvailable(): boolean {
  try {
    const key = '__storage_test__';
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function loadMarks(): UserMark[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UserMark[];
  } catch {
    return [];
  }
}

export function saveMarks(marks: UserMark[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
  } catch {
    // 静默降级
  }
}
```

- [ ] **Step 2: 验证编译**

```bash
cd D:/Programming/project-ms && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd D:/Programming/project-ms && git add src/lib/storage.ts && git commit -m "feat: add localStorage read/write helpers"
```

---

### Task 4: 全局样式（暗夜影院主题）

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: 写入全局主题 CSS**

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --color-bg: #0a0a0f;
  --color-surface: #12121a;
  --color-surface-hover: #1a1a26;
  --color-border: #222233;
  --color-gold: #d4af37;
  --color-gold-dim: #a68a2e;
  --color-text: #e0e0e0;
  --color-text-dim: #888888;
  --color-text-muted: #555555;
  --font-display: Georgia, 'Times New Roman', serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --radius-card: 12px;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  min-height: 100vh;
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted);
}
```

Tailwind v4 用 `@import "tailwindcss"` 而非 `@tailwind base/components/utilities`。

- [ ] **Step 2: Commit**

```bash
cd D:/Programming/project-ms && git add src/app/globals.css && git commit -m "feat: add dark cinema global theme"
```

---

### Task 5: 电影 Mock 数据

**Files:**
- Create: `src/data/movies.ts`

- [ ] **Step 1: 写入50部电影数据**

```typescript
// src/data/movies.ts
import type { Movie } from '@/types';

const movies: Movie[] = [
  { id: 'm01', title: 'The Shawshank Redemption', titleZh: '肖申克的救赎', genre: ['剧情'], poster: 'https://picsum.photos/seed/shawshank/300/450', overview: '一名银行家被误判谋杀罪，在监狱中用智慧和毅力赢得自由与希望。', releaseDate: '1994-09-23' },
  { id: 'm02', title: 'The Godfather', titleZh: '教父', genre: ['剧情', '犯罪'], poster: 'https://picsum.photos/seed/godfather/300/450', overview: '意大利裔美国黑手党家族的权力更迭与家族忠诚的故事。', releaseDate: '1972-03-24' },
  { id: 'm03', title: 'The Dark Knight', titleZh: '蝙蝠侠：黑暗骑士', genre: ['动作', '犯罪'], poster: 'https://picsum.photos/seed/darkknight/300/450', overview: '蝙蝠侠面对混乱化身小丑，在秩序与混乱之间做出艰难抉择。', releaseDate: '2008-07-18' },
  { id: 'm04', title: 'Pulp Fiction', titleZh: '低俗小说', genre: ['剧情', '犯罪'], poster: 'https://picsum.photos/seed/pulpfiction/300/450', overview: '多线叙事的黑色幽默犯罪故事，交织洛杉矶地下世界的人物命运。', releaseDate: '1994-10-14' },
  { id: 'm05', title: 'Schindler\'s List', titleZh: '辛德勒的名单', genre: ['剧情', '战争'], poster: 'https://picsum.photos/seed/schindler/300/450', overview: '二战期间，德国商人辛德勒拯救上千名犹太人的真实故事。', releaseDate: '1993-12-15' },
  { id: 'm06', title: 'Inception', titleZh: '盗梦空间', genre: ['科幻', '动作'], poster: 'https://picsum.photos/seed/inception/300/450', overview: '梦境窃贼被赋予一个不可能的任务——在目标的潜意识中植入一个想法。', releaseDate: '2010-07-16' },
  { id: 'm07', title: 'Fight Club', titleZh: '搏击俱乐部', genre: ['剧情', '悬疑'], poster: 'https://picsum.photos/seed/fightclub/300/450', overview: '一个不满的白领与肥皂商人创建地下搏击俱乐部，事态逐渐失控。', releaseDate: '1999-10-15' },
  { id: 'm08', title: 'Forrest Gump', titleZh: '阿甘正传', genre: ['剧情', '喜剧'], poster: 'https://picsum.photos/seed/forrestgump/300/450', overview: '智商不高的阿甘以纯真之心见证了美国几十年的历史变迁。', releaseDate: '1994-07-06' },
  { id: 'm09', title: 'The Matrix', titleZh: '黑客帝国', genre: ['科幻', '动作'], poster: 'https://picsum.photos/seed/matrix/300/450', overview: '程序员尼奥发现现实世界是机器创造的虚拟幻境，他成为了人类的救世主。', releaseDate: '1999-03-31' },
  { id: 'm10', title: 'Goodfellas', titleZh: '好家伙', genre: ['剧情', '犯罪'], poster: 'https://picsum.photos/seed/goodfellas/300/450', overview: '一名年轻人从崇拜黑手党到成为其中一员，再到最终背叛的历程。', releaseDate: '1990-09-19' },
  { id: 'm11', title: 'Interstellar', titleZh: '星际穿越', genre: ['科幻', '剧情'], poster: 'https://picsum.photos/seed/interstellar/300/450', overview: '为寻找人类新家园，宇航员穿越虫洞探索未知星系。', releaseDate: '2014-11-07' },
  { id: 'm12', title: 'Parasite', titleZh: '寄生虫', genre: ['剧情', '悬疑'], poster: 'https://picsum.photos/seed/parasite/300/450', overview: '贫穷家庭逐步渗透富裕家庭，两个世界的碰撞引发不可预料的后果。', releaseDate: '2019-05-30' },
  { id: 'm13', title: 'Spirited Away', titleZh: '千与千寻', genre: ['动画', '奇幻'], poster: 'https://picsum.photos/seed/spirited/300/450', overview: '女孩千寻误入神灵世界，为了拯救变成猪的父母而勇敢冒险。', releaseDate: '2001-07-20' },
  { id: 'm14', title: 'The Silence of the Lambs', titleZh: '沉默的羔羊', genre: ['悬疑', '恐怖'], poster: 'https://picsum.photos/seed/lambs/300/450', overview: 'FBI实习生为追踪连环杀手，向被囚禁的天才精神病医生汉尼拔求助。', releaseDate: '1991-02-14' },
  { id: 'm15', title: 'Gladiator', titleZh: '角斗士', genre: ['动作', '剧情'], poster: 'https://picsum.photos/seed/gladiator/300/450', overview: '罗马将军被背叛后沦为奴隶，以角斗士身份寻求复仇。', releaseDate: '2000-05-05' },
  { id: 'm16', title: 'Titanic', titleZh: '泰坦尼克号', genre: ['爱情', '剧情'], poster: 'https://picsum.photos/seed/titanic/300/450', overview: '穷画家和贵族少女在泰坦尼克号上相遇相恋，面临史上最大海难。', releaseDate: '1997-12-19' },
  { id: 'm17', title: 'The Lord of the Rings: The Return of the King', titleZh: '指环王：王者无敌', genre: ['奇幻', '动作'], poster: 'https://picsum.photos/seed/lotr3/300/450', overview: '中土世界最终决战，弗罗多深入魔多销毁至尊魔戒。', releaseDate: '2003-12-17' },
  { id: 'm18', title: 'Whiplash', titleZh: '爆裂鼓手', genre: ['剧情'], poster: 'https://picsum.photos/seed/whiplash/300/450', overview: '年轻鼓手在严酷导师的极端训练下追逐音乐梦想的故事。', releaseDate: '2014-10-10' },
  { id: 'm19', title: 'Avengers: Endgame', titleZh: '复仇者联盟4：终局之战', genre: ['动作', '科幻'], poster: 'https://picsum.photos/seed/endgame/300/450', overview: '复仇者们集结进行最后的时间旅行任务，逆转灭霸带来的毁灭。', releaseDate: '2019-04-26' },
  { id: 'm20', title: 'Coco', titleZh: '寻梦环游记', genre: ['动画', '奇幻'], poster: 'https://picsum.photos/seed/coco/300/450', overview: '热爱音乐的小男孩在亡灵节误入亡灵世界，揭开了家族尘封的秘密。', releaseDate: '2017-11-22' },
  { id: 'm21', title: 'Joker', titleZh: '小丑', genre: ['剧情', '犯罪'], poster: 'https://picsum.photos/seed/joker/300/450', overview: '一个被社会边缘化的喜剧演员逐渐走向疯狂，成为哥谭的混乱象征。', releaseDate: '2019-10-04' },
  { id: 'm22', title: 'Your Name', titleZh: '你的名字。', genre: ['动画', '爱情'], poster: 'https://picsum.photos/seed/yourname/300/450', overview: '两个素未谋面的少年少女开始交换身体，彼此寻找对方的存在。', releaseDate: '2016-08-26' },
  { id: 'm23', title: 'The Prestige', titleZh: '致命魔术', genre: ['悬疑', '剧情'], poster: 'https://picsum.photos/seed/prestige/300/450', overview: '两位魔术师为超越对方不惜一切代价，最终导致悲剧性的结果。', releaseDate: '2006-10-20' },
  { id: 'm24', title: 'The Lion King', titleZh: '狮子王', genre: ['动画', '剧情'], poster: 'https://picsum.photos/seed/lionking/300/450', overview: '小狮子辛巴在流亡中成长，最终回到荣耀大地夺回属于自己的王位。', releaseDate: '1994-06-24' },
  { id: 'm25', title: 'Alien', titleZh: '异形', genre: ['科幻', '恐怖'], poster: 'https://picsum.photos/seed/alien/300/450', overview: '太空货船船员遭遇致命外星生物，在封闭空间中展开殊死搏斗。', releaseDate: '1979-06-22' },
  { id: 'm26', title: 'Spider-Man: Into the Spider-Verse', titleZh: '蜘蛛侠：平行宇宙', genre: ['动画', '动作'], poster: 'https://picsum.photos/seed/spiderverse/300/450', overview: '多个平行宇宙的蜘蛛侠汇聚一堂，共同对抗威胁所有世界的危机。', releaseDate: '2018-12-14' },
  { id: 'm27', title: 'The Truman Show', titleZh: '楚门的世界', genre: ['剧情', '喜剧'], poster: 'https://picsum.photos/seed/truman/300/450', overview: '一个男人发现自己的整个人生都是一场全球直播的真人秀节目。', releaseDate: '1998-06-05' },
  { id: 'm28', title: 'Blade Runner 2049', titleZh: '银翼杀手2049', genre: ['科幻', '悬疑'], poster: 'https://picsum.photos/seed/bladerunner/300/450', overview: '新一代银翼杀手调查一个可能改变社会秩序的秘密真相。', releaseDate: '2017-10-06' },
  { id: 'm29', title: 'Oldboy', titleZh: '老男孩', genre: ['悬疑', '动作'], poster: 'https://picsum.photos/seed/oldboy/300/450', overview: '一个男人被无故囚禁15年后突然获释，必须在5天内找出真相。', releaseDate: '2003-11-21' },
  { id: 'm30', title: 'Django Unchained', titleZh: '被解救的姜戈', genre: ['剧情', '动作'], poster: 'https://picsum.photos/seed/django/300/450', overview: '德国赏金猎人帮助一名黑奴从残忍的种植园主手中救出妻子。', releaseDate: '2012-12-25' },
  { id: 'm31', title: 'WALL-E', titleZh: '机器人总动员', genre: ['动画', '科幻'], poster: 'https://picsum.photos/seed/walle/300/450', overview: '孤独的清扫机器人在荒废地球上发现了一株绿色植物，开启了星际冒险。', releaseDate: '2008-06-27' },
  { id: 'm32', title: 'The Shining', titleZh: '闪灵', genre: ['恐怖', '悬疑'], poster: 'https://picsum.photos/seed/shining/300/450', overview: '作家一家在冬季看守与世隔绝的酒店，恐怖力量逐渐侵蚀他的神智。', releaseDate: '1980-05-23' },
  { id: 'm33', title: 'La La Land', titleZh: '爱乐之城', genre: ['爱情', '喜剧'], poster: 'https://picsum.photos/seed/lalaland/300/450', overview: '爵士音乐家与怀揣演员梦想的女孩在洛杉矶相遇，谱写了一段追梦恋曲。', releaseDate: '2016-12-09' },
  { id: 'm34', title: 'Se7en', titleZh: '七宗罪', genre: ['悬疑', '犯罪'], poster: 'https://picsum.photos/seed/seven/300/450', overview: '两侦探追捕以七宗罪为灵感犯下连环杀人案的凶手。', releaseDate: '1995-09-22' },
  { id: 'm35', title: 'Eternal Sunshine of the Spotless Mind', titleZh: '暖暖内含光', genre: ['爱情', '科幻'], poster: 'https://picsum.photos/seed/eternal/300/450', overview: '一对分手情侣通过记忆清除手术删除对彼此的记忆，却在过程中重新发现爱的真谛。', releaseDate: '2004-03-19' },
  { id: 'm36', title: 'Mad Max: Fury Road', titleZh: '疯狂的麦克斯：狂暴之路', genre: ['动作', '科幻'], poster: 'https://picsum.photos/seed/madmax/300/450', overview: '在废土荒漠中，公路战士与逃亡女战士联手对抗暴君的追杀。', releaseDate: '2015-05-15' },
  { id: 'm37', title: 'Toy Story', titleZh: '玩具总动员', genre: ['动画', '喜剧'], poster: 'https://picsum.photos/seed/toystory/300/450', overview: '牛仔玩具胡迪在新玩具巴斯光年来到后，经历了一场身份危机与冒险。', releaseDate: '1995-11-22' },
  { id: 'm38', title: 'A Beautiful Mind', titleZh: '美丽心灵', genre: ['剧情'], poster: 'https://picsum.photos/seed/beautifulmind/300/450', overview: '天才数学家约翰·纳什与精神分裂症斗争同时获得诺贝尔奖的真实故事。', releaseDate: '2001-12-21' },
  { id: 'm39', title: 'Grave of the Fireflies', titleZh: '萤火虫之墓', genre: ['动画', '战争'], poster: 'https://picsum.photos/seed/fireflies/300/450', overview: '二战末期日本，一对兄妹在战火中艰难求生的悲剧故事。', releaseDate: '1988-04-16' },
  { id: 'm40', title: 'City of God', titleZh: '上帝之城', genre: ['剧情', '犯罪'], poster: 'https://picsum.photos/seed/cityofgod/300/450', overview: '里约热内卢贫民窟中，一个少年用相机记录下暴力和生存的现实。', releaseDate: '2002-08-30' },
  { id: 'm41', title: 'The Green Mile', titleZh: '绿里奇迹', genre: ['剧情', '奇幻'], poster: 'https://picsum.photos/seed/greenmile/300/450', overview: '死囚监狱看守遇到一个拥有神秘力量的囚犯，他的存在改变了所有人的命运。', releaseDate: '1999-12-10' },
  { id: 'm42', title: 'Get Out', titleZh: '逃出绝命镇', genre: ['恐怖', '悬疑'], poster: 'https://picsum.photos/seed/getout/300/450', overview: '黑人青年去白人女友家度周末，却发现了隐藏在这平静表象下的恐怖秘密。', releaseDate: '2017-02-24' },
  { id: 'm43', title: 'Howl\'s Moving Castle', titleZh: '哈尔的移动城堡', genre: ['动画', '奇幻'], poster: 'https://picsum.photos/seed/howl/300/450', overview: '被诅咒变成老妇人的少女与英俊巫师在移动城堡中展开奇幻冒险。', releaseDate: '2004-11-20' },
  { id: 'm44', title: 'The Departed', titleZh: '无间道风云', genre: ['犯罪', '悬疑'], poster: 'https://picsum.photos/seed/departed/300/450', overview: '警方卧底与黑帮内鬼之间的猫鼠游戏，双方都在追查对方身份。', releaseDate: '2006-10-06' },
  { id: 'm45', title: 'Oppenheimer', titleZh: '奥本海默', genre: ['剧情', '战争'], poster: 'https://picsum.photos/seed/oppenheimer/300/450', overview: '原子弹之父罗伯特·奥本海默在创造和后悔之间的挣扎。', releaseDate: '2023-07-21' },
  { id: 'm46', title: 'Everything Everywhere All at Once', titleZh: '瞬息全宇宙', genre: ['科幻', '喜剧'], poster: 'https://picsum.photos/seed/everything/300/450', overview: '华裔移民大妈穿越多元宇宙，以拯救世界和她的家庭。', releaseDate: '2022-03-25' },
  { id: 'm47', title: 'The Grand Budapest Hotel', titleZh: '布达佩斯大饭店', genre: ['喜剧', '剧情'], poster: 'https://picsum.photos/seed/budapest/300/450', overview: '一座欧洲著名大饭店的礼宾员和他最信任的门生之间的传奇故事。', releaseDate: '2014-03-28' },
  { id: 'm48', title: 'Train to Busan', titleZh: '釜山行', genre: ['恐怖', '动作'], poster: 'https://picsum.photos/seed/busan/300/450', overview: '一列开往釜山的高速列车上爆发丧尸病毒，乘客们为生存而战。', releaseDate: '2016-07-20' },
  { id: 'm49', title: 'The Pianist', titleZh: '钢琴家', genre: ['剧情', '战争'], poster: 'https://picsum.photos/seed/pianist/300/450', overview: '波兰犹太钢琴家在二战期间于华沙废墟中艰难求生的真实故事。', releaseDate: '2002-09-25' },
  { id: 'm50', title: 'Back to the Future', titleZh: '回到未来', genre: ['科幻', '喜剧'], poster: 'https://picsum.photos/seed/backfuture/300/450', overview: '高中生马丁乘坐时间机器回到1955年，必须确保父母相爱才能回到未来。', releaseDate: '1985-07-03' },
];

export default movies;

export function getAllGenres(): string[] {
  const genreSet = new Set<string>();
  movies.forEach(m => m.genre.forEach(g => genreSet.add(g)));
  return Array.from(genreSet).sort();
}
```

- [ ] **Step 2: 验证编译**

```bash
cd D:/Programming/project-ms && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd D:/Programming/project-ms && git add src/data/movies.ts && git commit -m "feat: add 50 movie mock data"
```

---

### Task 6: AppContext（全局状态管理）

**Files:**
- Create: `src/context/AppContext.tsx`

- [ ] **Step 1: 写入 Context**

```typescript
// src/context/AppContext.tsx
'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserMark, MarkStatus, ViewType } from '@/types';
import { loadMarks, saveMarks } from '@/lib/storage';

interface AppState {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  marks: UserMark[];
  toggleMark: (movieId: string, status: MarkStatus) => void;
  getMarkStatus: (movieId: string) => MarkStatus | null;
  getMarkedMovies: (status: MarkStatus) => string[];
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [marks, setMarks] = useState<UserMark[]>([]);

  // 初始化时从 localStorage 加载
  useEffect(() => {
    setMarks(loadMarks());
  }, []);

  // 标记变更时同步到 localStorage
  useEffect(() => {
    saveMarks(marks);
  }, [marks]);

  const toggleMark = useCallback((movieId: string, status: MarkStatus) => {
    setMarks(prev => {
      const existing = prev.find(m => m.movieId === movieId);
      if (existing && existing.status === status) {
        // 再次点击相同状态 → 取消标记
        return prev.filter(m => m.movieId !== movieId);
      }
      if (existing) {
        // 切换状态
        return prev.map(m => m.movieId === movieId ? { ...m, status } : m);
      }
      // 新增标记
      return [...prev, { movieId, status }];
    });
  }, []);

  const getMarkStatus = useCallback((movieId: string): MarkStatus | null => {
    const mark = marks.find(m => m.movieId === movieId);
    return mark ? mark.status : null;
  }, [marks]);

  const getMarkedMovies = useCallback((status: MarkStatus): string[] => {
    return marks.filter(m => m.status === status).map(m => m.movieId);
  }, [marks]);

  return (
    <AppContext.Provider value={{ activeView, setActiveView, marks, toggleMark, getMarkStatus, getMarkedMovies }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
```

- [ ] **Step 2: 验证编译**

```bash
cd D:/Programming/project-ms && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd D:/Programming/project-ms && git add src/context/AppContext.tsx && git commit -m "feat: add AppContext for global state management"
```

---

### Task 7: Header 组件

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: 写入 Header 组件**

```typescript
// src/components/Header.tsx
'use client';

import { useAppContext } from '@/context/AppContext';
import type { ViewType } from '@/types';

export default function Header() {
  const { activeView, setActiveView } = useAppContext();

  const tabs: { key: ViewType; label: string }[] = [
    { key: 'home', label: '首页' },
    { key: 'profile', label: '我的片单' },
  ];

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 40px',
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        color: 'var(--color-gold)',
        fontSize: '24px',
        letterSpacing: '3px',
        margin: 0,
        userSelect: 'none',
      }}>
        CINEMA
      </h1>

      <nav style={{ display: 'flex', gap: '4px' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveView(tab.key)}
            style={{
              padding: '8px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeView === tab.key ? 600 : 400,
              color: activeView === tab.key ? 'var(--color-gold)' : 'var(--color-text-dim)',
              backgroundColor: activeView === tab.key ? 'rgba(212,175,55,0.1)' : 'transparent',
              transition: 'all 200ms ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: 验证编译**

```bash
cd D:/Programming/project-ms && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd D:/Programming/project-ms && git add src/components/Header.tsx && git commit -m "feat: add Header component with navigation"
```

---

### Task 8: SearchBar 组件

**Files:**
- Create: `src/components/SearchBar.tsx`

- [ ] **Step 1: 写入 SearchBar 组件**

```typescript
// src/components/SearchBar.tsx
'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
      <span style={{
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--color-text-muted)',
        fontSize: '16px',
        pointerEvents: 'none',
      }}>
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="搜索电影名称..."
        style={{
          width: '100%',
          padding: '12px 16px 12px 42px',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 200ms ease',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--color-gold)'; }}
        onBlur={e => { e.target.style.borderColor = 'var(--color-border)'; }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd D:/Programming/project-ms && git add src/components/SearchBar.tsx && git commit -m "feat: add SearchBar component"
```

---

### Task 9: GenreTags 组件

**Files:**
- Create: `src/components/GenreTags.tsx`

- [ ] **Step 1: 写入 GenreTags 组件**

```typescript
// src/components/GenreTags.tsx
'use client';

interface GenreTagsProps {
  genres: string[];
  selected: string[];
  onToggle: (genre: string) => void;
}

export default function GenreTags({ genres, selected, onToggle }: GenreTagsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    }}>
      {genres.map(genre => {
        const isSelected = selected.includes(genre);
        return (
          <button
            key={genre}
            onClick={() => onToggle(genre)}
            style={{
              padding: '6px 16px',
              border: `1px solid ${isSelected ? 'var(--color-gold)' : 'var(--color-border)'}`,
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              color: isSelected ? '#000' : 'var(--color-text-dim)',
              backgroundColor: isSelected ? 'var(--color-gold)' : 'var(--color-surface)',
              fontWeight: isSelected ? 600 : 400,
              transition: 'all 200ms ease',
            }}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd D:/Programming/project-ms && git add src/components/GenreTags.tsx && git commit -m "feat: add GenreTags filter component"
```

---

### Task 10: MovieCard 组件（核心：悬停标记交互）

**Files:**
- Create: `src/components/MovieCard.tsx`

- [ ] **Step 1: 写入 MovieCard 组件**

```typescript
// src/components/MovieCard.tsx
'use client';

import { useState } from 'react';
import type { Movie, MarkStatus } from '@/types';
import { useAppContext } from '@/context/AppContext';

interface MovieCardProps {
  movie: Movie;
}

const statusConfig: Record<MarkStatus, { label: string; icon: string }> = {
  want_to_watch: { label: '想看', icon: '👁' },
  watching: { label: '正在看', icon: '▶' },
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false);
  const { toggleMark, getMarkStatus } = useAppContext();
  const currentStatus = getMarkStatus(movie.id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        transition: 'transform 200ms ease, border-color 200ms ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        borderColor: hovered ? 'var(--color-gold-dim)' : 'var(--color-border)',
      }}
    >
      {/* 海报区 */}
      <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'filter 300ms ease',
            filter: hovered ? 'blur(8px) brightness(0.3)' : 'none',
          }}
        />

        {/* 悬停遮罩 + 操作按钮 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}>
          {(Object.keys(statusConfig) as MarkStatus[]).map(status => {
            const cfg = statusConfig[status];
            const isActive = currentStatus === status;
            return (
              <button
                key={status}
                onClick={(e) => { e.stopPropagation(); toggleMark(movie.id, status); }}
                style={{
                  padding: '10px 28px',
                  border: isActive ? '2px solid var(--color-gold)' : '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isActive ? 'var(--color-gold)' : '#fff',
                  backgroundColor: isActive ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 200ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{cfg.icon}</span>
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>

        {/* 当前标记状态指示 */}
        {currentStatus && !hovered && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#000',
            backgroundColor: 'var(--color-gold)',
          }}>
            {statusConfig[currentStatus].label}
          </div>
        )}
      </div>

      {/* 信息区 */}
      <div style={{ padding: '12px' }}>
        <h3 style={{
          margin: '0 0 4px 0',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {movie.titleZh}
        </h3>
        <p style={{
          margin: '0 0 6px 0',
          fontSize: '12px',
          color: 'var(--color-text-dim)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {movie.title}
        </p>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--color-border)',
          }}>
            {movie.genre[0]}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            {movie.releaseDate.slice(0, 4)}
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证编译**

```bash
cd D:/Programming/project-ms && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd D:/Programming/project-ms && git add src/components/MovieCard.tsx && git commit -m "feat: add MovieCard with hover mark interaction"
```

---

### Task 11: MovieGrid 组件

**Files:**
- Create: `src/components/MovieGrid.tsx`

- [ ] **Step 1: 写入 MovieGrid 组件**

```typescript
// src/components/MovieGrid.tsx
'use client';

import type { Movie } from '@/types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  emptyMessage?: string;
}

export default function MovieGrid({ movies, emptyMessage = '未找到相关电影' }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        color: 'var(--color-text-dim)',
        fontSize: '15px',
      }}>
        <p style={{ fontSize: '40px', marginBottom: '12px' }}>🎬</p>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
    }}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd D:/Programming/project-ms && git add src/components/MovieGrid.tsx && git commit -m "feat: add MovieGrid component"
```

---

### Task 12: HomeView 组件

**Files:**
- Create: `src/components/HomeView.tsx`

- [ ] **Step 1: 写入 HomeView 组件**

```typescript
// src/components/HomeView.tsx
'use client';

import { useState, useMemo } from 'react';
import movies, { getAllGenres } from '@/data/movies';
import SearchBar from './SearchBar';
import GenreTags from './GenreTags';
import MovieGrid from './MovieGrid';

export default function HomeView() {
  const [keyword, setKeyword] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const allGenres = useMemo(() => getAllGenres(), []);

  const filteredMovies = useMemo(() => {
    let result = movies;

    // 关键词模糊匹配
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(kw) ||
        m.titleZh.includes(kw)
      );
    }

    // 类型筛选（多选取并集）
    if (selectedGenres.length > 0) {
      result = result.filter(m =>
        selectedGenres.some(g => m.genre.includes(g))
      );
    }

    return result;
  }, [keyword, selectedGenres]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div style={{ padding: '24px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <SearchBar value={keyword} onChange={setKeyword} />
        <GenreTags genres={allGenres} selected={selectedGenres} onToggle={handleGenreToggle} />
      </div>
      <MovieGrid movies={filteredMovies} />
    </div>
  );
}
```

- [ ] **Step 2: 验证编译**

```bash
cd D:/Programming/project-ms && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd D:/Programming/project-ms && git add src/components/HomeView.tsx && git commit -m "feat: add HomeView with search and filter"
```

---

### Task 13: ProfileView 组件

**Files:**
- Create: `src/components/ProfileView.tsx`

- [ ] **Step 1: 写入 ProfileView 组件**

```typescript
// src/components/ProfileView.tsx
'use client';

import { useState } from 'react';
import type { MarkStatus } from '@/types';
import { useAppContext } from '@/context/AppContext';
import movies from '@/data/movies';
import MovieGrid from './MovieGrid';

const tabs: { key: MarkStatus; label: string }[] = [
  { key: 'want_to_watch', label: '想看' },
  { key: 'watching', label: '正在看' },
];

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState<MarkStatus>('want_to_watch');
  const { getMarkedMovies } = useAppContext();

  const markedIds = getMarkedMovies(activeTab);
  const markedMovies = movies.filter(m => markedIds.includes(m.id));

  return (
    <div style={{ padding: '24px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Tab 切换 */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '24px',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '12px',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? 'var(--color-gold)' : 'var(--color-text-dim)',
              backgroundColor: activeTab === tab.key ? 'rgba(212,175,55,0.1)' : 'transparent',
              transition: 'all 200ms ease',
            }}
          >
            {tab.label}
            <span style={{
              marginLeft: '8px',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '12px',
              backgroundColor: activeTab === tab.key ? 'var(--color-gold)' : 'var(--color-border)',
              color: activeTab === tab.key ? '#000' : 'var(--color-text-dim)',
            }}>
              {getMarkedMovies(tab.key).length}
            </span>
          </button>
        ))}
      </div>

      <MovieGrid
        movies={markedMovies}
        emptyMessage={
          activeTab === 'want_to_watch'
            ? '还没有想看的电影，去首页发现好片吧'
            : '还没有正在看的电影，快去首页找一部开始吧'
        }
      />
    </div>
  );
}
```

- [ ] **Step 2: 验证编译**

```bash
cd D:/Programming/project-ms && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd D:/Programming/project-ms && git add src/components/ProfileView.tsx && git commit -m "feat: add ProfileView with status tabs"
```

---

### Task 14: 根布局与主页面组装

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 写入根布局**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'CINEMA - 电影搜索',
  description: '发现和标记你喜欢的电影',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 写入主页面**

```typescript
// src/app/page.tsx
'use client';

import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import HomeView from '@/components/HomeView';
import ProfileView from '@/components/ProfileView';

export default function Page() {
  const { activeView } = useAppContext();

  return (
    <>
      <Header />
      <main>
        {activeView === 'home' ? <HomeView /> : <ProfileView />}
      </main>
    </>
  );
}
```

- [ ] **Step 3: 启动开发服务器验证**

```bash
cd D:/Programming/project-ms && npm run dev
```

打开 `http://localhost:3000`：
- 确认首页显示 4 列电影卡片
- 确认搜索框和类型标签正常工作
- 确认悬停卡片时出现标记按钮
- 确认标记后切换到「我的片单」能看到结果

- [ ] **Step 4: Commit**

```bash
cd D:/Programming/project-ms && git add src/app/layout.tsx src/app/page.tsx && git commit -m "feat: wire up root layout and main page"
```
