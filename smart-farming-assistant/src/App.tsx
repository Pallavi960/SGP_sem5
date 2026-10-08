import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './Layout'
import Home from './Home'
import Features from './Features'
import AIAssistant from './AIAssistant'
import DiseaseDetection from './DiseaseDetection'
import CropRecommendation from './CropRecommendation'
import Weather from './Weather'
import FarmPlanner from './FarmPlanner'
import FertilizerAdvisor from './FertilizerAdvisor'
import About from './About'
import Contact from './Contact'
import GovernmentSchemes from './GovernmentSchemes'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Prediction from './Prediction'
import HowToUse from './HowToUse'

export default function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<Features />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="disease-detection" element={<DiseaseDetection />} />
            <Route path="crop-recommendation" element={<CropRecommendation />} />
            <Route path="weather" element={<Weather />} />
            <Route path="farm-planner" element={<FarmPlanner />} />
            <Route path="fertilizer-advisor" element={<FertilizerAdvisor />} />
            <Route path="prediction" element={<Prediction />} />
            <Route path="about" element={<About />} />
            <Route path="how-to-use" element={<HowToUse />} />
            <Route path="contact" element={<Contact />} />
            <Route path="government-schemes" element={<GovernmentSchemes />} />
            <Route path="login" element={<Login />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </LanguageProvider>
  )
}
