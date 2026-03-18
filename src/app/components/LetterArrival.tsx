import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { Particles } from './Particles';
import { Owl } from './Owl';
import { EnvelopeAnimation } from './EnvelopeAnimation';

export function LetterArrival() {
  const navigate = useNavigate();
  const location = useLocation();
  const letterId = location.state?.letterId;
  const [isOpening, setIsOpening] = useState(false);
  const [showOwl, setShowOwl] = useState(true);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      navigate(`/read/${letterId}`);
    }, 1800);
  };

  return (
    <div className="relative size-full bg-[#0B0B0F] overflow-hidden flex items-center justify-center">
      <Particles />

      {/* Owl delivering letter */}
      {showOwl && (
        <motion.div
          initial={{ x: '-20%', y: '-50%', opacity: 0 }}
          animate={{ 
            x: '45%', 
            y: '20%', 
            opacity: [0, 1, 1, 1, 0]
          }}
          transition={{ 
            duration: 3,
            times: [0, 0.2, 0.6, 0.8, 1],
            ease: "easeOut"
          }}
          onAnimationComplete={() => setShowOwl(false)}
          className="absolute left-0 top-0 pointer-events-none z-30"
        >
          <Owl isCarryingLetter size="large" />
        </motion.div>
      )}

      <div className="relative z-10">
        <motion.div
          initial={{ y: -300, opacity: 0, rotateZ: -20 }}
          animate={{ y: 0, opacity: 1, rotateZ: 0 }}
          transition={{ 
            duration: 2,
            ease: [0.4, 0, 0.2, 1],
            delay: 2.5
          }}
          className="relative"
        >
          <EnvelopeAnimation 
            isOpen={isOpening} 
            onClick={handleOpen}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="text-center mt-16"
        >
          <p className="text-[#E8DCC4] text-xl mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>
            A letter from your future
          </p>
          <p className="text-[#C4B5A0] opacity-60 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
            Click to open
          </p>
        </motion.div>
      </div>

      {/* Ambient light rays */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-transparent" />
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#D4AF37] to-transparent" />
        <div className="absolute top-0 left-2/3 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>
    </div>
  );
}
