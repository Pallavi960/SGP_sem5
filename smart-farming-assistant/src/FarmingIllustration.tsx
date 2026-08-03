import { motion } from 'framer-motion'

export default function FarmingIllustration() {
  return (
    <div className="relative w-full h-[480px] select-none">

      {/* Sky gradient background */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-b from-[#E8F5E9] via-[#F1F8E9] to-[#DCEDC8]">

        {/* Sun */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 right-16 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-lg shadow-yellow-200"
        />
        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            style={{ transform: `rotate(${deg}deg)`, transformOrigin: '8px 8px', top: 28, right: 72 }}
            className="absolute w-10 h-0.5 bg-yellow-300 rounded-full opacity-50"
          />
        ))}

        {/* Clouds */}
        <motion.div
          animate={{ x: [0, 18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10"
        >
          <div className="relative">
            <div className="w-20 h-8 bg-white rounded-full opacity-80" />
            <div className="absolute -top-3 left-4 w-12 h-10 bg-white rounded-full opacity-80" />
            <div className="absolute -top-2 left-10 w-10 h-8 bg-white rounded-full opacity-80" />
          </div>
        </motion.div>
        <motion.div
          animate={{ x: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-6 left-40"
        >
          <div className="relative">
            <div className="w-14 h-6 bg-white rounded-full opacity-60" />
            <div className="absolute -top-2 left-3 w-9 h-7 bg-white rounded-full opacity-60" />
          </div>
        </motion.div>

        {/* Ground / Field */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#388E3C] to-[#66BB6A] rounded-b-3xl" />
        {/* Field rows */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute bottom-0 left-0 right-0 border-t border-[#2E7D32] opacity-20"
            style={{ bottom: 28 + i * 18 }}
          />
        ))}

        {/* Hills */}
        <div className="absolute bottom-32 left-0 w-48 h-24 bg-[#4CAF50] rounded-t-full opacity-60" />
        <div className="absolute bottom-32 right-0 w-56 h-20 bg-[#43A047] rounded-t-full opacity-50" />
        <div className="absolute bottom-32 left-24 w-64 h-16 bg-[#66BB6A] rounded-t-full opacity-40" />

        {/* Tall Plant / Tree left */}
        <motion.g
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute bottom-32 left-12">
            {/* Trunk */}
            <div className="w-3 h-20 bg-[#5D4037] rounded-full mx-auto" />
            {/* Leaves cluster */}
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -left-6 w-16 h-16 bg-[#2E7D32] rounded-full opacity-90"
            />
            <div className="absolute -top-6 -left-2 w-10 h-10 bg-[#388E3C] rounded-full opacity-90" />
            <div className="absolute -top-8 left-4 w-12 h-12 bg-[#43A047] rounded-full opacity-80" />
          </div>
        </motion.g>

        {/* Wheat stalks center */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            className="absolute bottom-32"
            style={{ left: `${38 + i * 5}%` }}
          >
            <div className="w-1 bg-[#8BC34A] rounded-full" style={{ height: 48 + (i % 3) * 10 }} />
            {/* Grain head */}
            <div className="w-2 h-5 bg-[#FDD835] rounded-full -mt-1 mx-auto opacity-90" />
          </motion.div>
        ))}

        {/* AI Circuit Node — center floating */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-1/2 -translate-x-1/2"
        >
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#2E7D32] opacity-30 animate-ping" />
            <div className="absolute inset-1 rounded-full border border-[#4CAF50] opacity-50" />
            {/* Core */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] shadow-lg flex items-center justify-center">
              {/* Brain/AI icon SVG */}
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-none stroke-white stroke-2">
                <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1 0 8v1a4 4 0 0 1-8 0v-1a4 4 0 0 1 0-8V6a4 4 0 0 1 4-4z" />
                <path d="M8 10H6a2 2 0 0 0 0 4h2M16 10h2a2 2 0 0 1 0 4h-2" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            {/* Orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF50] shadow-md absolute -top-1 left-1/2 -translate-x-1/2" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating data cards */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-24 right-8 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-green-100"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-gray-700">Soil: Optimal</span>
        </motion.div>

        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-44 right-6 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-green-100"
        >
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-xs font-semibold text-gray-700">Humidity: 72%</span>
        </motion.div>

        <motion.div
          animate={{ y: [-3, 5, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute top-28 left-6 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-green-100"
        >
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-semibold text-gray-700">Rain: 12mm</span>
        </motion.div>

        {/* Connection lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.line
            x1="50%" y1="25%" x2="80%" y2="20%"
            stroke="#2E7D32" strokeWidth="1" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.line
            x1="50%" y1="25%" x2="20%" y2="22%"
            stroke="#2E7D32" strokeWidth="1" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
          />
          <motion.line
            x1="50%" y1="25%" x2="82%" y2="45%"
            stroke="#2E7D32" strokeWidth="1" strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
          />
        </svg>

        {/* Leaf decorations */}
        <motion.div
          animate={{ rotate: [-10, 10, -10], y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-36 right-14"
        >
          <svg viewBox="0 0 40 60" className="w-8 h-12 opacity-80">
            <path d="M20 55 C20 55 2 40 2 22 C2 10 10 2 20 2 C30 2 38 10 38 22 C38 40 20 55 20 55Z" fill="#2E7D32" />
            <line x1="20" y1="55" x2="20" y2="5" stroke="#1B5E20" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="10" y2="30" stroke="#1B5E20" strokeWidth="1" />
            <line x1="20" y1="30" x2="30" y2="38" stroke="#1B5E20" strokeWidth="1" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ rotate: [8, -8, 8], y: [2, -2, 2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-40 left-32"
        >
          <svg viewBox="0 0 40 60" className="w-6 h-9 opacity-70">
            <path d="M20 55 C20 55 2 40 2 22 C2 10 10 2 20 2 C30 2 38 10 38 22 C38 40 20 55 20 55Z" fill="#4CAF50" />
            <line x1="20" y1="55" x2="20" y2="5" stroke="#2E7D32" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
