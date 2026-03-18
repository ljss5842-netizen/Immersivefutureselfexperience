import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Particles } from './Particles';
import { getLetters, type Letter } from '../utils/letterStorage';
import { Archive } from 'lucide-react';

export function ArchiveScene() {
  const navigate = useNavigate();
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    setLetters(getLetters().reverse()); // Most recent first
  }, []);

  return (
    <div className="relative size-full bg-[#0B0B0F] overflow-hidden">
      <Particles />

      <div className="relative z-10 size-full overflow-y-auto p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <Archive className="w-12 h-12 mx-auto mb-6 text-[#D4AF37] opacity-70" />
            <h1 className="text-4xl md:text-5xl mb-4 text-[#E8DCC4]" style={{ fontFamily: "'EB Garamond', serif", fontWeight: 500 }}>
              Archive of Time
            </h1>
            <p className="text-[#C4B5A0] opacity-70 text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
              Letters from your past, words from your future
            </p>
          </div>

          {/* Letters grid */}
          {letters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-20"
            >
              <p className="text-[#C4B5A0] text-xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                No letters yet...
              </p>
              <button
                onClick={() => navigate('/write')}
                className="group relative px-10 py-3 overflow-hidden"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="absolute inset-0 border border-[#D4AF37] opacity-40" />
                <span className="relative text-[#E8DCC4] tracking-wide">Write Your First Letter</span>
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {letters.map((letter, index) => (
                <LetterCard 
                  key={letter.id} 
                  letter={letter} 
                  index={index}
                  onClick={() => navigate(`/read/${letter.id}`)}
                />
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/')}
              className="text-[#C4B5A0] opacity-60 hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ← Return Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LetterCard({ letter, index, onClick }: { letter: Letter; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const date = new Date(letter.createdAt);
  const futureDate = new Date(date.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);

  // Truncate message for preview
  const preview = letter.message.length > 100 
    ? letter.message.slice(0, 100) + '...' 
    : letter.message;

  const handleClick = () => {
    setIsFlipped(true);
    setTimeout(() => {
      onClick();
    }, 600);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative text-left"
      style={{ perspective: '1000px' }}
    >
      {/* Floating animation */}
      <motion.div
        animate={{ 
          y: isHovered ? -10 : [0, -5, 0],
          rotateZ: isHovered ? 2 : 0,
          rotateX: isFlipped ? -15 : 0,
          scale: isFlipped ? 0.95 : 1
        }}
        transition={{ 
          y: { duration: isHovered ? 0.3 : 3, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" },
          rotateZ: { duration: 0.3 },
          rotateX: { duration: 0.6 },
          scale: { duration: 0.6 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Envelope flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-32 origin-bottom z-10"
          animate={{
            rotateX: isHovered ? -25 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{ 
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F4E4C1] to-[#E8DCC4] shadow-lg"
            style={{
              clipPath: 'polygon(0 30%, 50% 0, 100% 30%, 100% 100%, 0 100%)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Paper texture */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4" /%3E%3C/svg%3E")',
            }} />
          </div>
        </motion.div>

        {/* Envelope body */}
        <div 
          className="relative bg-gradient-to-b from-[#F4E4C1] to-[#E8DCC4] p-6 shadow-xl overflow-hidden"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
            minHeight: '280px'
          }}
        >
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4" /%3E%3C/svg%3E")',
          }} />

          {/* Date header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#8B7355] border-opacity-20">
            <div className="flex-1">
              <p className="text-[#8B7355] text-xs tracking-wide" style={{ fontFamily: "'EB Garamond', serif" }}>
                Written
              </p>
              <p className="text-[#2C2416] text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="text-[#8B7355] opacity-50">→</div>
            <div className="flex-1 text-right">
              <p className="text-[#8B7355] text-xs tracking-wide" style={{ fontFamily: "'EB Garamond', serif" }}>
                Received
              </p>
              <p className="text-[#2C2416] text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Preview */}
          <p 
            className="text-[#2C2416] text-sm leading-relaxed line-clamp-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {preview}
          </p>

          {/* Wax seal */}
          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-[#8B0000] to-[#DC143C] shadow-md">
            <div className="absolute inset-1 rounded-full border border-[#FFD700] opacity-40" />
          </div>

          {/* Hover shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: isHovered ? '200%' : '-100%',
              opacity: isHovered ? 0.2 : 0
            }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Shadow layers */}
        <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-[#2C2416] opacity-20" />
      </motion.div>

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 -z-20 blur-xl"
        animate={{ 
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full bg-[#D4AF37]" />
      </motion.div>
    </motion.button>
  );
}