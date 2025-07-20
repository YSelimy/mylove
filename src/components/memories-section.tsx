import { motion } from "framer-motion";
import { Heart, Star, BookmarkX, Home, Gift, Plane } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Memory } from "@shared/schema";

export default function MemoriesSection() {
  const { data: memories = [], isLoading } = useQuery<Memory[]>({
    queryKey: ['/api/memories', 1], // Using userId 1 from our sample data
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const iconMap = [Heart, Star, BookmarkX, Home, Gift, Plane];
  const gradientMap = [
    "from-pink-400 to-pink-500",
    "from-pink-500 to-pink-300", 
    "from-pink-300 to-purple-400",
    "from-purple-400 to-pink-400",
    "from-pink-500 to-pink-300",
    "from-pink-400 to-purple-400"
  ];

  if (isLoading) {
    return (
      <section id="memories" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl text-pink-600 mb-4">Özel Anılarımız</h2>
            <p className="text-gray-600 text-lg">Yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="memories" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-5xl text-pink-600 mb-4">Özel Anılarımız</h2>
          <p className="text-gray-600 text-lg">Birlikte yaşadığımız unutulmaz anlar</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory, index) => {
            const Icon = memory.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${memory.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair text-xl text-pink-600 mb-2">{memory.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{memory.date}</p>
                </div>
                <p className="text-gray-700 text-center leading-relaxed">
                  {memory.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
