import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const TargetCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [targetRect, setTargetRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // Smooth springs for cursor position
  const cursorX = useSpring(-100, { stiffness: 600, damping: 35 });
  const cursorY = useSpring(-100, { stiffness: 600, damping: 35 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is hovering over an element with .cursor-target
      const targetElement = (e.target as HTMLElement).closest('.cursor-target');

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setIsHovered(true);
        setTargetRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width + 16,
          height: rect.height + 16,
        });
        cursorX.set(rect.left + rect.width / 2);
        cursorY.set(rect.top + rect.height / 2);
      } else {
        setIsHovered(false);
        setTargetRect(null);
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Reticle / Dot Cursor */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
        }}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        {/* Central Dot */}
        <motion.div
          animate={{
            scale: isHovered ? 0 : 1,
            backgroundColor: isHovered ? '#ff2c2c' : '#000000',
          }}
          className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm"
        />

        {/* Reticle Ring / Target Lock Rectangle */}
        <motion.div
          animate={{
            width: isHovered && targetRect ? targetRect.width : 28,
            height: isHovered && targetRect ? targetRect.height : 28,
            borderRadius: isHovered ? 8 : 9999,
            borderColor: isHovered ? '#ff2c2c' : 'rgba(0, 0, 0, 0.75)',
            borderWidth: isHovered ? 2 : 1.5,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="absolute border border-black backdrop-invert/10 shadow-lg flex items-center justify-center"
        >
          {/* Corner Lock Markers when Target Locked */}
          {isHovered && (
            <>
              <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#ff2c2c]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#ff2c2c]" />
              <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#ff2c2c]" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#ff2c2c]" />
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};
