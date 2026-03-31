import type { ClubTagId } from '../types/domain'

export const TAG_LABELS: Record<ClubTagId, string> = {
  entertainment: '兴趣娱乐',
  competitive: '竞技挑战',
  publicService: '公益服务',
  skillGrowth: '技能成长',
  expression: '表达舞台',
  lightSocial: '轻社交',
  highCommitment: '高投入',
  beginnerFriendly: '零基础友好',
}

export const TIME_LEVEL_LABEL: Record<'low' | 'medium' | 'high', string> = {
  low: '低投入：偶尔活动，适合尝试型同学',
  medium: '中投入：每周有固定安排',
  high: '高投入：适合希望深度参与并承担职责的同学',
}

export const TIME_LEVEL_SHORT: Record<'low' | 'medium' | 'high', string> = {
  low: '低',
  medium: '中',
  high: '高',
}
