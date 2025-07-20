import { useState, useEffect } from "react";
import { Heart, Camera, Star, Clock, Cake, Gift } from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Ana Sayfa', icon: Heart },
    { id: 'gallery', label: 'Fotoğraflar', icon: Camera },
    { id: 'memories', label: 'Anılarımız', icon: Star },
    { id: 'timeline', label: 'Hikayemiz', icon: Clock },
    { id: 'cake', label: 'Pasta', icon: Cake },
    { id: 'surprise', label: 'Sürpriz', icon: Gift },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-center items-center">
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-pink-600 hover:text-pink-500 transition-colors duration-300 font-medium flex items-center"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
