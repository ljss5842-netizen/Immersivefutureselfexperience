import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router';
import { Particles } from './Particles';
import { Owl } from './Owl';
import { getLetter } from '../utils/letterStorage';

export function ReadingScene() {
  const navigate = useNavigate();
  const { letterId } = useParams();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [letter, setLetter] = useState<ReturnType<typeof getLetter>>(null);
  const [showOwl, setShowOwl] = useState(false);

  useEffect(() => {
    if (!letterId) {
      navigate('/');
      return;
    }

    const foundLetter = getLetter(letterId);
    if (!foundLetter) {
      navigate('/');
      return;
    }

    setLetter(foundLetter);
  }, [letterId, navigate]);

  useEffect(() => {
    if (!letter) return;

    const fullText = letter.response;
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        
        // Show owl after reading is complete
        setTimeout(() => setShowOwl(true), 2000);
      }
    }, 30); // Typewriter speed

    return () => clearInterval(interval);
  }, [letter]);

  if (!letter) return null;

  return (
    <div className="relative size-full bg-[#0B0B0F] overflow-hidden flex items-center justify-center p-8">
      <Particles />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative"
        >
          {/* Paper */}
          <div className="relative bg-gradient-to-b from-[#F4E4C1] to-[#E8DCC4] shadow-2xl p-12 md:p-16"
               style={{ 
                 boxShadow: '0 25px 70px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
               }}
          >
            {/* Paper texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4" /%3E%3C/svg%3E")',
            }} />

            {/* Decorative header */}
            <div className="flex items-center gap-4 mb-8 opacity-30">
              <div className="h-px flex-1 bg-[#8B7355]" />
              <div className="text-[#8B7355] text-xs tracking-widest" style={{ fontFamily: "'EB Garamond', serif" }}>
                FROM THE FUTURE
              </div>
              <div className="h-px flex-1 bg-[#8B7355]" />
            </div>

            {/* Letter content */}
            <div className="relative min-h-96 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
              <p 
                className="text-[#2C2416] text-lg md:text-xl leading-relaxed whitespace-pre-wrap"
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  textShadow: '0 1px 1px rgba(0, 0, 0, 0.05)'
                }}
              >
                {displayedText}
                {!isComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-6 bg-[#2C2416] ml-1"
                  />
                )}
              </p>
            </div>

            {/* Decorative footer */}
            <div className="flex items-center gap-4 mt-12 opacity-30">
              <div className="h-px flex-1 bg-[#8B7355]" />
              <div className="w-2 h-2 rounded-full bg-[#8B7355]" />
              <div className="h-px flex-1 bg-[#8B7355]" />
            </div>

            {/* Date stamp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isComplete ? 0.4 : 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-right text-[#8B7355] text-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
            >
              {new Date(new Date(letter.createdAt).getTime() + 10 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </motion.div>
          </div>

          {/* Paper shadow/depth */}
          <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-[#2C2416] opacity-20" />
          <div className="absolute inset-0 -z-20 translate-x-4 translate-y-4 bg-[#2C2416] opacity-10" />
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ delay: 1 }}
          className="flex gap-6 justify-center mt-12"
        >
          <button
            onClick={() => navigate('/archive')}
            className="group relative px-8 py-3 overflow-hidden"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
            <div className="absolute inset-0 border border-[#D4AF37] opacity-40" />
            <span className="relative text-[#E8DCC4] tracking-wide">View Archive</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="text-[#C4B5A0] opacity-60 hover:opacity-90 transition-opacity px-8 py-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Return Home
          </button>
        </motion.div>
      </div>

      {/* Candle light effect */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl"
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }}
      />

      {/* Owl flying by after reading complete */}
      {showOwl && (
        <motion.div
          initial={{ x: '110%', y: '20%', opacity: 0 }}
          animate={{ 
            x: '-10%', 
            y: '60%', 
            opacity: [0, 0.7, 0.7, 0]
          }}
          transition={{ 
            duration: 6,
            times: [0, 0.1, 0.8, 1],
            ease: "easeInOut"
          }}
          className="absolute right-0 top-0 pointer-events-none"
        >
          <Owl size="medium" />
        </motion.div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 115, 85, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 115, 85, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 115, 85, 0.5);
        }
      `}</style>
    </div>
  );
}