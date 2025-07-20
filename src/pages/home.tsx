import { useState } from "react";
import Navigation from "@/components/navigation";
import FloatingHearts from "@/components/floating-hearts";
import PhotoGallery from "@/components/photo-gallery";
import MemoriesSection from "@/components/memories-section";
import Timeline from "@/components/timeline";
import InteractiveCake from "@/components/interactive-cake";
import SurpriseSection from "@/components/surprise-section";
import LightboxModal from "@/components/modals/lightbox-modal";
import LetterModal from "@/components/modals/letter-modal";
import GiftModal from "@/components/modals/gift-modal";
import QuizModal from "@/components/modals/quiz-modal";
import { Heart, Music, Images, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";

export default function Home() {
  const [lightboxImage, setLightboxImage] = useState<{src: string, caption: string} | null>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const { offset } = useParallax();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const playMusic = () => {
    // In a real implementation, this would play music
    alert('🎵 Müzik çalınıyor! (Gerçek implementasyonda bir müzik dosyası çalınır)');
  };

  const showAllPhotos = () => {
    // In a real implementation, this would expand the gallery
    alert('📸 Tüm fotoğraflar gösteriliyor! (Gerçek implementasyonda galeri genişletilir)');
  };

  const downloadMemories = () => {
    // In a real implementation, this would download a file
    alert('💾 Anılar indiriliyor! (Gerçek implementasyonda bir dosya indirilir)');
  };

  return (
    <div className="min-h-screen">
      <FloatingHearts />
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="text-center z-10 px-6">
          <motion.div 
            style={{ y: offset * 0.5 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-playfair text-6xl md:text-8xl text-pink-600 mb-6">
              💖 Doğum Günün Kutlu Olsun! 💖
            </h1>
            <h2 className="font-playfair text-3xl md:text-4xl text-pink-500 mb-8">
              Canım Sevgilim
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Bugün senin özel günün ve sana olan sevgimi göstermek için bu sayfayı hazırladım. 
              Her bir detay, sana duyduğum sevgiyle dolu. Doğum günün kutlu olsun aşkım! 🎂✨
            </p>
            <motion.button 
              onClick={() => scrollToSection('gallery')}
              className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5 mr-2 inline" />
              Sürprizi Keşfet
            </motion.button>
          </motion.div>
        </div>
        
        {/* Romantic background elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-1/4 left-10 text-6xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌸
          </motion.div>
          <motion.div 
            className="absolute top-1/3 right-20 text-5xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💕
          </motion.div>
          <motion.div 
            className="absolute bottom-1/4 left-1/4 text-4xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🦋
          </motion.div>
          <motion.div 
            className="absolute bottom-1/3 right-1/4 text-5xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </div>
      </section>

      <PhotoGallery onImageClick={setLightboxImage} />
      <MemoriesSection />
      <Timeline />
      <InteractiveCake />
      <SurpriseSection 
        onLetterClick={() => setIsLetterOpen(true)}
        onGiftClick={() => setIsGiftOpen(true)}
        onQuizClick={() => setIsQuizOpen(true)}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mb-4"
            >
              <Heart className="w-8 h-8 mx-auto" />
            </motion.div>
            <p className="text-lg">Sana olan sevgimle hazırlandı</p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <button 
              onClick={playMusic}
              className="hover:text-pink-200 transition-colors duration-300 flex items-center"
            >
              <Music className="w-5 h-5 mr-2" />
              Müzik Çal
            </button>
            <button 
              onClick={showAllPhotos}
              className="hover:text-pink-200 transition-colors duration-300 flex items-center"
            >
              <Images className="w-5 h-5 mr-2" />
              Tüm Fotoğraflar
            </button>
            <button 
              onClick={downloadMemories}
              className="hover:text-pink-200 transition-colors duration-300 flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Anıları İndir
            </button>
          </div>
          <p className="text-pink-200 text-sm">© 2024 - Sadece sen için hazırlandı 💖</p>
        </div>
      </footer>

      {/* Modals */}
      <LightboxModal 
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
      <LetterModal 
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />
      <GiftModal 
        isOpen={isGiftOpen}
        onClose={() => setIsGiftOpen(false)}
      />
      <QuizModal 
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}
