import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LetterModal({ isOpen, onClose }: LetterModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-cream p-8 rounded-xl max-w-2xl max-h-screen overflow-y-auto shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, rotateX: -90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="float-right text-gray-500 hover:text-gray-700 text-xl"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="font-playfair text-center mb-6">
              <h3 className="text-3xl text-pink-600 mb-2">💌 Sana Özel Mektubum 💌</h3>
              <p className="text-sm text-gray-500">Kalbimden gelen sözler</p>
            </div>
            <motion.div
              className="text-gray-700 leading-relaxed space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p>Canım sevgilim,</p>
              <p>Bu özel günde sana olan sevgimi kelimelerle anlatmaya çalışıyorum ama hiçbir kelime yeterli gelmiyor. Seninle tanıştığım günden beri hayatım bambaşka bir anlam kazandı.</p>
              <p>Sabah uyandığımda ilk aklıma sen geliyorsun, gece uyumadan önce son düşüncem yine sen oluyorsun. Gözlerindeki parıltı, tebessümündeki sıcaklık, sesindeki melodi... Her şeyin beni büyülüyor.</p>
              <p>Birlikte yaşadığımız her an benim için paha biçilmez. Güldüğün anlar, üzüldüğün zamanlar, şaka yaptığımız dakikalar, sarıldığımız o sıcak anlar... Hepsini kalbimde özenle saklıyorum.</p>
              <p>Doğum günün kutlu olsun my love! Seni sonsuza kadar seveceğim. Sen benim hayatımın anlamı, mutluluğumun kaynağı, geleceğimin en güzel parçasısın.</p>
              <p>Seni çok ama çok seviyorum! 💖</p>
              <p className="text-right font-medium">
                Sonsuz sevgimle,<br />
                Sevgilin 💕
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
