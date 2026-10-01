import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FloatingItem {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  sway: number;
}

export const FloatingHearts: React.FC = () => {
  const items = useMemo(() => {
    const emojis = ['🌸', '💖', '✨', '🍓', '🎀', '💕', '🌷', '🤍'];
    const generated: FloatingItem[] = [];
    for (let i = 0; i < 18; i++) {
      generated.push({
        id: i,
        emoji: emojis[i % emojis.length],
        left: Math.random() * 96 + 2, // 2% to 98%
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 8,
        size: 14 + Math.random() * 14,
        sway: (Math.random() - 0.5) * 60,
      });
    }
    return generated;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            y: '105vh',
            x: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            x: [0, item.sway, -item.sway, 0],
            opacity: [0, 0.75, 0.8, 0],
            rotate: [0, 20, -20, 10],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            filter: 'drop-shadow(0 2px 4px rgba(254, 205, 211, 0.4))',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};
