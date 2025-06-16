import React, { useState, useEffect } from 'react';
import { Clock, Coffee, Eye, Pause, Play, RotateCcw } from 'lucide-react';

const BreakReminder: React.FC = () => {
  const [timeWorked, setTimeWorked] = useState(0); // in minutes
  const [isActive, setIsActive] = useState(false);
  const [breakType, setBreakType] = useState<'micro' | 'short' | 'long'>('micro');
  const [lastBreak, setLastBreak] = useState<Date | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeWorked(prev => prev + 1);
      }, 60000); // Update every minute
    }

    return () => clearInterval(interval);
  }, [isActive]);

  // Break recommendations based on time worked
  useEffect(() => {
    if (timeWorked > 0) {
      if (timeWorked % 120 === 0) { // Every 2 hours
        setBreakType('long');
      } else if (timeWorked % 30 === 0) { // Every 30 minutes
        setBreakType('short');
      } else if (timeWorked % 10 === 0) { // Every 10 minutes
        setBreakType('micro');
      }
    }
  }, [timeWorked]);

  const getBreakRecommendation = () => {
    switch (breakType) {
      case 'micro':
        return {
          title: 'Micro Break',
          duration: '30 seconds',
          activity: 'Look away from screen, blink 20 times',
          icon: Eye,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        };
      case 'short':
        return {
          title: 'Short Break',
          duration: '5 minutes',
          activity: 'Stand up, stretch, or walk around',
          icon: Coffee,
          color: 'text-green-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20'
        };
      case 'long':
        return {
          title: 'Long Break',
          duration: '15-30 minutes',
          activity: 'Take a walk, eat a snack, or socialize',
          icon: Pause,
          color: 'text-purple-500',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        };
    }
  };

  const recommendation = getBreakRecommendation();
  const Icon = recommendation.icon;

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeWorked(0);
    setIsActive(false);
  };

  const takeBreak = () => {
    setLastBreak(new Date());
    setTimeWorked(0);
    setIsActive(false);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getBreakUrgency = () => {
    if (timeWorked >= 120) return 'urgent';
    if (timeWorked >= 60) return 'moderate';
    return 'low';
  };

  const urgency = getBreakUrgency();

  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Break Reminder</h2>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className={`text-3xl font-light mb-2 ${
          urgency === 'urgent' ? 'text-red-500' :
          urgency === 'moderate' ? 'text-yellow-500' :
          'text-gray-900 dark:text-white'
        }`}>
          {formatTime(timeWorked)}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isActive ? 'Working time' : 'Paused'}
        </p>
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center space-x-3 mb-6">
        <button
          onClick={toggleTimer}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isActive
              ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/70'
              : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/70'
          }`}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm">{isActive ? 'Pause' : 'Start'}</span>
        </button>
        
        <button
          onClick={resetTimer}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm">Reset</span>
        </button>
      </div>

      {/* Break Recommendation */}
      <div className={`p-4 rounded-lg ${recommendation.bgColor} border border-gray-200/30 dark:border-gray-700/30`}>
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg bg-white dark:bg-gray-700`}>
            <Icon className={`w-4 h-4 ${recommendation.color}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              {recommendation.title} ({recommendation.duration})
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {recommendation.activity}
            </p>
            <button
              onClick={takeBreak}
              className="text-xs px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Take Break
            </button>
          </div>
        </div>
      </div>

      {/* Last Break Info */}
      {lastBreak && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last break: {lastBreak.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      )}
    </div>
  );
};

export default BreakReminder;