import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Users, BarChart2, Download, Play, Pause, Square } from 'lucide-react';
import { mockSessions } from '../lib/mock-data';
import EngagementChart from '../components/session/EngagementChart';
import StudentList from '../components/session/StudentList';

const SessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const session = mockSessions.find(s => s.id === id);

  if (!session) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Session not found</h2>
        <button
          onClick={() => navigate('/history')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to History
        </button>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/history');
  };

  const handleExport = () => {
    // In a real application, this would generate and download a PDF/CSV report
    console.log('Exporting session data:', session);
    alert('Session report exported successfully!');
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPaused(!isPaused);
    } else {
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to History</span>
        </button>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-5 w-5" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{session.subject}</h1>
            <p className="text-gray-500 dark:text-gray-400">{session.className}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className={`p-2 rounded-full ${
                isPlaying
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {isPlaying && !isPaused ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            <button
              onClick={handleStop}
              className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
            >
              <Square className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Session Details</h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Date:</span> {session.date}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Duration:</span> {session.duration}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Status:</span>{' '}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    session.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {session.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Engagement Metrics</h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Average Engagement:</span> {session.engagement}%
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Peak Engagement:</span> {session.peakEngagement}%
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Engagement Over Time</h3>
            <EngagementChart data={session.engagementData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Student Performance</h2>
          <StudentList students={session.students} />
        </div>
      </div>
    </div>
  );
};

export default SessionDetail; 