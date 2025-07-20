import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LightboxModalProps {
  image: {src: string, caption: string} | null;
  onClose: () => void;
}

export default function LightboxModal({ image, onClose }: LightboxModalProps) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="relative max-w-4xl max-h-screen p-4" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
          <motion.img
            src={image.src}
            alt={image.caption}
            className="max-w-full max-h-full object-contain rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="text-white text-center mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {image.caption}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
