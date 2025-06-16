import { useState, useEffect } from 'react';

interface Voice {
  name: string;
  lang: string;
  voiceURI: string;
}

interface UseSpeechSynthesisReturn {
  speak: (text: string) => void;
  isSpeaking: boolean;
  voices: Voice[];
  selectedVoice: string;
  setSelectedVoice: (voiceURI: string) => void;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  isSupported: boolean;
}

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices()
          .filter(voice => voice.lang.startsWith('en'))
          .map(voice => ({
            name: voice.name,
            lang: voice.lang,
            voiceURI: voice.voiceURI
          }));
        
        setVoices(availableVoices);
        
        // Set default voice (prefer female voices for warmth)
        const preferredVoice = availableVoices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          voice.name.toLowerCase().includes('victoria')
        ) || availableVoices[0];
        
        if (preferredVoice && !selectedVoice) {
          setSelectedVoice(preferredVoice.voiceURI);
        }
      };

      loadVoices();
      speechSynthesis.addEventListener('voiceschanged', loadVoices);

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, [selectedVoice]);

  const speak = (text: string) => {
    if (!isSupported) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find and set the selected voice
    if (selectedVoice) {
      const voice = speechSynthesis.getVoices().find(v => v.voiceURI === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  return {
    speak,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    isSupported
  };
};