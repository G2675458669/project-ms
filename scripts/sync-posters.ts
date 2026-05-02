/**
 * 从 WMDB API 批量获取电影海报 URL
 * 用法: npx tsx scripts/sync-posters.ts
 * 或者: node --loader ts-node/esm scripts/sync-posters.ts
 *
 * 更简单的用法（直接用便携版 Node.js 执行 JS 版本）:
 *   ./node-portable/node-v22.21.1-win-x64/node.exe scripts/sync-posters.mjs
 */

const API_BASE = 'https://api.wmdb.tv/api/v1/movie/search';

interface MovieInput {
  id: string;
  title: string;
  titleZh: string;
  genre: string[];
  poster: string;
  overview: string;
  releaseDate: string;
}

interface WmdbResult {
  data?: { poster?: string }[];
}

async function fetchPoster(titleZh: string, fallback: string): Promise<string> {
  try {
    const url = `${API_BASE}?q=${encodeURIComponent(titleZh)}&limit=1&lang=Cn`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      console.error(`  WMDB 返回 ${res.status} for "${titleZh}"`);
      return fallback;
    }
    const json: WmdbResult = await res.json();
    const poster = json.data?.[0]?.poster;
    if (poster) {
      console.log(`  ✓ ${titleZh} -> ${poster}`);
      return poster;
    }
    console.error(`  ✗ "${titleZh}" 无海报数据，使用兜底`);
    return fallback;
  } catch (err: any) {
    console.error(`  ✗ "${titleZh}" 请求失败: ${err.message}`);
    return fallback;
  }
}

