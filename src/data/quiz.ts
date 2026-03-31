import type { QuizQuestion } from '../types/domain'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'goal',
    prompt: '加入社团，你最想先获得什么？',
    options: [
      {
        id: 'belong',
        label: '归属感与同伴（不想再一个人）',
        weights: { lightSocial: 2, beginnerFriendly: 1, entertainment: 1 },
      },
      {
        id: 'skill',
        label: '可迁移的技能与作品沉淀',
        weights: { skillGrowth: 3, expression: 1, highCommitment: 1 },
      },
      {
        id: 'give',
        label: '帮助他人的意义感',
        weights: { publicService: 3, lightSocial: 1 },
      },
      {
        id: 'win',
        label: '荣誉、赛事与碾压式进步',
        weights: { competitive: 3, highCommitment: 2 },
      },
    ],
  },
  {
    id: 'social',
    prompt: '你更偏好的协作与社交方式是？',
    options: [
      {
        id: 'small',
        label: '小圈子深度熟络',
        weights: { lightSocial: 3, beginnerFriendly: 1 },
      },
      {
        id: 'wide',
        label: '认识很多人、场面热闹也行',
        weights: { entertainment: 2, expression: 1, lightSocial: 1 },
      },
      {
        id: 'solo',
        label: '多数时候独立推进，偶尔碰头',
        weights: { skillGrowth: 2, lightSocial: 1 },
      },
      {
        id: 'lead',
        label: '愿意牵头、带动一群人往前冲',
        weights: { highCommitment: 2, competitive: 1, expression: 1 },
      },
    ],
  },
  {
    id: 'time',
    prompt: '课余时间，你真实能给出的投入档位是？',
    options: [
      {
        id: 'low',
        label: '有空就来，低频参与最舒服',
        weights: { lightSocial: 1, entertainment: 2, beginnerFriendly: 1 },
      },
      {
        id: 'mid',
        label: '每周固定 1–2 次可以接受',
        weights: { skillGrowth: 1, expression: 1 },
      },
      {
        id: 'high',
        label: '愿意为重要目标高强度投入',
        weights: { highCommitment: 3, competitive: 1, skillGrowth: 1 },
      },
    ],
  },
  {
    id: 'pace',
    prompt: '整体节奏上，你更想要哪种体验？',
    options: [
      {
        id: 'easy',
        label: '轻松体验，压力别太大',
        weights: { beginnerFriendly: 2, entertainment: 2, lightSocial: 1 },
      },
      {
        id: 'challenge',
        label: '愿意被项目与挑战推着走',
        weights: { competitive: 2, skillGrowth: 2, highCommitment: 1 },
      },
      {
        id: 'mix',
        label: '平时轻松，关键节点可以狠一点',
        weights: { skillGrowth: 1, expression: 1, lightSocial: 1 },
      },
    ],
  },
  {
    id: 'style',
    prompt: '下面这些活动气质，哪个最戳你？',
    options: [
      {
        id: 'express',
        label: '上台、表达、被看见',
        weights: { expression: 3, entertainment: 1 },
      },
      {
        id: 'create',
        label: '创作、制作、把想法做出来',
        weights: { skillGrowth: 2, expression: 1 },
      },
      {
        id: 'service',
        label: '服务、陪伴、让世界好一点',
        weights: { publicService: 3, lightSocial: 1 },
      },
      {
        id: 'arena',
        label: '对抗、复盘、比分与极限操作',
        weights: { competitive: 3, highCommitment: 1 },
      },
    ],
  },
]
