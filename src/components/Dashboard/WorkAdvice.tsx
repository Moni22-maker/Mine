import React from 'react';
import { Lightbulb, Clock, Target, Zap } from 'lucide-react';

const WorkAdvice: React.FC = () => {
  const advice = [
    {
      icon: Clock,
      title: 'Time Management',
      tip: 'Try the Pomodoro Technique: 25 minutes focused work, 5 minute break.',
      color: 'text-blue-500'
    },
    {
      icon: Target,
      title: 'Goal Setting',
      tip: 'Break large tasks into smaller, manageable chunks for better progress.',
      color: 'text-green-500'
    },
    {
      icon: Zap,
      title: 'Energy Boost',
      tip: 'Take a 5-minute walk or do stretching exercises to refresh your mind.',
      color: 'text-yellow-500'
    },
    {
      icon: Lightbulb,
      title: 'Focus Tip',
      tip: 'Eliminate distractions by turning off notifications during deep work.',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Work Advice</h2>
      </div>

      <div className="space-y-4">
        {advice.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-white dark:bg-gray-700 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.tip}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
          💡 Today's Motivation
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          "Progress, not perfection. Every small step forward is a victory worth celebrating!"
        </p>
      </div>
    </div>
  );
};

export default WorkAdvice;