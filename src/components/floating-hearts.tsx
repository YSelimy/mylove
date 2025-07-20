import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now();
      const newHeart: Heart = {
        id,
        left: Math.random() * 100,
        size: Math.random() * 10 + 15,
        duration: Math.random() * 3 + 3,
      };

      setHearts(prev => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== id));
      }, newHeart.duration * 1000);
    };

    const interval = setInterval(createHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
            }}
            initial={{ y: "100vh", opacity: 0, rotate: 0 }}
            animate={{ y: "-10vh", opacity: 0.7, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: "linear" }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
