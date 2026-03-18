import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Particles } from './Particles';
import { Owl } from './Owl';
import { BookOpen } from 'lucide-react';

export function EntryScene() {
  const navigate = useNavigate();

  return (
    <div className="relative size-full bg-[#0B0B0F] overflow-hidden flex items-center justify-center">
      <Particles />
      
      {/* Background owl flying across */}
      <motion.div
        initial={{ x: '-10%', y: '70%', opacity: 0 }}
        animate={{ 
          x: '110%', 
          y: '10%', 
          opacity: [0, 0.6, 0.6, 0]
        }}
        transition={{ 
          duration: 12,
          times: [0, 0.1, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeInOut"
        }}
        className="absolute left-0 top-0 pointer-events-none"
      >
        <Owl size="medium" />
      </motion.div>
      
      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mb-12"
        >
          <BookOpen className="w-16 h-16 mx-auto mb-8 text-[#D4AF37] opacity-70" />
          <h1 className="text-5xl md:text-7xl mb-6 text-[#E8DCC4]" style={{ fontFamily: "'EB Garamond', serif", fontWeight: 500 }}>
            From Future Me
          </h1>
          <p className="text-xl md:text-2xl text-[#C4B5A0] opacity-80" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
            A letter awaits you... ten years from now
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          onClick={() => navigate('/write')}
          className="group relative px-12 py-4 text-lg overflow-hidden"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
          <div className="absolute inset-0 border border-[#D4AF37] opacity-40" />
          
          <span className="relative text-[#E8DCC4] text-xl tracking-wide">
            Write to your future self
          </span>

          <motion.div
            className="absolute inset-0 border border-[#D4AF37]"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 1.05, opacity: 0.6 }}
            transition={{ duration: 0.7 }}
          />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 2 }}
          className="mt-16"
        >
          <button
            onClick={() => navigate('/archive')}
            className="text-[#C4B5A0] opacity-60 hover:opacity-90 transition-opacity duration-500 text-sm tracking-wider"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            View past letters →
          </button>
        </motion.div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-[#0B0B0F]" style={{ background: 'radial-gradient(circle, transparent 0%, rgba(11, 11, 15, 0.4) 70%, rgba(11, 11, 15, 0.8) 100%)' }} />
    </div>
  );
}