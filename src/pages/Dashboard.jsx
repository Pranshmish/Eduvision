import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Activity, Users, AlertTriangle } from 'lucide-react';
import StudentList from '../components/student/StudentList';
import EngagementChart from '../components/session/EngagementChart';
import { mockStudents, mockEngagementData } from '../lib/mock-data';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleNewSession = () => {
    // In a real application, this would create a new session
    console.log('Creating new session...');
    navigate('/history');
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'engaged' && student.attentionScore >= 80) ||
                         (selectedFilter === 'warning' && student.attentionScore >= 60 && student.attentionScore < 80) ||
                         (selectedFilter === 'disengaged' && student.attentionScore < 60);

    return matchesSearch && matchesFilter;
  });

  const getEngagementStats = () => {
    const total = mockStudents.length;
    const engaged = mockStudents.filter(s => s.attentionScore >= 80).length;
    const warning = mockStudents.filter(s => s.attentionScore >= 60 && s.attentionScore < 80).length;
    const disengaged = mockStudents.filter(s => s.attentionScore < 60).length;

    return {
      total,
      engaged,
      warning,
      disengaged,
      avgEngagement: Math.round(
        mockStudents.reduce((sum, student) => sum + student.attentionScore, 0) / total
      ),
    };
  };

  const stats = getEngagementStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Live Classroom</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor student engagement in real-time</p>
        </div>
        <button
          onClick={handleNewSession}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Students</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Engaged</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.engaged}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Warning</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.warning}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Disengaged</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stats.disengaged}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Overall Engagement</h2>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.avgEngagement}%
          </div>
        </div>
        <div className="h-64">
          <EngagementChart data={mockEngagementData} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Student Status</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button
              onClick={() => handleFilterChange(
                selectedFilter === 'all' ? 'engaged' : 
                selectedFilter === 'engaged' ? 'warning' : 
                selectedFilter === 'warning' ? 'disengaged' : 'all'
              )}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {selectedFilter === 'all' ? 'All Students' : 
                 selectedFilter === 'engaged' ? 'Engaged' : 
                 selectedFilter === 'warning' ? 'Warning' : 'Disengaged'}
              </span>
            </button>
          </div>
        </div>
        <StudentList students={filteredStudents} />
      </div>
    </div>
  );
};

export default Dashboard; 