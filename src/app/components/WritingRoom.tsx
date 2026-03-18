import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Particles } from './Particles';
import { Owl } from './Owl';
import { saveNewLetter } from '../utils/letterStorage';
import { generateFutureResponse } from '../utils/generateResponse';

export function WritingRoom() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [showOwl, setShowOwl] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    setIsClosing(true);

    // Generate response and save
    setTimeout(() => {
      const response = generateFutureResponse(message);
      const letter = saveNewLetter(message, response);
      
      // Show owl flying away
      setShowOwl(true);
      
      // Navigate to transition with letter ID
      setTimeout(() => {
        navigate('/sending', { state: { letterId: letter.id } });
      }, 1000);
    }, 1500);
  };

  return (
    <div className="relative size-full bg-[#0B0B0F] overflow-hidden flex items-center justify-center">
      <Particles />

      <div className="relative z-10 w-full max-w-3xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-3xl md:text-4xl mb-8 text-center text-[#E8DCC4]" style={{ fontFamily: "'EB Garamond', serif", fontWeight: 500 }}>
            Write to your future self
          </h2>

          <p className="text-center text-[#C4B5A0] opacity-70 mb-12 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
            Your words will travel through time...
          </p>
        </motion.div>

        <AnimatePresence>
          {!isClosing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: -15 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Paper background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F4E4C1] to-[#E8DCC4] opacity-95 shadow-2xl" 
                   style={{ 
                     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                   }} 
              />
              
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4" /%3E%3C/svg%3E")',
              }} />

              <div className="relative p-12 md:p-16">
                {/* Decorative lines at top */}
                <div className="flex items-center gap-4 mb-8 opacity-30">
                  <div className="h-px flex-1 bg-[#8B7355]" />
                  <div className="w-2 h-2 rounded-full bg-[#8B7355]" />
                  <div className="h-px flex-1 bg-[#8B7355]" />
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Dear future me..."
                  className="w-full h-64 bg-transparent border-none outline-none resize-none text-[#2C2416] placeholder:text-[#8B7355] placeholder:opacity-40 text-lg leading-relaxed"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
                  }}
                  autoFocus
                />

                {/* Decorative lines at bottom */}
                <div className="flex items-center gap-4 mt-8 opacity-30">
                  <div className="h-px flex-1 bg-[#8B7355]" />
                  <div className="w-2 h-2 rounded-full bg-[#8B7355]" />
                  <div className="h-px flex-1 bg-[#8B7355]" />
                </div>
              </div>
            </motion.div>
          )}

          {isClosing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-32 h-24 mx-auto bg-gradient-to-b from-[#F4E4C1] to-[#E8DCC4] shadow-2xl"
                     style={{ 
                       clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                     }}
                />
              </motion.div>
              <p className="text-[#C4B5A0] mt-8 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
                Sealing your letter...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!isClosing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="group relative px-10 py-3 overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
              <div className="absolute inset-0 border border-[#D4AF37] opacity-40" />
              
              <span className="relative text-[#E8DCC4] text-lg tracking-wide">
                Send to the Future
              </span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="block mx-auto mt-8 text-[#C4B5A0] opacity-50 hover:opacity-80 transition-opacity text-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ← Return
            </button>
          </motion.div>
        )}
        
        {showOwl && (
          <motion.div
            initial={{ x: '50%', y: '100%', opacity: 0 }}
            animate={{ x: '-100%', y: '-100%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 pointer-events-none z-50"
          >
            <Owl isCarryingLetter size="large" />
          </motion.div>
        )}
      </div>
    </div>
  );
}