// 从 movies.ts 复制数据（避免复杂的 TS 解析）
const movies: MovieInput[] = [
  { id: 'm01', title: 'The Shawshank Redemption', titleZh: '肖申克的救赎', genre: ['剧情', '犯罪'], poster: '', overview: '', releaseDate: '' },
  { id: 'm02', title: 'The Godfather', titleZh: '教父', genre: ['剧情', '犯罪'], poster: '', overview: '', releaseDate: '' },
  { id: 'm03', title: 'The Dark Knight', titleZh: '蝙蝠侠：黑暗骑士', genre: ['动作', '犯罪', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm04', title: 'Pulp Fiction', titleZh: '低俗小说', genre: ['剧情', '犯罪', '喜剧'], poster: '', overview: '', releaseDate: '' },
  { id: 'm05', title: "Schindler's List", titleZh: '辛德勒的名单', genre: ['剧情', '战争'], poster: '', overview: '', releaseDate: '' },
  { id: 'm06', title: 'Inception', titleZh: '盗梦空间', genre: ['科幻', '动作', '悬疑'], poster: '', overview: '', releaseDate: '' },
  { id: 'm07', title: 'Fight Club', titleZh: '搏击俱乐部', genre: ['剧情', '悬疑', '动作'], poster: '', overview: '', releaseDate: '' },
  { id: 'm08', title: 'Forrest Gump', titleZh: '阿甘正传', genre: ['剧情', '喜剧', '爱情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm09', title: 'The Matrix', titleZh: '黑客帝国', genre: ['科幻', '动作'], poster: '', overview: '', releaseDate: '' },
  { id: 'm10', title: 'Goodfellas', titleZh: '好家伙', genre: ['剧情', '犯罪'], poster: '', overview: '', releaseDate: '' },
  { id: 'm11', title: 'Interstellar', titleZh: '星际穿越', genre: ['科幻', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm12', title: 'Parasite', titleZh: '寄生虫', genre: ['剧情', '悬疑', '喜剧'], poster: '', overview: '', releaseDate: '' },
  { id: 'm13', title: 'Spirited Away', titleZh: '千与千寻', genre: ['动画', '奇幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm14', title: 'The Silence of the Lambs', titleZh: '沉默的羔羊', genre: ['悬疑', '恐怖', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm15', title: 'Gladiator', titleZh: '角斗士', genre: ['动作', '剧情', '战争'], poster: '', overview: '', releaseDate: '' },
  { id: 'm16', title: 'Titanic', titleZh: '泰坦尼克号', genre: ['爱情', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm17', title: 'The Lord of the Rings: The Return of the King', titleZh: '指环王：王者无敌', genre: ['奇幻', '动作', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm18', title: 'Whiplash', titleZh: '爆裂鼓手', genre: ['剧情', '悬疑'], poster: '', overview: '', releaseDate: '' },
  { id: 'm19', title: 'Avengers: Endgame', titleZh: '复仇者联盟4：终局之战', genre: ['动作', '科幻', '奇幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm20', title: 'Coco', titleZh: '寻梦环游记', genre: ['动画', '奇幻', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm21', title: 'Joker', titleZh: '小丑', genre: ['剧情', '犯罪', '悬疑'], poster: '', overview: '', releaseDate: '' },
  { id: 'm22', title: 'Your Name', titleZh: '你的名字。', genre: ['动画', '爱情', '奇幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm23', title: 'The Prestige', titleZh: '致命魔术', genre: ['悬疑', '剧情', '科幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm24', title: 'The Lion King', titleZh: '狮子王', genre: ['动画', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm25', title: 'Alien', titleZh: '异形', genre: ['科幻', '恐怖', '悬疑'], poster: '', overview: '', releaseDate: '' },
  { id: 'm26', title: 'Spider-Man: Into the Spider-Verse', titleZh: '蜘蛛侠：平行宇宙', genre: ['动画', '动作', '科幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm27', title: 'The Truman Show', titleZh: '楚门的世界', genre: ['剧情', '喜剧', '科幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm28', title: 'Blade Runner 2049', titleZh: '银翼杀手2049', genre: ['科幻', '悬疑', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm29', title: 'Oldboy', titleZh: '老男孩', genre: ['悬疑', '动作', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm30', title: 'Django Unchained', titleZh: '被解救的姜戈', genre: ['剧情', '动作', '犯罪'], poster: '', overview: '', releaseDate: '' },
  { id: 'm31', title: 'WALL-E', titleZh: '机器人总动员', genre: ['动画', '科幻', '爱情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm32', title: 'The Shining', titleZh: '闪灵', genre: ['恐怖', '悬疑', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm33', title: 'La La Land', titleZh: '爱乐之城', genre: ['爱情', '喜剧', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm34', title: 'Se7en', titleZh: '七宗罪', genre: ['悬疑', '犯罪', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm35', title: 'Eternal Sunshine of the Spotless Mind', titleZh: '暖暖内含光', genre: ['爱情', '科幻', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm36', title: 'Mad Max: Fury Road', titleZh: '疯狂的麦克斯：狂暴之路', genre: ['动作', '科幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm37', title: 'Toy Story', titleZh: '玩具总动员', genre: ['动画', '喜剧', '奇幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm38', title: 'A Beautiful Mind', titleZh: '美丽心灵', genre: ['剧情', '爱情', '悬疑'], poster: '', overview: '', releaseDate: '' },
  { id: 'm39', title: 'Grave of the Fireflies', titleZh: '萤火虫之墓', genre: ['动画', '战争', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm40', title: 'City of God', titleZh: '上帝之城', genre: ['剧情', '犯罪', '动作'], poster: '', overview: '', releaseDate: '' },
  { id: 'm41', title: 'The Green Mile', titleZh: '绿里奇迹', genre: ['剧情', '奇幻', '悬疑'], poster: '', overview: '', releaseDate: '' },
  { id: 'm42', title: 'Get Out', titleZh: '逃出绝命镇', genre: ['恐怖', '悬疑', '喜剧'], poster: '', overview: '', releaseDate: '' },
  { id: 'm43', title: "Howl's Moving Castle", titleZh: '哈尔的移动城堡', genre: ['动画', '奇幻', '爱情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm44', title: 'The Departed', titleZh: '无间道风云', genre: ['犯罪', '悬疑', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm45', title: 'Oppenheimer', titleZh: '奥本海默', genre: ['剧情', '战争', '悬疑'], poster: '', overview: '', releaseDate: '' },
  { id: 'm46', title: 'Everything Everywhere All at Once', titleZh: '瞬息全宇宙', genre: ['科幻', '喜剧', '动作', '奇幻'], poster: '', overview: '', releaseDate: '' },
  { id: 'm47', title: 'The Grand Budapest Hotel', titleZh: '布达佩斯大饭店', genre: ['喜剧', '剧情', '悬疑'], poster: '', overview: '', releaseDate: '' },
  { id: 'm48', title: 'Train to Busan', titleZh: '釜山行', genre: ['恐怖', '动作', '剧情'], poster: '', overview: '', releaseDate: '' },
  { id: 'm49', title: 'The Pianist', titleZh: '钢琴家', genre: ['剧情', '战争'], poster: '', overview: '', releaseDate: '' },
  { id: 'm50', title: 'Back to the Future', titleZh: '回到未来', genre: ['科幻', '喜剧', '剧情'], poster: '', overview: '', releaseDate: '' },
];

async function main() {
  console.log(`开始从 WMDB 获取 ${movies.length} 部电影海报...\n`);
  const results: Record<string, string> = {};
  let success = 0;

  for (let i = 0; i < movies.length; i++) {
    const m = movies[i];
    console.log(`[${i + 1}/${movies.length}] ${m.titleZh}`);
    const poster = await fetchPoster(m.titleZh, m.poster);
    results[m.id] = poster;
    if (poster && !poster.includes('tmdb.org')) success++;
    // 小幅延迟避免请求过快
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n=== 结果: ${success}/${movies.length} 成功 ===\n`);
  console.log(JSON.stringify(results, null, 2));
}

main();
