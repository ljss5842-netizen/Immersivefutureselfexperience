import { motion } from 'motion/react';

interface EnvelopeAnimationProps {
  isOpen: boolean;
  onClick?: () => void;
  isClosing?: boolean;
}

export function EnvelopeAnimation({ isOpen, onClick, isClosing = false }: EnvelopeAnimationProps) {
  return (
    <button
      onClick={onClick}
      disabled={isOpen}
      className="relative group cursor-pointer disabled:cursor-default"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="relative w-80 h-52" style={{ transformStyle: 'preserve-3d' }}>
        {/* Envelope back (bottom part) */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#E8DCC4] to-[#D4C4A8] shadow-2xl"
          style={{
            clipPath: 'polygon(0 35%, 100% 35%, 100% 100%, 0 100%)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulance baseFrequency="0.9" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4" /%3E%3C/svg%3E")',
          }} />
        </div>

        {/* Envelope flap (opens upward) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-44 origin-bottom"
          animate={isOpen ? {
            rotateX: isClosing ? 0 : -180,
            z: isClosing ? 0 : 20,
          } : isClosing ? {
            rotateX: [0, -90, 0],
          } : {
            rotateX: 0,
          }}
          transition={isClosing ? {
            duration: 1.5,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          } : {
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{ 
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front of flap (visible when closed) */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F4E4C1] to-[#E8DCC4] shadow-xl"
            style={{
              clipPath: 'polygon(0 35%, 50% 0, 100% 35%, 100% 100%, 0 100%)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Paper texture */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulance baseFrequency="0.9" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4" /%3E%3C/svg%3E")',
            }} />

            {/* Edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
          </div>

          {/* Back of flap (visible when open) */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#D4C4A8] to-[#C4B49A]"
            style={{
              clipPath: 'polygon(0 35%, 50% 0, 100% 35%, 100% 100%, 0 100%)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Inner paper texture */}
            <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulance baseFrequency="0.9" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4" /%3E%3C/svg%3E")',
            }} />
          </div>
        </motion.div>

        {/* Wax seal */}
        <motion.div
          className="absolute top-28 left-1/2 -translate-x-1/2 z-20"
          animate={isOpen ? {
            scale: 0,
            opacity: 0,
            rotateZ: 180
          } : isClosing ? {
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
            rotateZ: [180, -10, 0]
          } : {
            scale: 1,
            opacity: 1
          }}
          transition={isClosing ? {
            duration: 1,
            delay: 0.8,
            ease: "easeOut"
          } : {
            duration: 0.6,
            delay: 0.3
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B0000] to-[#DC143C] shadow-xl relative">
            <div className="absolute inset-2 rounded-full border-2 border-[#FFD700] opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center text-[#FFD700] text-xs font-serif">
              FM
            </div>
            {/* Wax drips */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-gradient-to-b from-[#8B0000] to-transparent rounded-full opacity-60" />
          </div>
        </motion.div>

        {/* Letter inside (visible when open) */}
        <motion.div
          className="absolute top-36 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-[#FFFEF7] to-[#F4E4C1] shadow-lg"
          initial={{ y: 0, opacity: 1 }}
          animate={isOpen ? {
            y: -30,
            opacity: 1,
          } : {
            y: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            delay: isOpen ? 0.6 : 0,
            ease: "easeOut"
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="p-4 text-[#2C2416] text-xs leading-relaxed opacity-40" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <div className="h-1 bg-[#8B7355] opacity-20 mb-2 w-3/4" />
            <div className="h-1 bg-[#8B7355] opacity-20 mb-2 w-full" />
            <div className="h-1 bg-[#8B7355] opacity-20 mb-2 w-5/6" />
            <div className="h-1 bg-[#8B7355] opacity-20 mb-2 w-full" />
          </div>
        </motion.div>

        {/* Shimmer effect on hover */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        )}

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{ 
            opacity: isOpen ? 0 : [0.2, 0.4, 0.2],
            scale: isOpen ? 0.8 : [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full blur-2xl bg-[#D4AF37]" />
        </motion.div>
      </div>
    </button>
  );
}
