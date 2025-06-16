import React, { useState } from 'react';
import { Smile, Meh, Frown, TrendingUp, Calendar } from 'lucide-react';

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [moodHistory] = useState([
    { date: '2024-01-15', mood: 'happy' },
    { date: '2024-01-14', mood: 'neutral' },
    { date: '2024-01-13', mood: 'happy' },
    { date: '2024-01-12', mood: 'sad' },
    { date: '2024-01-11', mood: 'happy' },
    { date: '2024-01-10', mood: 'neutral' },
    { date: '2024-01-09', mood: 'happy' },
  ]);

  const moods = [
    { id: 'happy', icon: Smile, label: 'Happy', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { id: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { id: 'sad', icon: Frown, label: 'Sad', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  ] as const;

  const getMoodStats = () => {
    const total = moodHistory.length;
    const happy = moodHistory.filter(m => m.mood === 'happy').length;
    const neutral = moodHistory.filter(m => m.mood === 'neutral').length;
    const sad = moodHistory.filter(m => m.mood === 'sad').length;

    return {
      happy: Math.round((happy / total) * 100),
      neutral: Math.round((neutral / total) * 100),
      sad: Math.round((sad / total) * 100),
    };
  };

  const stats = getMoodStats();

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-700/30 p-8 shadow-2xl">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mood Tracker</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Track your daily emotions</p>
        </div>
      </div>

      {/* Today's Mood */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          How are you feeling today?
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 border-2 ${
                  selectedMood === mood.id
                    ? `${mood.bg} border-current ${mood.color} scale-105 shadow-lg`
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-102'
                }`}
              >
                <Icon className={`w-8 h-8 mb-2 ${selectedMood === mood.id ? mood.color : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${selectedMood === mood.id ? mood.color : 'text-gray-600 dark:text-gray-400'}`}>
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood Stats */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            This Week's Overview
          </h3>
        </div>
        
        <div className="space-y-4">
          {moods.map((mood, index) => {
            const statValue = mood.id === 'happy' ? stats.happy : mood.id === 'neutral' ? stats.neutral : stats.sad;
            const Icon = mood.icon;
            
            return (
              <div key={mood.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${mood.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${mood.color}`} />
                    </div>
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">{mood.label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{statValue}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      mood.id === 'happy' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      mood.id === 'neutral' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${statValue}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;