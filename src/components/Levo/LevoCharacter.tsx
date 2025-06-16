import React, { useEffect, useState } from 'react';
import { useLevo } from '../../contexts/LevoContext';

const LevoCharacter: React.FC = () => {
  const { isListening, isSpeaking, currentMood } = useLevo();
  const [waveAnimation, setWaveAnimation] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0.3);

  // Professional wave animation
  useEffect(() => {
    let animationFrame: number;
    
    const animate = () => {
      setWaveAnimation(prev => (prev + 0.08) % (Math.PI * 2));
      animationFrame = requestAnimationFrame(animate);
    };

    if (isListening || isSpeaking) {
      animate();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isListening, isSpeaking]);

  // Dynamic pulse intensity based on activity
  useEffect(() => {
    if (isListening) {
      setPulseIntensity(0.9);
    } else if (isSpeaking) {
      setPulseIntensity(0.7);
    } else {
      setPulseIntensity(0.4);
    }
  }, [isListening, isSpeaking]);

  const getProfessionalColors = () => {
    if (isListening) {
      return {
        primary: 'from-blue-500 via-indigo-500 to-purple-500',
        secondary: 'from-blue-400 via-indigo-400 to-purple-400',
        accent: 'from-cyan-500 via-blue-500 to-indigo-600',
        glow: 'shadow-blue-500/25'
      };
    } else if (isSpeaking) {
      return {
        primary: 'from-indigo-500 via-purple-500 to-pink-500',
        secondary: 'from-indigo-400 via-purple-400 to-pink-400',
        accent: 'from-purple-500 via-indigo-500 to-blue-600',
        glow: 'shadow-indigo-500/25'
      };
    } else {
      return {
        primary: 'from-gray-400 via-gray-500 to-gray-600',
        secondary: 'from-gray-300 via-gray-400 to-gray-500',
        accent: 'from-slate-400 via-gray-500 to-slate-600',
        glow: 'shadow-gray-400/20'
      };
    }
  };

  const colors = getProfessionalColors();

  // Generate professional wave bars
  const generateWaveBars = (count: number, baseHeight: number, isActive: boolean) => {
    return Array.from({ length: count }, (_, i) => {
      const frequency = 0.4 + (i * 0.25);
      const amplitude = isActive ? (0.4 + Math.random() * 0.6) * pulseIntensity : 0.15;
      const height = baseHeight + Math.sin(waveAnimation * frequency) * amplitude * 35;
      const delay = i * 0.08;
      
      return (
        <div
          key={i}
          className={`bg-gradient-to-t ${colors.primary} rounded-full transition-all duration-200 ease-out ${colors.glow}`}
          style={{
            width: '5px',
            height: `${Math.max(6, height)}px`,
            animationDelay: `${delay}s`,
            opacity: isActive ? 0.85 + Math.sin(waveAnimation + i) * 0.15 : 0.5
          }}
        />
      );
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Professional Character Container */}
      <div className="relative flex items-center justify-center">
        
        {/* Outer Professional Glow */}
        <div className={`absolute inset-0 w-80 h-40 rounded-full bg-gradient-to-r ${colors.accent} opacity-15 blur-2xl animate-pulse`}></div>
        
        {/* Main Professional Wave Visualization */}
        <div className="relative flex items-end justify-center space-x-1.5 h-28 w-64 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-gray-700/20 shadow-2xl">
          {/* Left side waves */}
          <div className="flex items-end space-x-1.5">
            {generateWaveBars(10, 10, isListening || isSpeaking).reverse()}
          </div>
          
          {/* Center core */}
          <div className="flex flex-col items-center">
            <div 
              className={`w-7 h-20 bg-gradient-to-t ${colors.primary} rounded-full transition-all duration-300 ${colors.glow} ${
                isListening || isSpeaking ? 'animate-pulse' : ''
              }`}
              style={{
                height: `${20 + (isListening || isSpeaking ? Math.sin(waveAnimation) * 15 : 0)}px`,
                opacity: 0.95
              }}
            />
          </div>
          
          {/* Right side waves */}
          <div className="flex items-end space-x-1.5">
            {generateWaveBars(10, 10, isListening || isSpeaking)}
          </div>
        </div>

        {/* Professional Listening Indicators */}
        {isListening && (
          <>
            <div className="absolute inset-0 w-80 h-40 rounded-3xl border-2 border-blue-400/20 animate-ping"></div>
            <div className="absolute inset-0 w-72 h-36 rounded-3xl border border-indigo-400/30 animate-pulse"></div>
          </>
        )}

        {/* Professional Speaking Indicator */}
        {isSpeaking && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
      </div>

      {/* Professional Status Display */}
      <div className="mt-12 text-center space-y-3">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {isListening ? 'Listening' : 
             isSpeaking ? 'Responding' : 
             'Ready'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {isListening ? 'I can hear you clearly' :
             isSpeaking ? 'Processing your request' :
             'Tap the microphone to start'}
          </p>
        </div>
        
        {/* Status Indicator */}
        <div className="flex justify-center">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isListening ? 'bg-blue-500 animate-pulse' :
            isSpeaking ? 'bg-indigo-500 animate-pulse' :
            'bg-gray-400'
          }`}></div>
        </div>
      </div>

      {/* Professional Ambient Background */}
      <div className={`absolute inset-0 -z-10 w-96 h-48 bg-gradient-to-r ${colors.secondary} opacity-8 blur-3xl rounded-full`}></div>
    </div>
  );
};

export default LevoCharacter;