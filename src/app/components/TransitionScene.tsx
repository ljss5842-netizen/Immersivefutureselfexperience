import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { Particles } from './Particles';
import { Owl } from './Owl';

export function TransitionScene() {
  const navigate = useNavigate();
  const location = useLocation();
  const letterId = location.state?.letterId;

  useEffect(() => {
    // Auto-advance after animation
    const timer = setTimeout(() => {
      navigate('/arrival', { state: { letterId } });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, letterId]);

  return (
    <div className="relative size-full bg-[#0B0B0F] overflow-hidden flex items-center justify-center">
      <Particles />

      {/* Owl flying with letter */}
      <motion.div
        initial={{ x: '-10%', y: '60%', opacity: 0 }}
        animate={{ 
          x: '110%', 
          y: '-60%', 
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{ 
          duration: 4,
          times: [0, 0.1, 0.5, 0.8, 1],
          ease: "easeInOut"
        }}
        className="absolute left-0 top-0"
      >
        <Owl isCarryingLetter size="large" />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ 
          duration: 4,
          times: [0, 0.2, 0.8, 1]
        }}
        className="absolute bottom-32 left-0 right-0 text-center"
      >
        <p className="text-[#C4B5A0] text-xl md:text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
          Traveling through time...
        </p>
        <p className="text-[#8B7355] text-sm mt-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Ten years forward
        </p>
      </motion.div>

      {/* Fog effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}