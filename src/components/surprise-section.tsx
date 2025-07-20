import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Gift, Brain } from "lucide-react";

interface SurpriseSectionProps {
  onLetterClick: () => void;
  onGiftClick: () => void;
  onQuizClick: () => void;
}

export default function SurpriseSection({ onLetterClick, onGiftClick, onQuizClick }: SurpriseSectionProps) {
  const [poppedBalloons, setPoppedBalloons] = useState<Set<number>>(new Set());

  const balloons = [
    { color: 'bg-pink-400', message: 'Sağlıklı ve mutlu bir yaşam dilerim! 💪' },
    { color: 'bg-pink-500', message: 'Tüm hayallerin gerçek olsun! ✨' },
    { color: 'bg-purple-400', message: 'Birlikte nice güzel yıllar geçirelim! 💕' },
    { color: 'bg-yellow-400', message: 'Gülümsemen hiç eksilmesin! 😊' },
    { color: 'bg-purple-500', message: 'Seni çok seviyorum! 💖' }
  ];

  const popBalloon = (index: number, message: string) => {
    if (poppedBalloons.has(index)) return;
    
    setPoppedBalloons(prev => new Set(prev).add(index));
    
    // Show message (in a real app, this would be a toast or modal)
    setTimeout(() => {
      alert(message);
    }, 300);
  };

  return (
    <section id="surprise" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-5xl text-pink-600 mb-4">🎁 Sürprizin 🎁</h2>
          <p className="text-gray-600 text-lg">Sana özel hazırladığım sürprizler</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Love Letter */}
          <motion.div 
            className="love-letter"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="letter-front bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={onLetterClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <Mail className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
                <h3 className="font-playfair text-xl text-pink-600 mb-2">Aşk Mektubum</h3>
                <p className="text-gray-600">Sana yazdığım özel mektup</p>
                <div className="mt-4">
                  <span className="text-sm text-pink-500">📜 Açmak için tıkla</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Virtual Gift Box */}
          <motion.div 
            className="gift-box"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={onGiftClick}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <Gift className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
                <h3 className="font-playfair text-xl text-pink-600 mb-2">Sanal Hediye Kutusu</h3>
                <p className="text-gray-600">İçinde sürpriz var!</p>
                <div className="mt-4">
                  <span className="text-sm text-pink-500">🎁 Açmak için tıkla</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Memory Quiz */}
          <motion.div 
            className="quiz-box"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={onQuizClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <Brain className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
                <h3 className="font-playfair text-xl text-pink-600 mb-2">Anılar Testi</h3>
                <p className="text-gray-600">Ne kadar iyi hatırlıyorsun?</p>
                <div className="mt-4">
                  <span className="text-sm text-purple-500">🧠 Başlamak için tıkla</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Wish Balloons */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="font-playfair text-3xl text-pink-600 mb-8">Dilek Balonları</h3>
          <p className="text-gray-600 mb-6">Her balona tıklayarak dilek tut!</p>
          <div className="flex flex-wrap justify-center gap-6">
            {balloons.map((balloon, index) => (
              <motion.div
                key={index}
                className="balloon cursor-pointer"
                onClick={() => popBalloon(index, balloon.message)}
                whileHover={{ scale: 1.1, y: -10 }}
                whileTap={{ scale: 0.9 }}
                animate={poppedBalloons.has(index) ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-16 h-20 ${balloon.color} rounded-full relative shadow-lg`}>
                  <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gray-400 transform -translate-x-1/2"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-lg">🎈</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Final Message */}
        <motion.div 
          className="text-center bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="font-playfair text-3xl text-pink-600 mb-4">💖 Sevgili Canım 💖</h3>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Bu özel günde sana olan sevgimi göstermek istedim. Sen benim hayatımın en güzel hediyesisin. 
            Seninle geçirdiğim her an, her gün daha da özel hale geliyor. 
            Doğum günün kutlu olsun my love! Seni sonsuza kadar seveceğim. 
            Bu site sadece küçük bir jestmiş, asıl hediyem sana olan sonsuz sevgim. 💕✨
          </p>
          <div className="mt-6">
            <p className="font-playfair text-xl text-pink-600">Seni Seven,</p>
            <p className="font-playfair text-2xl text-pink-500 mt-2">Sevgilin 💕</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
