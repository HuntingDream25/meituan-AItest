export type ClubTagId =
  | 'entertainment'
  | 'competitive'
  | 'publicService'
  | 'skillGrowth'
  | 'expression'
  | 'lightSocial'
  | 'highCommitment'
  | 'beginnerFriendly'

export type TimeLevel = 'low' | 'medium' | 'high'

export interface Club {
  id: string
  name: string
  cover: string
  summary: string
  tags: ClubTagId[]
  vibeKeywords: string[]
  timeLevel: TimeLevel
  requirements: string
  suitableFor: string
  recentActivities: string[]
  reviews: { author: string; text: string }[]
  popular?: boolean
}

export type UserWeights = Partial<Record<ClubTagId, number>>

export interface QuizOption {
  id: string
  label: string
  weights: UserWeights
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: QuizOption[]
}

export interface UserProfile {
  answers: Record<string, string>
  weights: UserWeights
  summary: string
}

export interface RankedClub {
  club: Club
  raw: number
  percent: number
}

export interface FinalPick extends RankedClub {
  source: 'favorite' | 'filled'
}
