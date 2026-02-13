import React from 'react';
import { LoveNote } from '../types';

interface CardProps {
  note: LoveNote;
  isOpen: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ note, isOpen, onClick }) => {
  return (
    <div 
      className="w-full h-full cursor-pointer perspective-1000 group"
      onClick={onClick}
    >
      <div 
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
          isOpen ? 'rotate-y-180' : 'hover:scale-105'
        }`}
      >
        {/* Front - Big Red Heart */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center drop-shadow-2xl">
           <svg viewBox="0 0 32 32" className="w-full h-full text-rose-500 fill-current overflow-visible">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#be123c" floodOpacity="0.3"/>
                </filter>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
              <path 
                d="M16 28 C16 28 3 20.5 3 11 C3 7 6 4 10 4 C13 4 15 6 16 8 C17 6 19 4 22 4 C26 4 29 7 29 11 C29 20.5 16 28 16 28 Z" 
                fill="url(#heartGradient)"
                stroke="#fff1f2"
                strokeWidth="0.5"
                filter="url(#shadow)"
              />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none pb-4">
             <span className="text-6xl mb-2 drop-shadow-md filter">{note.emoji}</span>
             <span className="font-serif italic text-lg opacity-90">Для тебя...</span>
           </div>
        </div>

        {/* Back - The Message */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center drop-shadow-2xl">
           <svg viewBox="0 0 32 32" className="w-full h-full text-white fill-current overflow-visible">
              <path 
                d="M16 28 C16 28 3 20.5 3 11 C3 7 6 4 10 4 C13 4 15 6 16 8 C17 6 19 4 22 4 C26 4 29 7 29 11 C29 20.5 16 28 16 28 Z" 
                fill="#fff"
                stroke="#fecdd3"
                strokeWidth="1"
              />
           </svg>
           {/* Content Container positioned inside the heart shape */}
           <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pb-12">
             <h3 className="text-rose-600 font-serif font-bold text-lg mb-2 leading-tight">
               {note.title}
             </h3>
             <div className="w-12 h-0.5 bg-rose-200 mb-3 rounded-full"></div>
             <p className="text-rose-800 font-medium text-sm sm:text-base leading-relaxed overflow-y-auto max-h-[120px] no-scrollbar w-[80%]">
               {note.content}
             </p>
             <div className="absolute bottom-16 text-rose-300 text-xs">♥</div>
           </div>
        </div>
      </div>
    </div>
  );
};
