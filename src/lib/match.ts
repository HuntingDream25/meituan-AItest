import type { Club, ClubTagId, FinalPick, QuizQuestion, RankedClub, UserWeights } from '../types/domain'
import { TAG_LABELS } from '../data/tagLabels'
import { QUIZ_QUESTIONS } from '../data/quiz'

export function mergeWeightsFromAnswers(
  answers: Record<string, string>,
  questions: QuizQuestion[] = QUIZ_QUESTIONS,
): UserWeights {
  const acc: UserWeights = {}
  for (const q of questions) {
    const optId = answers[q.id]
    const opt = q.options.find((o) => o.id === optId)
    if (!opt) continue
    for (const [tag, w] of Object.entries(opt.weights)) {
      const k = tag as ClubTagId
      acc[k] = (acc[k] ?? 0) + w
    }
  }
  return acc
}

export function scoreClubRaw(club: Club, weights: UserWeights): number {
  let s = 0
  for (const tag of club.tags) {
    s += weights[tag] ?? 0
  }
  const n = club.tags.length || 1
  return s / n + club.tags.length * 0.15
}

export function rankClubs(clubs: Club[], weights: UserWeights): RankedClub[] {
  const scored = clubs.map((club) => ({
    club,
    raw: scoreClubRaw(club, weights),
  }))
  const maxRaw = Math.max(...scored.map((s) => s.raw), 1e-6)
  const ranked = scored.map((s) => ({
    ...s,
    percent: Math.min(99, Math.max(52, Math.round((s.raw / maxRaw) * 100))),
  }))
  ranked.sort((a, b) => {
    if (b.raw !== a.raw) return b.raw - a.raw
    return a.club.id.localeCompare(b.club.id)
  })
  return ranked
}

function topTagIds(weights: UserWeights, n: number): ClubTagId[] {
  return (Object.entries(weights) as [ClubTagId, number][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k)
}

export function buildProfileSummary(weights: UserWeights): string {
  const top = topTagIds(weights, 3).map((id) => TAG_LABELS[id])
  const highCommit = (weights.highCommitment ?? 0) > (weights.lightSocial ?? 0)
  const tone = highCommit
    ? '能接受一定强度、希望把事情做成的社团'
    : '节奏相对轻、社交压力可控的社团'
  if (top.length === 0) {
    return '你的画像偏均衡，建议先通过滑卡感受氛围，再决定深入了解哪些社团。'
  }
  return `根据你的选择，你更关注「${top.join('、')}」相关体验；整体来说，${tone}会更合拍。`
}

export function explainMatch(club: Club, weights: UserWeights): string {
  const top = topTagIds(weights, 2).map((id) => TAG_LABELS[id])
  const topLabel = top.length ? top.join('与') : '轻松有趣'
  const vibe =
    club.vibeKeywords.length > 0 ? club.vibeKeywords.slice(0, 2).join('、') : club.name.slice(0, 4)
  return `推荐你关注「${club.name}」：你偏好的方向偏${topLabel}，而该社团氛围关键词包含「${vibe}」，与当前投入预期较匹配。`
}

const timeOrder = { low: 0, medium: 1, high: 2 } as const

function tagIntensity(club: Club, tags: ClubTagId[]): number {
  let n = 0
  for (const t of tags) {
    if (club.tags.includes(t)) n += 1
  }
  return n
}

export function getFinalPicks(
  favoriteIds: string[],
  ranked: RankedClub[],
): FinalPick[] {
  const byId = new Map(ranked.map((r) => [r.club.id, r]))
  const picks: FinalPick[] = []
  const used = new Set<string>()

  const favSorted = [...favoriteIds]
    .map((id) => byId.get(id))
    .filter((r): r is RankedClub => Boolean(r))
    .sort((a, b) => b.raw - a.raw)

  for (const r of favSorted) {
    if (picks.length >= 3) break
    picks.push({ ...r, source: 'favorite' })
    used.add(r.club.id)
  }

  for (const r of ranked) {
    if (picks.length >= 3) break
    if (used.has(r.club.id)) continue
    picks.push({ ...r, source: 'filled' })
    used.add(r.club.id)
  }

  return picks.slice(0, 3)
}

export function getDecisionBullets(top3: FinalPick[]): string[] {
  if (top3.length === 0) return []

  const clubs = top3.map((p) => p.club)

  let socialIdx = 0
  let bestSocial = -1
  clubs.forEach((c, i) => {
    const sc = tagIntensity(c, ['lightSocial', 'entertainment', 'beginnerFriendly'])
    if (sc > bestSocial) {
      bestSocial = sc
      socialIdx = i
    }
  })

  let skillIdx = 0
  let bestSkill = -1
  clubs.forEach((c, i) => {
    const sc = tagIntensity(c, ['skillGrowth', 'expression'])
    if (sc > bestSkill) {
      bestSkill = sc
      skillIdx = i
    }
  })

  let timeIdx = 0
  let bestTime = 99
  clubs.forEach((c, i) => {
    const o = timeOrder[c.timeLevel]
    if (o < bestTime) {
      bestTime = o
      timeIdx = i
    }
  })

  const A = clubs[socialIdx]?.name ?? clubs[0].name
  const B = clubs[skillIdx]?.name ?? clubs[0].name
  const C = clubs[timeIdx]?.name ?? clubs[0].name

  return [
    `如果你想先交朋友、更快找到同伴感，可以优先考虑「${A}」。`,
    `如果你想系统提升能力或做出可展示的作品，建议把「${B}」放进优先报名清单。`,
    `如果你担心时间有限、希望节奏更可控，可先深入了解「${C}」的投入方式是否合适。`,
  ]
}
