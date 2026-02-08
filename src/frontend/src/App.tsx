import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const noButtonTexts = [
    "Are you sure?",
    "Really?",
    "Try again!",
    "No escape!",
    "You can't escape love!"
  ];

  const handleNoClick = () => {
    // Generate random position within viewport bounds
    const maxX = window.innerWidth - 150; // Button width buffer
    const maxY = window.innerHeight - 60; // Button height buffer
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoClickCount((prev) => (prev + 1) % noButtonTexts.length);
  };

  const handleYesClick = () => {
    setShowThankYou(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-400/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
              fontSize: `${20 + Math.random() * 30}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {!showThankYou ? (
          <div className="text-center space-y-8 animate-fade-in">
            {/* Question card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto border-4 border-pink-400">
              <div className="flex justify-center mb-6">
                <Heart className="text-rose-500 w-16 h-16 md:w-20 md:h-20 animate-pulse" fill="currentColor" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-8 font-cursive leading-tight">
                Ashmeen, will you be my Valentine?
              </h1>

              {/* Buttons container */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-[80px]">
                {/* Yes button - always in normal flow */}
                <Button
                  onClick={handleYesClick}
                  size="lg"
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  Yes! 💕
                </Button>

                {/* No button - positioned absolutely after first click */}
                <Button
                  onClick={handleNoClick}
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-pink-50 text-rose-500 border-2 border-rose-400 font-bold text-xl px-12 py-6 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                  style={
                    noClickCount > 0
                      ? {
                          position: 'fixed',
                          left: `${noButtonPosition.x}px`,
                          top: `${noButtonPosition.y}px`,
                          zIndex: 50,
                        }
                      : {}
                  }
                >
                  {noClickCount > 0 ? noButtonTexts[noClickCount - 1] : 'No'}
                </Button>
              </div>
            </div>

            {/* Playful hint text */}
            {noClickCount > 2 && (
              <p className="text-rose-700 font-semibold text-lg animate-bounce">
                The "Yes" button is looking pretty good, isn't it? 😊
              </p>
            )}
          </div>
        ) : (
          <div className="text-center animate-scale-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto border-4 border-rose-400">
              {/* Romantic kissing couple image */}
              <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/assets/generated/kissing-couple-silhouette.dim_800x600.jpg" 
                  alt="Romantic silhouette of a kissing couple"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Romantic message with heart shimmer effect */}
              <div className="space-y-4 animate-fade-in-delayed">
                <p className="text-2xl md:text-3xl text-rose-600 font-semibold leading-relaxed animate-heart-shimmer">
                  You've made me the happiest! 💖
                </p>
                <p className="text-xl md:text-2xl text-rose-500 font-medium leading-relaxed animate-heart-shimmer" style={{ animationDelay: '0.3s' }}>
                  This Valentine's Day is going to be magical with you by my side...
                </p>
                <p className="text-xl md:text-2xl text-rose-500 font-medium leading-relaxed animate-heart-shimmer" style={{ animationDelay: '0.6s' }}>
                  Can't wait to celebrate with you, Meri Ash.
                </p>
              </div>

              {/* Decorative hearts */}
              <div className="mt-8 flex justify-center gap-3 flex-wrap">
                {[...Array(8)].map((_, i) => (
                  <Heart
                    key={i}
                    className="text-rose-400 w-6 h-6 md:w-8 md:h-8 animate-bounce"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-rose-700/80 text-sm z-20">
        <p className="flex items-center justify-center gap-1">
          © 2025. Built with <Heart className="w-4 h-4 inline text-rose-500" fill="currentColor" /> using{' '}
          <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-rose-900">
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
