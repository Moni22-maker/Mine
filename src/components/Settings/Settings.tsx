import React from 'react';
import { Settings as SettingsIcon, Moon, Sun, Volume2, Mic, User, Bell } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { voices, selectedVoice, setSelectedVoice, rate, setRate, pitch, setPitch, speak } = useSpeechSynthesis();

  const testVoice = () => {
    speak("Hi! This is how I sound with these settings. I hope you like my voice!");
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your Levo experience to match your preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center space-x-2 mb-6">
              {isDark ? <Moon className="w-5 h-5 text-blue-500" /> : <Sun className="w-5 h-5 text-blue-500" />}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Theme</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Choose your preferred color scheme</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDark ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDark ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Voice Settings */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Volume2 className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Voice Settings</h2>
            </div>

            <div className="space-y-6">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Voice
                </label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {voices.map((voice) => (
                    <option key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Speech Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Speech Rate: {rate.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Pitch */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Pitch: {pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Test Voice Button */}
              <button
                onClick={testVoice}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Test Voice</span>
              </button>
            </div>
          </div>

          {/* Interaction Settings */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Mic className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Interaction</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Auto-listen after response</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Automatically start listening after Levo responds</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Wake word detection</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Say "Hey Levo" to start conversation</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Break reminders</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Get notified when it's time for a break</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Daily motivation</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Receive daily motivational messages</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Mood check-ins</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Gentle reminders to track your mood</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="How should Levo address you?"
                  className="w-full px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Work Schedule
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="time"
                    defaultValue="17:00"
                    className="px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Start time and end time
                </p>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <SettingsIcon className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data & Privacy</h2>
            </div>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white text-sm">Export Data</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Download your conversation history and settings</div>
              </button>

              <button className="w-full text-left px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white text-sm">Clear Conversation History</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Remove all stored conversations</div>
              </button>

              <button className="w-full text-left px-4 py-3 bg-red-50/50 dark:bg-red-900/20 rounded-lg border border-red-200/30 dark:border-red-700/30 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                <div className="font-medium text-red-700 dark:text-red-300 text-sm">Reset All Settings</div>
                <div className="text-xs text-red-600 dark:text-red-400">Restore default configuration</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;