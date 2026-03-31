import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppDevice } from './components/AppDevice'
import { AppProvider } from './context/AppProvider'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { QuizResultPage } from './pages/QuizResultPage'
import { SwipePage } from './pages/SwipePage'
import { ClubDetailPage } from './pages/ClubDetailPage'
import { SavedPage } from './pages/SavedPage'
import { HotPage } from './pages/HotPage'

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppDevice>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz/result" element={<QuizResultPage />} />
            <Route path="/swipe" element={<SwipePage />} />
            <Route path="/club/:id" element={<ClubDetailPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/hot" element={<HotPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppDevice>
      </AppProvider>
    </HashRouter>
  )
}
