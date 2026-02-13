import React, { useEffect, useState } from 'react';
import { USER_PHOTOS } from '../constants';

type ItemType = 'rose' | 'heart' | 'photo';

interface FloatingItem {
  id: number;
  type: ItemType;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
  content?: string; // For photos (url) or emoji
  rotationDir: number; // -1 or 1 for rotation direction
}

export const FloatingHearts: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const newItems: FloatingItem[] = [];
    const count = 35; 

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let type: ItemType;
      let content = '';
      let size = 20;

      // Distribution: 40% Photos, 20% Roses, 40% Hearts
      if (rand < 0.4 && USER_PHOTOS.length > 0) {
        type = 'photo';
        content = USER_PHOTOS[Math.floor(Math.random() * USER_PHOTOS.length)];
        size = 80 + Math.random() * 60; // 80px to 140px
      } else if (rand < 0.6) {
        type = 'rose';
        content = '🌹';
        size = 25 + Math.random() * 20;
      } else {
        type = 'heart';
        const hearts = ['❤️', '💖', '💕', '💗', '💘', '💝'];
        content = hearts[Math.floor(Math.random() * hearts.length)];
        size = 20 + Math.random() * 15;
      }

      newItems.push({
        id: i,
        type,
        content,
        left: Math.random() * 95, // 0% to 95% width
        animationDuration: 10 + Math.random() * 20, // 10-30s fall
        delay: Math.random() * 20, 
        size,
        rotationDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
    setItems(newItems);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {items.map((item) => {
        const style: React.CSSProperties = {
          left: `${item.left}%`,
          top: '-20%', // Start well above screen
          width: `${item.size}px`,
          height: `${item.size}px`,
          position: 'absolute',
          animation: `fall ${item.animationDuration}s linear infinite`,
          animationDelay: `-${item.delay}s`,
          // Removed opacity: 0 here to ensure visibility if animation fails to start immediately, 
          // though keyframes control it.
        };

        if (item.type === 'photo') {
           return (
             <div key={item.id} style={style} className="drop-shadow-lg will-change-transform">
                <svg viewBox="0 0 32 32" className="w-full h-full overflow-visible">
                  <defs>
                    <clipPath id={`heart-clip-${item.id}`}>
                      <path d="M16 28 C16 28 3 20.5 3 11 C3 7 6 4 10 4 C13 4 15 6 16 8 C17 6 19 4 22 4 C26 4 29 7 29 11 C29 20.5 16 28 16 28 Z" />
                    </clipPath>
                  </defs>
                  
                  {/* Background for heart if image loads slow */}
                  <path d="M16 28 C16 28 3 20.5 3 11 C3 7 6 4 10 4 C13 4 15 6 16 8 C17 6 19 4 22 4 C26 4 29 7 29 11 C29 20.5 16 28 16 28 Z" 
                        fill="#ffe4e6" />

                  <image 
                    href={item.content} 
                    x="0" 
                    y="0" 
                    width="32" 
                    height="32" 
                    preserveAspectRatio="xMidYMid slice" 
                    clipPath={`url(#heart-clip-${item.id})`}
                  />
                  
                  <path 
                    d="M16 28 C16 28 3 20.5 3 11 C3 7 6 4 10 4 C13 4 15 6 16 8 C17 6 19 4 22 4 C26 4 29 7 29 11 C29 20.5 16 28 16 28 Z" 
                    fill="none" 
                    stroke="#fff1f2" 
                    strokeWidth="1.5" 
                    opacity="0.8"
                  />
                </svg>
             </div>
           );
        }

        return (
          <div
            key={item.id}
            style={{
               ...style,
               fontSize: `${item.size}px`,
               lineHeight: 1,
            }}
            className="flex items-center justify-center opacity-70"
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
