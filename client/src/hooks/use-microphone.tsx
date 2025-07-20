import { useState, useRef, useCallback } from "react";

interface UseMicrophoneProps {
  onBlowDetected: () => void;
  threshold?: number;
}

export function useMicrophone({ onBlowDetected, threshold = 0.3 }: UseMicrophoneProps) {
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      setIsListening(true);
      
      const checkForBlow = () => {
        if (!isListening) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate average volume
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        const normalizedAverage = average / 255;
        
        // Detect sudden volume spikes (blowing)
        if (normalizedAverage > threshold) {
          onBlowDetected();
          stopListening();
          return;
        }
        
        requestAnimationFrame(checkForBlow);
      };
      
      checkForBlow();
      
      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (isListening) {
          stopListening();
        }
      }, 10000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsListening(false);
    }
  }, [onBlowDetected, threshold, isListening]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    analyserRef.current = null;
  }, []);

  return {
    isListening,
    startListening,
    stopListening
  };
}
