import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { Card } from './components/Card';
import { INITIAL_NOTES } from './constants';

// Add Telegram Type Definition to avoid TS errors
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        close: () => void;
      };
    };
  }
}

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Initialize Telegram Web App
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // Let Telegram know the app is ready
      tg.expand(); // Expand to full height
      
      // Set header color to match our background for seamless look
      try {
        tg.setHeaderColor('#fff1f2'); // Matches bg-rose-50
        tg.setBackgroundColor('#fff1f2');
      } catch (e) {
        console.log('Older TG version');
      }
    }
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentNoteIndex((prev) => (prev + 1) % INITIAL_NOTES.length);
    }, 300); // Wait for flip back
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentNoteIndex(0);
    }, 300);
  };

  const currentNote = INITIAL_NOTES[currentNoteIndex];
  const isLast = currentNoteIndex === INITIAL_NOTES.length - 1;

  const renderLanding = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 z-10 relative animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-rose-400 blur-2xl opacity-30 rounded-full animate-pulse-slow"></div>
        <Heart className="w-24 h-24 text-rose-600 fill-rose-500 animate-beat drop-shadow-xl relative z-10" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-rose-900 mb-6 leading-tight drop-shadow-sm">
        Самой очаровательной<br/>валентинке
      </h1>
      
      <p className="text-rose-800 text-lg mb-12 max-w-xs mx-auto leading-relaxed font-medium opacity-90">
        Я сделал это маленькое приложение, чтобы напомнить тебе, как много ты для меня значишь.
      </p>
      
      <button 
        onClick={() => setStarted(true)}
        className="group relative bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
      >
        <span className="tracking-wide">Открыть</span>
        <Heart size={20} className="fill-white group-hover:animate-ping" />
      </button>
    </div>
  );

  const renderCardView = () => (
    <div className="flex flex-col items-center justify-center h-full w-full px-4 z-10 relative">
      <div className="w-full max-w-sm aspect-square relative mb-8">
         <Card 
           note={currentNote} 
           isOpen={isFlipped} 
           onClick={() => setIsFlipped(!isFlipped)} 
         />
      </div>

      <div className={`transition-opacity duration-500 flex flex-col items-center gap-4 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {isLast ? (
          <button 
            onClick={handleRestart}
            className="flex items-center gap-2 text-rose-700 bg-white/80 backdrop-blur px-6 py-3 rounded-full font-bold shadow-md hover:bg-white transition-all"
          >
            <RotateCcw size={18} /> Начать сначала
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 text-white bg-rose-500 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all hover:scale-105 active:scale-95"
          >
            Далее <ArrowRight size={20} />
          </button>
        )}
        <p className="text-rose-900/60 text-sm font-medium mt-2">
          {currentNoteIndex + 1} из {INITIAL_NOTES.length}
        </p>
      </div>
      
      {!isFlipped && (
        <p className="absolute bottom-12 text-rose-800/60 animate-bounce text-sm font-medium">
          Нажми на сердечко
        </p>
      )}
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-rose-200 overflow-hidden font-sans selection:bg-rose-200">
      <FloatingHearts />
      <style>{`
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-beat {
          animation: beat 2s ease-in-out infinite;
        }
      `}</style>
      
      <main className="absolute inset-0 w-full h-full flex flex-col">
        {!started ? renderLanding() : renderCardView()}
      </main>
    </div>
  );
};

export default App;