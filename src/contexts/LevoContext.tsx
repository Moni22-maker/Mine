import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  emotion?: 'happy' | 'sad' | 'neutral' | 'excited' | 'concerned';
}

interface LevoContextType {
  messages: Message[];
  isListening: boolean;
  isSpeaking: boolean;
  currentMood: 'happy' | 'sad' | 'neutral' | 'excited' | 'concerned';
  addMessage: (text: string, isUser: boolean, emotion?: Message['emotion']) => void;
  setListening: (listening: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  setCurrentMood: (mood: LevoContextType['currentMood']) => void;
  clearMessages: () => void;
}

const LevoContext = createContext<LevoContextType | undefined>(undefined);

export const useLevo = () => {
  const context = useContext(LevoContext);
  if (!context) {
    throw new Error('useLevo must be used within a LevoProvider');
  }
  return context;
};

export const LevoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMood, setCurrentMood] = useState<LevoContextType['currentMood']>('neutral');

  const addMessage = useCallback((text: string, isUser: boolean, emotion?: Message['emotion']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      emotion
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const setListening = useCallback((listening: boolean) => {
    setIsListening(listening);
  }, []);

  const setSpeaking = useCallback((speaking: boolean) => {
    setIsSpeaking(speaking);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <LevoContext.Provider value={{
      messages,
      isListening,
      isSpeaking,
      currentMood,
      addMessage,
      setListening,
      setSpeaking,
      setCurrentMood,
      clearMessages
    }}>
      {children}
    </LevoContext.Provider>
  );
};