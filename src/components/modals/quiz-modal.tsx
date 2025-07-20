import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, Heart, HeartCrack } from "lucide-react";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "İlk randevumuzda nereye gitmiştik?",
      options: ["Sinemaya", "Parka", "Restorana"],
      correctAnswer: 1
    },
    {
      question: "İlk kez 'seni seviyorum' dediğim tarih?",
      options: ["25 Mart 2023", "10 Mart 2023", "15 Mart 2023"],
      correctAnswer: 0
    },
    {
      question: "En sevdiğin çiçek hangisi?",
      options: ["Gül", "Lale", "Papatya"],
      correctAnswer: 0
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
      setShowResult(true);
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          // Quiz completed
          setTimeout(() => {
            onClose();
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setShowResult(false);
          }, 2000);
        }
      }, 2000);
    }, 500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

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
            className="bg-white p-8 rounded-xl max-w-lg shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="float-right text-gray-500 hover:text-gray-700 text-xl"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <Brain className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
              <h3 className="font-playfair text-2xl text-pink-600 mb-2">🧠 Anılar Testi 🧠</h3>
              <p className="text-gray-600">Ne kadar iyi hatırlıyorsun bakalım?</p>
              <div className="mt-2">
                <span className="text-sm text-gray-500">
                  Soru {currentQuestion + 1} / {questions.length}
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={currentQuestion}
                  className="space-y-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="quiz-question">
                    <p className="font-medium text-gray-700 mb-4 text-center">
                      {questions[currentQuestion].question}
                    </p>
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <motion.button
                          key={index}
                          className={`quiz-option w-full text-left p-4 rounded-lg transition-colors ${
                            selectedAnswer === index
                              ? 'bg-pink-200 border-pink-400'
                              : 'bg-pink-50 hover:bg-pink-100 border-pink-200'
                          } border-2`}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                    <div>
                      <Heart className="w-16 h-16 text-pink-500 mb-4 mx-auto" />
                      <p className="text-green-600 font-medium text-lg">
                        Doğru! Seni ne kadar iyi tanıdığımı görüyorsun! 💕
                      </p>
                    </div>
                  ) : (
                    <div>
                      <HeartCrack className="w-16 h-16 text-gray-400 mb-4 mx-auto" />
                      <p className="text-red-600 font-medium text-lg">
                        Yanlış! Ama önemli değil, asıl önemli olan şimdi birlikte olmamız! 💖
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
