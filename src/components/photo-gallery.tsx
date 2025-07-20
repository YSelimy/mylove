import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";

interface Photo {
  src: string;
  title: string;
  date: string;
}

interface PhotoGalleryProps {
  onImageClick: (image: {src: string, caption: string}) => void;
}

export default function PhotoGallery({ onImageClick }: PhotoGalleryProps) {
  const photos: Photo[] = [
    {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "İlk Randevumuz",
      date: "14 Şubat 2023"
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Deniz Tatilimiz",
      date: "15 Temmuz 2023"
    },
    {
      src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Piknik Günümüz",
      date: "5 Mayıs 2023"
    },
    {
      src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Romantik Akşam Yemeği",
      date: "8 Ağustos 2023"
    },
    {
      src: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Kış Yürüyüşü",
      date: "10 Aralık 2023"
    },
    {
      src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Kahve Molası",
      date: "20 Mart 2023"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-5xl text-pink-600 mb-4">Fotoğraf Galerimiz</h2>
          <p className="text-gray-600 text-lg">Birlikte yaşadığımız güzel anların fotoğrafları</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onClick={() => onImageClick({ src: photo.src, caption: photo.title })}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img 
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{photo.title}</p>
                    <p className="text-sm opacity-80">{photo.date}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center mx-auto">
            <Plus className="w-5 h-5 mr-2" />
            Daha Fazla Fotoğraf
          </button>
        </motion.div>
      </div>
    </section>
  );
}
