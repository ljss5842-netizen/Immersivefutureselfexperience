import { motion } from 'motion/react';

interface OwlProps {
  isFlying?: boolean;
  isCarryingLetter?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Owl({ isFlying = true, isCarryingLetter = false, className = '', size = 'medium' }: OwlProps) {
  const sizeMap = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      {/* Owl body */}
      <motion.div
        animate={isFlying ? {
          y: [0, -8, 0],
          rotate: [0, -2, 0, 2, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full h-full"
      >
        {/* Wings */}
        <motion.div
          className="absolute top-1/3 left-0 right-0"
          animate={isFlying ? {
            scaleX: [1, 1.3, 1],
          } : {}}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Left wing */}
          <div 
            className="absolute left-1/4 w-8 h-12 bg-gradient-to-br from-[#8B7355] to-[#5C4A3A] rounded-full origin-right"
            style={{ 
              transform: 'rotate(-25deg)',
              clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0 80%)'
            }}
          />
          {/* Right wing */}
          <div 
            className="absolute right-1/4 w-8 h-12 bg-gradient-to-bl from-[#8B7355] to-[#5C4A3A] rounded-full origin-left"
            style={{ 
              transform: 'rotate(25deg)',
              clipPath: 'polygon(0 0%, 100% 20%, 100% 80%, 0 100%)'
            }}
          />
        </motion.div>

        {/* Body */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-[#A0826D] to-[#8B7355] rounded-full">
          {/* Feather texture */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-0.5 bg-[#5C4A3A] rounded-full mb-2"
                style={{ 
                  width: `${80 - i * 10}%`,
                  marginLeft: `${10 + i * 5}%`,
                  marginTop: `${i * 12}%`
                }}
              />
            ))}
          </div>
        </div>

        {/* Head */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-b from-[#B4936A] to-[#A0826D] rounded-full">
          {/* Eyes */}
          <div className="absolute top-3 left-1.5 w-3 h-3 bg-[#FFF8DC] rounded-full">
            <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-[#2C1810] rounded-full">
              <motion.div
                className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </div>
          </div>
          <div className="absolute top-3 right-1.5 w-3 h-3 bg-[#FFF8DC] rounded-full">
            <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-[#2C1810] rounded-full">
              <motion.div
                className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </div>
          </div>

          {/* Beak */}
          <div 
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-transparent border-t-[#D4A574]"
          />

          {/* Ear tufts */}
          <div className="absolute -top-1 left-1 w-2 h-3 bg-[#8B7355] rounded-t-full transform -rotate-12" />
          <div className="absolute -top-1 right-1 w-2 h-3 bg-[#8B7355] rounded-t-full transform rotate-12" />
        </div>

        {/* Letter in talons */}
        {isCarryingLetter && (
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-[#F4E4C1] to-[#E8DCC4] shadow-lg"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
            }}
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
