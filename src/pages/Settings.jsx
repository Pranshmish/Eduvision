import { useState } from 'react';
import { Moon, Sun, Bell, Clock, Users, BarChart2, Save } from 'lucide-react';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    disengagement: true,
    lowAttendance: true,
    sessionEnd: true,
    weeklyReport: true,
  });
  const [thresholds, setThresholds] = useState({
    disengagementThreshold: 60,
    warningThreshold: 75,
    engagementThreshold: 85,
  });
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [autoExport, setAutoExport] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleThresholdChange = (key, value) => {
    setThresholds({
      ...thresholds,
      [key]: parseInt(value),
    });
  };

  const handleSave = () => {
    // In a real application, this would save settings to a backend
    console.log('Saving settings:', {
      isDarkMode,
      notifications,
      thresholds,
      refreshInterval,
      autoExport,
      exportFormat,
    });
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure your application preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="h-5 w-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isDarkMode ? (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Disengagement Alerts</span>
              </div>
              <button
                onClick={() => handleNotificationChange('disengagement')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  notifications.disengagement ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.disengagement ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Low Attendance Alerts</span>
              </div>
              <button
                onClick={() => handleNotificationChange('lowAttendance')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  notifications.lowAttendance ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.lowAttendance ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Session End Reminders</span>
              </div>
              <button
                onClick={() => handleNotificationChange('sessionEnd')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  notifications.sessionEnd ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.sessionEnd ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Weekly Report</span>
              </div>
              <button
                onClick={() => handleNotificationChange('weeklyReport')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  notifications.weeklyReport ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.weeklyReport ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Engagement Thresholds</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Disengagement Threshold (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={thresholds.disengagementThreshold}
                onChange={(e) => handleThresholdChange('disengagementThreshold', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                {thresholds.disengagementThreshold}%
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Warning Threshold (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={thresholds.warningThreshold}
                onChange={(e) => handleThresholdChange('warningThreshold', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                {thresholds.warningThreshold}%
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Engagement Threshold (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={thresholds.engagementThreshold}
                onChange={(e) => handleThresholdChange('engagementThreshold', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                {thresholds.engagementThreshold}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Data & Export</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data Refresh Interval (seconds)
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="15">15 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Save className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Auto-export Reports</span>
              </div>
              <button
                onClick={() => setAutoExport(!autoExport)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  autoExport ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    autoExport ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Export Format
              </label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 