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
