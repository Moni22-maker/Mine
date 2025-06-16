import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Target, Zap, Calendar } from 'lucide-react';

const ProductivityStats: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');

  // Mock data - in a real app, this would come from your backend
  const mockData = {
    today: {
      focusTime: 245,
      breaks: 8,
      tasksCompleted: 12,
      productivity: 87,
      hourlyStats: [
        { hour: '9 AM', focus: 45, breaks: 1 },
        { hour: '10 AM', focus: 50, breaks: 2 },
        { hour: '11 AM', focus: 35, breaks: 1 },
        { hour: '12 PM', focus: 20, breaks: 3 },
        { hour: '1 PM', focus: 30, breaks: 1 },
        { hour: '2 PM', focus: 40, breaks: 2 },
        { hour: '3 PM', focus: 25, breaks: 1 },
      ]
    },
    week: {
      focusTime: 1680,
      breaks: 54,
      tasksCompleted: 89,
      productivity: 82,
      dailyStats: [
        { day: 'Mon', focus: 280, tasks: 15 },
        { day: 'Tue', focus: 245, tasks: 12 },
        { day: 'Wed', focus: 310, tasks: 18 },
        { day: 'Thu', focus: 190, tasks: 10 },
        { day: 'Fri', focus: 265, tasks: 14 },
        { day: 'Sat', focus: 220, tasks: 11 },
        { day: 'Sun', focus: 170, tasks: 9 },
      ]
    },
    month: {
      focusTime: 6720,
      breaks: 216,
      tasksCompleted: 356,
      productivity: 79,
      weeklyStats: [
        { week: 'Week 1', focus: 1400, tasks: 75 },
        { week: 'Week 2', focus: 1680, tasks: 89 },
        { week: 'Week 3', focus: 1520, tasks: 81 },
        { week: 'Week 4', focus: 2120, tasks: 111 },
      ]
    }
  };

  const currentData = mockData[timeframe];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    unit, 
    color, 
    trend 
  }: {
    icon: React.ElementType;
    title: string;
    value: string;
    unit?: string;
    color: string;
    trend: number;
  }) => (
    <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200/30 dark:border-gray-700/30">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <div className={`flex items-center text-xs ${
          trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          <TrendingUp className={`w-3 h-3 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        {value}
        {unit && <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>}
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  );

  const renderChart = () => {
    if (timeframe === 'today') {
      const maxFocus = Math.max(...currentData.hourlyStats.map(s => s.focus));
      return (
        <div className="space-y-3">
          {currentData.hourlyStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-12 text-xs text-gray-600 dark:text-gray-400">{stat.hour}</div>
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stat.focus / maxFocus) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 w-8">
                  {stat.focus}m
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (timeframe === 'week') {
      const maxFocus = Math.max(...currentData.dailyStats.map(s => s.focus));
      return (
        <div className="grid grid-cols-7 gap-2">
          {currentData.dailyStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">{stat.day}</div>
              <div 
                className="bg-blue-500 rounded mx-auto transition-all duration-500"
                style={{ 
                  height: `${(stat.focus / maxFocus) * 80}px`,
                  width: '20px'
                }}
              ></div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {Math.floor(stat.focus / 60)}h
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Month view
    const maxFocus = Math.max(...currentData.weeklyStats.map(s => s.focus));
    return (
      <div className="space-y-3">
        {currentData.weeklyStats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-16 text-xs text-gray-600 dark:text-gray-400">{stat.week}</div>
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(stat.focus / maxFocus) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 w-12">
                {Math.floor(stat.focus / 60)}h
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Productivity Stats</h2>
        </div>
        
        {/* Time frame selector */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(['today', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-xs rounded-md transition-colors capitalize ${
                timeframe === period
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Clock}
          title="Focus Time"
          value={formatTime(currentData.focusTime)}
          color="text-blue-500"
          trend={12}
        />
        <StatCard
          icon={Zap}
          title="Breaks Taken"
          value={currentData.breaks.toString()}
          color="text-green-500"
          trend={8}
        />
        <StatCard
          icon={Target}
          title="Tasks Done"
          value={currentData.tasksCompleted.toString()}
          color="text-purple-500"
          trend={-3}
        />
        <StatCard
          icon={TrendingUp}
          title="Productivity"
          value={currentData.productivity.toString()}
          unit="%"
          color="text-yellow-500"
          trend={5}
        />
      </div>

      {/* Chart */}
      <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200/30 dark:border-gray-700/30">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Focus Time Distribution
          </h3>
        </div>
        {renderChart()}
      </div>
    </div>
  );
};

export default ProductivityStats;