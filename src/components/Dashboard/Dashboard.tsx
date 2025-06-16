import React from 'react';
import WorkAdvice from './WorkAdvice';
import MoodTracker from './MoodTracker';
import ProductivityStats from './ProductivityStats';
import BreakReminder from './BreakReminder';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-gray-50 via-white to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-semibold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                Your productivity and wellness insights
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 w-24"></div>
        </div>

        {/* Professional Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Mood Tracker */}
          <div className="lg:col-span-1">
            <MoodTracker />
          </div>

          {/* Work Advice */}
          <div className="lg:col-span-1">
            <WorkAdvice />
          </div>

          {/* Break Reminder */}
          <div className="lg:col-span-1">
            <BreakReminder />
          </div>

          {/* Productivity Stats */}
          <div className="lg:col-span-2 xl:col-span-3">
            <ProductivityStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;