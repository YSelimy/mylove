import { motion } from "framer-motion";

export default function Timeline() {
  const timelineEvents = [
    {
      title: "İlk Tanışma",
      date: "14 Şubat 2023",
      description: "Kafede çalışırken seni fark ettim. O gülen gözlerin ve zarafetinle büyüledin beni.",
      side: "left"
    },
    {
      title: "İlk Randevu",
      date: "20 Şubat 2023",
      description: "Cesaret edip seni çıkarmaya davet ettim. O \"evet\" cevabın hayatımı değiştirdi.",
      side: "right"
    },
    {
      title: "Sevgili Olduk",
      date: "10 Mart 2023",
      description: "Artık sadece arkadaş değil, birbirimizin sevgilisiydik. Kalbim mutluluktan patlayacaktı.",
      side: "left"
    },
    {
      title: "İlk \"Seni Seviyorum\"",
      date: "25 Mart 2023",
      description: "Gözlerinin içine bakarak ilk kez \"seni seviyorum\" dedim. Sen de aynı cevabı verdin.",
      side: "right"
    },
    {
      title: "Bugün - Doğum Günün",
      date: "Bugün",
      description: "Ve işte bugün, sana olan sevgimi bir kez daha gösterme fırsatı buldum. Mutlu yıllar aşkım!",
      side: "left",
      isSpecial: true
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-5xl text-pink-600 mb-4">Aşk Hikayemiz</h2>
          <p className="text-gray-600 text-lg">Birlikte yazdığımız güzel hikayenin zaman çizelgesi</p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-pink-500"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className="relative flex items-center justify-between"
                initial={{ opacity: 0, x: event.side === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {event.side === "left" ? (
                  <>
                    <div className="w-5/12 text-right pr-8">
                      <motion.div 
                        className={`${event.isSpecial ? 'bg-gradient-to-r from-yellow-400 to-pink-500' : 'bg-gradient-to-r from-pink-400 to-pink-500'} text-white p-6 rounded-xl shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <h3 className="font-playfair text-xl mb-2">{event.title}</h3>
                        <p className="text-pink-100 text-sm mb-3">{event.date}</p>
                        <p className="text-pink-50">{event.description}</p>
                      </motion.div>
                    </div>
                    <div className="w-2/12 flex justify-center">
                      <div className="timeline-item relative">
                        <div className={`w-6 h-6 ${event.isSpecial ? 'bg-yellow-400 animate-pulse' : 'bg-pink-400'} rounded-full border-4 border-white shadow-lg z-10 relative`}>
                          {event.isSpecial && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white text-xs">❤️</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-5/12"></div>
                  </>
                ) : (
                  <>
                    <div className="w-5/12"></div>
                    <div className="w-2/12 flex justify-center">
                      <div className="timeline-item relative">
                        <div className="w-6 h-6 bg-pink-500 rounded-full border-4 border-white shadow-lg z-10 relative"></div>
                      </div>
                    </div>
                    <div className="w-5/12 text-left pl-8">
                      <motion.div 
                        className="bg-gradient-to-r from-pink-500 to-pink-300 text-white p-6 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <h3 className="font-playfair text-xl mb-2">{event.title}</h3>
                        <p className="text-pink-100 text-sm mb-3">{event.date}</p>
                        <p className="text-pink-50">{event.description}</p>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
