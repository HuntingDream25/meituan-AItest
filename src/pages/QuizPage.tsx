import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { QUIZ_QUESTIONS } from '../data/quiz'
import { useApp } from '../context/useApp'
import styles from './QuizPage.module.css'

export function QuizPage() {
  const navigate = useNavigate()
  const { completeQuiz } = useApp()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const q = QUIZ_QUESTIONS[step]
  const total = QUIZ_QUESTIONS.length
  const pct = useMemo(() => Math.round(((step + 1) / total) * 100), [step, total])

  const onPick = (optionId: string) => {
    const nextAnswers = { ...answers, [q.id]: optionId }
    setAnswers(nextAnswers)
    if (step + 1 >= total) {
      completeQuiz(nextAnswers)
      navigate('/quiz/result')
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <Layout showNav={false}>
      <div className={styles.top}>
        <div className={styles.progress} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressBar} style={{ width: `${pct}%` }} />
        </div>
        <p className={styles.stepLabel}>
          {step + 1} / {total}
        </p>
      </div>

      <section className={styles.panel}>
        <h1 className={styles.prompt}>{q.prompt}</h1>
        <div className={styles.options}>
          {q.options.map((o) => (
            <button
              key={o.id}
              type="button"
              className={styles.option}
              onClick={() => onPick(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>

      <p className={styles.hint}>选最贴近的一项即可，没有标准答案。</p>
    </Layout>
  )
}
