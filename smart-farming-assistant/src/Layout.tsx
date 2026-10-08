import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import FloatingAIAssistant from './components/FloatingAIAssistant'
import FloatingHowToUse from './components/FloatingHowToUse'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-800 relative">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>

      {/* Global Floating AI Assistant (Krishi Mitra) */}
      <FloatingAIAssistant />

      {/* Global Floating How to Use helper */}
      <FloatingHowToUse />
    </div>
  )
}
