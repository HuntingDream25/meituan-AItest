import type { Club } from '../types/domain'

const cover = (seed: string) => `https://picsum.photos/seed/${seed}/400/520`

export const CLUBS: Club[] = [
  {
    id: 'photo',
    name: '摄影协会',
    cover: cover('club-photo'),
    summary:
      '用镜头记录校园与生活，定期外拍、暗房体验与作品点评，适合喜欢安静创作也能偶尔组团出发的同学。',
    tags: ['skillGrowth', 'lightSocial', 'beginnerFriendly', 'expression'],
    vibeKeywords: ['创作型', '小队出击', '作品展'],
    timeLevel: 'medium',
    requirements: '自备或协会协调租借设备；零基础可入门，有前辈带拍。',
    suitableFor: '喜欢视觉表达、希望把兴趣变成作品的人。',
    recentActivities: ['城市夜景外拍', '胶片人像工作坊', '期末影展征稿'],
    reviews: [
      { author: '大三 小林', text: '氛围很 Chill，学长会手把手教后期，没相机也能先跟拍学习。' },
    ],
    popular: true,
  },
  {
    id: 'esports',
    name: '电竞社',
    cover: cover('club-esports'),
    summary:
      '校内友谊赛、战队训练与解说志愿并行，兼顾竞技感与团队协作，赛程集中在周末与假期。',
    tags: ['competitive', 'entertainment', 'highCommitment', 'lightSocial'],
    vibeKeywords: ['组队开黑', '赛程刺激', '线下观赛'],
    timeLevel: 'high',
    requirements: '报名时可选娱乐组或竞技组；竞技组需参与固定训练。',
    suitableFor: '喜欢对抗与团队配合、能接受赛前集训的同学。',
    recentActivities: ['院系联赛', '解说培训营', '新品体验日'],
    reviews: [
      { author: '大二 Ark', text: '想认真打的来竞技组很累但成长快，娱乐组就是交朋友为主。' },
    ],
    popular: true,
  },
  {
    id: 'volunteer',
    name: '青年志愿者协会',
    cover: cover('club-volunteer'),
    summary:
      '社区服务、支教与大型活动志愿并行，强调责任感与同伴支持，活动频次可自选模块。',
    tags: ['publicService', 'lightSocial', 'skillGrowth', 'beginnerFriendly'],
    vibeKeywords: ['公益心', '同伴感', '仪式感'],
    timeLevel: 'medium',
    requirements: '需完成一次线下培训；不接受纯「挂名不参与」。',
    suitableFor: '想通过行动帮助他人、同时结识正向圈子的新生。',
    recentActivities: ['社区敬老陪伴日', '校园开放日引导', '乡村线上伴读'],
    reviews: [
      { author: '大四 阿晨', text: '模块多，时间不固定也能找到适合自己的条线与伙伴。' },
    ],
    popular: true,
  },
  {
    id: 'debate',
    name: '辩论队',
    cover: cover('club-debate'),
    summary:
      '校内外赛事密集，强调表达、逻辑与临场反应；周中备赛 + 周末模辩是常态。',
    tags: ['expression', 'competitive', 'highCommitment', 'skillGrowth'],
    vibeKeywords: ['头脑风暴', '高强度表达', '团队依赖'],
    timeLevel: 'high',
    requirements: '需通过试训与淘汰轮；能接受大量练习与复盘。',
    suitableFor: '享受观点交锋、希望在舞台上快速成长的表达型同学。',
    recentActivities: ['新生趣味辩论夜', '城际邀请赛校内选拔', '模辩开放旁听'],
    reviews: [
      { author: '研一 周言', text: '压力大但收获离谱，写稿和临场能力提升很明显。' },
    ],
  },
  {
    id: 'boardgame',
    name: '桌游社',
    cover: cover('club-board'),
    summary:
      '周常桌游夜与剧本杀车组，社交门槛友好，强调轻松破冰与轻度策略博弈。',
    tags: ['entertainment', 'lightSocial', 'beginnerFriendly'],
    vibeKeywords: ['轻松破冰', '小局社交', '不重装备'],
    timeLevel: 'low',
    requirements: '按时到即可，首次参加有人带规；禁止恶意贴脸。',
    suitableFor: '想扩列但不擅长尬聊、希望通过一局游戏自然熟络的人。',
    recentActivities: ['新生迎新局', '德式策略体验周', '校内剧本杀联赛'],
    reviews: [
      { author: '大一 可可', text: '对 i 人友好，主持人会控场，不会被冷落。' },
    ],
    popular: true,
  },
  {
    id: 'dance',
    name: '街舞社',
    cover: cover('club-dance'),
    summary:
      'Breaking / Jazz / Hiphop 分班练习，学期末联合公演；体力与团队磨合并重。',
    tags: ['expression', 'competitive', 'highCommitment', 'entertainment'],
    vibeKeywords: ['舞台感', '体能训练', '团战齐舞'],
    timeLevel: 'high',
    requirements: '零基础可报入门班；公演班需考核与加练。',
    suitableFor: '想用身体表达、接受反复练习打磨动作的同学。',
    recentActivities: ['招新快闪', '联合公演排练', '校外交流夜'],
    reviews: [
      { author: '大三 Miko', text: '累了但爽，公演那一刻会觉得一切都值。' },
    ],
  },
  {
    id: 'maker',
    name: '创客工坊',
    cover: cover('club-maker'),
    summary:
      '3D 打印、嵌入式与小型硬件项目，从课堂 Demo 到科创比赛一条线；偏项目制协作。',
    tags: ['skillGrowth', 'highCommitment', 'competitive', 'expression'],
    vibeKeywords: ['项目制', '动手造物', '比赛导向'],
    timeLevel: 'high',
    requirements: '需自学基础教程并完成入门作业；实验室安全培训必修。',
    suitableFor: '想把想法做成原型、愿意啃文档与调试的同学。',
    recentActivities: ['开源硬件周', '智能小车竞速', '黑客松校内预选'],
    reviews: [
      { author: '大二 老王', text: '社恐也能玩，大家更像项目组而不是纯社交局。' },
    ],
  },
  {
    id: 'anime',
    name: '动漫社',
    cover: cover('club-anime'),
    summary:
      'Cos、宅舞与同人创作并存，活动以节日企划与校内展演为主，氛围多元包容。',
    tags: ['entertainment', 'expression', 'lightSocial', 'beginnerFriendly'],
    vibeKeywords: ['同好聚集', '创作企划', '展演'],
    timeLevel: 'medium',
    requirements: '尊重版权与同伴边界；展演组需额外排练。',
    suitableFor: '有二次元兴趣、希望找到同类并尝试轻量上台的同学。',
    recentActivities: ['迎新游园摊位', '宅舞联排', '同人市集交流'],
    reviews: [
      { author: '大一 七海', text: '不出 Cos 也能来画画写文，组别很多不会无聊。' },
    ],
  },
  {
    id: 'football',
    name: '足球队',
    cover: cover('club-football'),
    summary:
      '院队与兴趣组双线，赛季训练量随组别上升；强调体能、战术执行力与赛后复盘。',
    tags: ['competitive', 'highCommitment', 'lightSocial'],
    vibeKeywords: ['团队信赖', '体能', '赛后聚餐'],
    timeLevel: 'high',
    requirements: '兴趣组门槛低；院队需试训与体能测试。',
    suitableFor: '享受跑动与配合、能承受规律训练的新生。',
    recentActivities: ['新生趣味对抗赛', '体能拉练周', '校联赛小组赛'],
    reviews: [
      { author: '大四 队長', text: '想认真踢的来院队，想偶尔踢球的报兴趣组同样欢迎。' },
    ],
  },
  {
    id: 'reading',
    name: '读书会',
    cover: cover('club-read'),
    summary:
      '每月一书 + 小型沙龙，强调慢节奏交流与写作短评；活动密度低但更走心。',
    tags: ['lightSocial', 'skillGrowth', 'beginnerFriendly', 'entertainment'],
    vibeKeywords: ['慢社交', '文本细读', '小型讨论'],
    timeLevel: 'low',
    requirements: '需完成当月基础阅读进度；欢迎只听不说的旁听席。',
    suitableFor: '喜欢独处阅读、也愿意小型深度对话的同学。',
    recentActivities: ['科幻主题月', '作者线上对谈转播', '短评征文'],
    reviews: [
      { author: '研二 静河', text: '不会强迫发言，i 人可以慢慢找到舒适表达节奏。' },
    ],
  },
  {
    id: 'radio',
    name: '校园广播站',
    cover: cover('club-radio'),
    summary:
      '播客策划、电台节目录制与校内活动主持培训，兼顾声音表达与内容策划能力。',
    tags: ['expression', 'skillGrowth', 'lightSocial', 'beginnerFriendly'],
    vibeKeywords: ['声音表达', '台本', '现场'],
    timeLevel: 'medium',
    requirements: '需通过试音；能接受值班排班与设备学习。',
    suitableFor: '对主持、播客或叙事声音感兴趣的同学。',
    recentActivities: ['新生播客企划', '夜间电台直播周', '典礼主持实训'],
    reviews: [
      { author: '大三 声控学长', text: '值夜班有点辛苦，但上台那次真的超有成就感。' },
    ],
  },
]

export function getClubById(id: string): Club | undefined {
  return CLUBS.find((c) => c.id === id)
}
