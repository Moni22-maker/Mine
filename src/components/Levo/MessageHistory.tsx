import React, { useEffect, useRef } from 'react';
import { useLevo } from '../../contexts/LevoContext';
import { User, Bot } from 'lucide-react';

const MessageHistory: React.FC = () => {
  const { messages } = useLevo();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-700/30 p-8 max-h-[500px] overflow-y-auto shadow-2xl">
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-4 ${
              message.isUser ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Professional Avatar */}
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                message.isUser
                  ? 'bg-gradient-to-br from-gray-600 to-gray-700'
                  : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600'
              }`}
            >
              {message.isUser ? (
                <User className="w-6 h-6 text-white" />
              ) : (
                <Bot className="w-6 h-6 text-white" />
              )}
            </div>

            {/* Professional Message */}
            <div
              className={`max-w-md lg:max-w-lg px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                message.isUser
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                  : 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 border border-gray-200/50 dark:border-gray-700/50'
              }`}
            >
              <p className="text-base leading-relaxed font-medium">{message.text}</p>
              <p className={`text-xs mt-3 ${
                message.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageHistory;