import React, { useState } from 'react';
import LevoAssistant from './components/Levo/LevoAssistant';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import { ThemeProvider } from './contexts/ThemeContext';
import { LevoProvider } from './contexts/LevoContext';

function App() {
  const [currentView, setCurrentView] = useState<'assistant' | 'dashboard' | 'settings'>('assistant');

  return (
    <ThemeProvider>
      <LevoProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-colors duration-500">
          {/* Professional Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-gray-200/20 dark:border-gray-700/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-medium text-lg">L</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xl text-gray-900 dark:text-white tracking-tight">Levo</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">AI Assistant</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 bg-gray-100/60 dark:bg-gray-800/60 rounded-2xl p-1.5 backdrop-blur-sm">
                  <button
                    onClick={() => setCurrentView('assistant')}
                    className={`px-6 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm ${
                      currentView === 'assistant'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    Assistant
                  </button>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`px-6 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm ${
                      currentView === 'dashboard'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentView('settings')}
                    className={`px-6 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm ${
                      currentView === 'settings'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-20">
            {currentView === 'assistant' && <LevoAssistant />}
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'settings' && <Settings />}
          </main>
        </div>
      </LevoProvider>
    </ThemeProvider>
  );
}

export default App;