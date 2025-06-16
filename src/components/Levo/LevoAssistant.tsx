import React from 'react';
import LevoCharacter from './LevoCharacter';
import VoiceControls from './VoiceControls';
import MessageHistory from './MessageHistory';
import { useLevo } from '../../contexts/LevoContext';

const LevoAssistant: React.FC = () => {
  const { messages } = useLevo();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-white to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <div className="w-full max-w-5xl mx-auto">
        {/* Main Assistant Area */}
        <div className="flex flex-col items-center space-y-16">
          {/* Professional Levo Character */}
          <div className="flex flex-col items-center space-y-12">
            <LevoCharacter />
            
            {/* Professional Welcome Message */}
            {messages.length === 0 && (
              <div className="text-center space-y-6 max-w-3xl">
                <div className="space-y-4">
                  <h1 className="text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Levo
                    </span>
                  </h1>
                  <p className="text-2xl text-gray-700 dark:text-gray-300 font-medium">
                    Your Professional AI Assistant
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    Enhance your productivity with intelligent conversations, personalized insights, and professional support.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Voice Recognition</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>Smart Responses</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Productivity Tools</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Voice Controls */}
          <VoiceControls />

          {/* Message History */}
          {messages.length > 0 && (
            <div className="w-full max-w-4xl">
              <MessageHistory />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevoAssistant;