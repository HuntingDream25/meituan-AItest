import { useCallback, useRef, useState } from 'react'
import type { RankedClub, UserWeights } from '../types/domain'
import { explainMatch } from '../lib/match'
import { TAG_LABELS, TIME_LEVEL_SHORT } from '../data/tagLabels'
import { TagChip } from './TagChip'
import styles from './SwipeDeck.module.css'

type Props = {
  stack: RankedClub[]
  weights: UserWeights
  onSwipeLeft: (id: string) => void
  onSwipeRight: (id: string) => void
  onOpenDetail: (id: string) => void
}

export function SwipeDeck({
  stack,
  weights,
  onSwipeLeft,
  onSwipeRight,
  onOpenDetail,
}: Props) {
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const current = stack[0]
  const next = stack[1]

  const commit = useCallback(
    (dir: 'left' | 'right') => {
      if (!current) return
      const id = current.club.id
      if (dir === 'left') onSwipeLeft(id)
      else onSwipeRight(id)
      setDragX(0)
    },
    [current, onSwipeLeft, onSwipeRight],
  )

  const onPointerDown = (e: React.PointerEvent) => {
    if (!current) return
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(true)
    startX.current = e.clientX
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    if (!current) return
    setDragX(e.clientX - startX.current)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!current) return
    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    setDragging(false)
    if (dragX > 90) commit('right')
    else if (dragX < -90) commit('left')
    else setDragX(0)
  }

  if (!current) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>本轮可逛的社团都看完啦</p>
        <p className={styles.emptyHint}>
          去心动池整理清单，或清空「跳过记录」再来一轮浏览。
        </p>
      </div>
    )
  }

  const rot = dragX * 0.06
  const hint =
    dragX > 40 ? '喜欢' : dragX < -40 ? '跳过' : dragging ? '' : '左右滑动'

  const reason = explainMatch(current.club, weights)

  return (
    <div className={styles.wrap}>
      <div className={styles.deck}>
        {next ? (
          <div className={styles.backCard} aria-hidden>
            <div className={styles.backInner}>
              <span className={styles.backName}>{next.club.name}</span>
            </div>
          </div>
        ) : null}

        <div
          ref={cardRef}
          className={styles.card}
          style={{
            transform: `translateX(${dragX}px) rotate(${rot}deg)`,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            setDragging(false)
            setDragX(0)
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') commit('left')
            if (e.key === 'ArrowRight') commit('right')
          }}
        >
        <button
          type="button"
          className={styles.detailHit}
          onClick={(e) => {
            e.stopPropagation()
            onOpenDetail(current.club.id)
          }}
        >
          查看详情
        </button>
        <div
          className={styles.hint}
          data-visible={dragging && Math.abs(dragX) > 20 ? 'true' : 'false'}
        >
          {hint}
        </div>
        <div className={styles.coverWrap}>
          <img
            src={current.club.cover}
            alt=""
            className={styles.cover}
            draggable={false}
          />
          <div className={styles.coverGrad} />
          <div className={styles.scorePill}>匹配度 {current.percent}%</div>
        </div>
        <div className={styles.body}>
          <h2 className={styles.title}>{current.club.name}</h2>
          <div className={styles.tags}>
            {current.club.tags.map((t) => (
              <TagChip key={t}>{TAG_LABELS[t]}</TagChip>
            ))}
          </div>
          <p className={styles.reason}>{reason}</p>
          <div className={styles.meta}>
            <span>时间投入：{TIME_LEVEL_SHORT[current.club.timeLevel]}</span>
            <span className={styles.dot}>·</span>
            <span>氛围：{current.club.vibeKeywords.slice(0, 2).join(' / ')}</span>
          </div>
          <p className={styles.gate}>门槛：{current.club.requirements}</p>
        </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.pass} onClick={() => commit('left')}>
          跳过
        </button>
        <button type="button" className={styles.like} onClick={() => commit('right')}>
          心动
        </button>
      </div>
    </div>
  )
}
