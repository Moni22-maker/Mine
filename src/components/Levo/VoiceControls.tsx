import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Type, Send, Loader, MessageSquare } from 'lucide-react';
import { useLevo } from '../../contexts/LevoContext';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { getLevoResponse } from '../../utils/levoResponses';

const VoiceControls: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addMessage, setListening, setSpeaking } = useLevo();
  const textInputRef = useRef<HTMLInputElement>(null);

  const { isListening, startListening, stopListening, transcript } = useVoiceRecognition();
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Update context when listening state changes
  useEffect(() => {
    setListening(isListening);
  }, [isListening, setListening]);

  // Update context when speaking state changes
  useEffect(() => {
    setSpeaking(isSpeaking);
  }, [isSpeaking, setSpeaking]);

  // Process voice input when transcript is received
  useEffect(() => {
    if (transcript) {
      handleUserInput(transcript);
    }
  }, [transcript]);

  // Focus text input when shown
  useEffect(() => {
    if (showTextInput && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [showTextInput]);

  const handleUserInput = async (input: string) => {
    if (!input.trim()) return;

    setIsProcessing(true);
    
    // Add user message
    addMessage(input, true);

    // Get Levo's response
    const response = await getLevoResponse(input);
    
    // Add Levo's response
    addMessage(response.text, false, response.emotion);
    
    // Speak the response
    speak(response.text);
    
    setIsProcessing(false);
    setTextInput('');
    setShowTextInput(false);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleUserInput(textInput);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      {/* Professional Voice Button */}
      <div className="relative">
        <button
          onClick={handleVoiceToggle}
          disabled={isSpeaking || isProcessing}
          className={`w-20 h-20 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-2xl border-0 ${
            isListening
              ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 scale-110 shadow-blue-500/30'
              : isProcessing
              ? 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-gray-400/20'
              : 'bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 hover:scale-105 shadow-gray-600/20'
          } text-white disabled:opacity-70 disabled:cursor-not-allowed backdrop-blur-sm`}
        >
          {isProcessing ? (
            <Loader className="w-7 h-7 animate-spin" />
          ) : isListening ? (
            <div className="w-7 h-7 bg-white rounded-lg animate-pulse"></div>
          ) : (
            <Mic className="w-7 h-7" />
          )}
        </button>

        {/* Professional Listening Rings */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 animate-ping scale-125"></div>
            <div className="absolute inset-0 rounded-2xl border border-indigo-400/20 animate-pulse scale-150"></div>
            <div className="absolute inset-0 rounded-2xl border border-purple-400/15 animate-pulse scale-175"></div>
          </>
        )}
      </div>

      {/* Professional Control Panel */}
      <div className="flex items-center space-x-8">
        <button
          onClick={() => setShowTextInput(!showTextInput)}
          className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border shadow-lg ${
            showTextInput 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/30 shadow-blue-200/50' 
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 border-gray-200/50 dark:border-gray-700/30 shadow-gray-200/50'
          }`}
        >
          <Type className="w-5 h-5" />
          <span className="text-sm font-medium">Type Message</span>
        </button>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {isListening ? 'Listening...' : 
             isProcessing ? 'Processing...' :
             'Ready to assist'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isListening ? 'Speak clearly' :
             isProcessing ? 'Please wait' :
             'Click microphone or type'}
          </p>
        </div>
      </div>

      {/* Professional Text Input */}
      {showTextInput && (
        <form onSubmit={handleTextSubmit} className="w-full max-w-2xl">
          <div className="flex space-x-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <div className="flex items-center space-x-3 flex-1">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <input
                ref={textInputRef}
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your message to Levo..."
                className="flex-1 px-0 py-2 bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-lg"
                disabled={isProcessing}
              />
            </div>
            <button
              type="submit"
              disabled={!textInput.trim() || isProcessing}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 flex items-center space-x-2 font-medium shadow-lg"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VoiceControls;