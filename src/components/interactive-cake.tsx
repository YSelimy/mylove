import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Mic, Flame } from "lucide-react";
import { useMicrophone } from "@/hooks/use-microphone";

export default function InteractiveCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showWishMessage, setShowWishMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const { isListening, startListening, stopListening } = useMicrophone({
    onBlowDetected: () => {
      if (candlesLit) {
        blowOutCandles();
      }
    }
  });

  const blowOutCandles = () => {
    if (!candlesLit) return;
    
    setCandlesLit(false);
    
    setTimeout(() => {
      setShowConfetti(true);
      setShowWishMessage(true);
    }, 1000);
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setShowWishMessage(false);
    setShowConfetti(false);
  };

  const startMicrophoneDetection = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    color: ['#FFD700', '#FF69B4', '#FF1493', '#9370DB', '#00CED1'][Math.floor(Math.random() * 5)]
  }));

  return (
    <section id="cake" className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-5xl text-pink-600 mb-4">🎂 Doğum Günü Pastan 🎂</h2>
          <p className="text-gray-600 text-lg mb-8">Mumları üfleyip dileğini tut! Mikrofona üfle ya da butona tıkla</p>
        </motion.div>
        
        <motion.div 
          className="max-w-md mx-auto mb-8 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Modern Beautiful Cake Design */}
          <div className="relative">
            {/* Cake Stand/Plate */}
            <div className="w-80 h-6 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-xl mx-auto mb-2 border-4 border-yellow-400"></div>
            
            {/* Bottom Layer - Chocolate */}
            <motion.div 
              className="relative mx-auto w-72 h-20 mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600 rounded-lg shadow-2xl"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg"></div>
              
              {/* Chocolate decorations */}
              <div className="absolute top-2 left-4 text-xl">🍫</div>
              <div className="absolute top-2 right-4 text-xl">🍫</div>
              <div className="absolute bottom-2 left-8 text-lg">🥜</div>
              <div className="absolute bottom-2 right-8 text-lg">🥜</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-white font-bold">Çikolata</div>
            </motion.div>
            
            {/* Middle Layer - Strawberry */}
            <motion.div 
              className="relative mx-auto w-60 h-18 mb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 rounded-lg shadow-xl"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-pink-300 to-pink-400 rounded-lg"></div>
              
              {/* Strawberry decorations */}
              <div className="absolute top-1 left-3 text-lg">🍓</div>
              <div className="absolute top-1 right-3 text-lg">🍓</div>
              <div className="absolute bottom-1 left-6 text-sm">🍓</div>
              <div className="absolute bottom-1 right-6 text-sm">🍓</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white font-bold">Çilek</div>
            </motion.div>
            
            {/* Top Layer - Vanilla */}
            <motion.div 
              className="relative mx-auto w-48 h-16"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded-lg shadow-lg"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-white to-yellow-50 rounded-lg"></div>
              
              {/* Beautiful writing */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-playfair text-pink-600 font-bold text-lg block">Doğum Günün</span>
                  <span className="font-playfair text-pink-500 font-bold text-sm block">Kutlu Olsun</span>
                  <span className="text-pink-400 text-lg">💕</span>
                </div>
              </div>
              
              {/* Vanilla decorations */}
              <div className="absolute top-1 left-2 text-sm">🌟</div>
              <div className="absolute top-1 right-2 text-sm">🌟</div>
              <div className="absolute bottom-1 left-3 text-xs">✨</div>
              <div className="absolute bottom-1 right-3 text-xs">✨</div>
            </motion.div>
            
            {/* Beautiful Candles on Top */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="candle relative">
                  {/* Candle body */}
                  <div className={`w-2 h-6 rounded-sm shadow-md ${
                    ['bg-gradient-to-b from-pink-300 to-pink-500',
                     'bg-gradient-to-b from-blue-300 to-blue-500',
                     'bg-gradient-to-b from-yellow-300 to-yellow-500',
                     'bg-gradient-to-b from-purple-300 to-purple-500',
                     'bg-gradient-to-b from-green-300 to-green-500'][i]
                  }`}></div>
                  
                  <AnimatePresence>
                    {candlesLit && (
                      <motion.div
                        className="candle-flame w-2 h-3 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2 shadow-lg"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [-1, 1, -1]
                        }}
                        transition={{ 
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            {/* Beautiful sparkles around the new cake */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                className="absolute -top-4 left-4 text-yellow-300 text-2xl"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <motion.div 
                className="absolute -top-2 right-6 text-pink-300 text-xl"
                animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌟
              </motion.div>
              <motion.div 
                className="absolute top-8 left-0 text-purple-300 text-lg"
                animate={{ x: [0, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                💫
              </motion.div>
              <motion.div 
                className="absolute top-12 right-2 text-yellow-400 text-xl"
                animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ⭐
              </motion.div>
              <motion.div 
                className="absolute bottom-8 left-6 text-pink-400 text-lg"
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <motion.div 
                className="absolute bottom-4 right-4 text-purple-400 text-xl"
                animate={{ scale: [1, 1.4, 1], rotate: [0, -360, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                💖
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Blow controls */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <motion.button 
            onClick={blowOutCandles}
            className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!candlesLit}
          >
            <Wind className="w-5 h-5 mr-2" />
            Mumları Üfle
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <motion.button 
              onClick={startMicrophoneDetection}
              className={`${isListening ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'} text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic className="w-5 h-5 mr-2" />
              {isListening ? 'Dinlemeyi Durdur' : 'Mikrofon Kullan'}
            </motion.button>
            {isListening && (
              <div className="text-sm text-gray-600">Mikrofon aktif - üfle!</div>
            )}
          </div>
          
          {!candlesLit && (
            <motion.button 
              onClick={relightCandles}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Flame className="w-5 h-5 mr-2" />
              Mumları Tekrar Yak
            </motion.button>
          )}
        </div>
        
        <AnimatePresence>
          {showWishMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center"
            >
              <h3 className="font-playfair text-3xl text-pink-600 mb-4">🎉 Dileğin Tutulsun! 🎉</h3>
              <p className="text-gray-700 text-lg">
                Doğum günün kutlu olsun canım! Tüm dileklerin gerçek olsun! 💖
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="confetti">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                className="confetti-piece"
                style={{
                  left: `${piece.left}%`,
                  backgroundColor: piece.color,
                }}
                initial={{ y: -100, opacity: 1, rotate: 0 }}
                animate={{ y: window.innerHeight + 100, opacity: 0, rotate: 720 }}
                transition={{ 
                  duration: 3,
                  delay: piece.delay,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
