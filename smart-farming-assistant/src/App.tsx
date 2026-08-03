import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Features from './Features'
import AIAssistant from './AIAssistant'
import DiseaseDetection from './DiseaseDetection'
import CropRecommendation from './CropRecommendation'
import Weather from './Weather'
import About from './About'
import Contact from './Contact'
import GovernmentSchemes from './GovernmentSchemes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="disease-detection" element={<DiseaseDetection />} />
          <Route path="crop-recommendation" element={<CropRecommendation />} />
          <Route path="weather" element={<Weather />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="government-schemes" element={<GovernmentSchemes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
