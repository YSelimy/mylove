import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftModal({ isOpen, onClose }: GiftModalProps) {
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
            className="bg-white p-8 rounded-xl max-w-md shadow-2xl text-center"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            transition={{ duration: 0.5, type: "spring" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="float-right text-gray-500 hover:text-gray-700 text-xl"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Gift className="w-16 h-16 text-pink-500 mb-4 mx-auto" />
              <h3 className="font-playfair text-2xl text-pink-600 mb-2">🎁 Sürpriz Hediyem 🎁</h3>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-700">Bu sayfanın kendisi benim sana hediyem! 💝</p>
              <p className="text-gray-700">Ama asıl hediyem... Sana olan sonsuz sevgim! 💖</p>
              <p className="text-gray-700">Ve tabii ki gerçek hediyeni de hazırladım! 🎊</p>
              <motion.div
                className="mt-6 p-4 bg-pink-50 rounded-lg"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-pink-600 font-medium">Bu akşam seni özel bir yere götüreceğim! 🌟</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
