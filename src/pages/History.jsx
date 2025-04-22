import { Search, Calendar, Clock, Users, ChevronRight, Filter } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionCard from '../components/history/SessionCard';
import ExportButton from '../components/shared/ExportButton';
import { mockSessions } from '../lib/mock-data';

const History = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.className.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !selectedDate || session.date === selectedDate;
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && session.status === 'active') ||
                         (selectedFilter === 'completed' && session.status === 'completed');

    return matchesSearch && matchesDate && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Session History</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and analyze past classroom sessions</p>
        </div>
        <ExportButton />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <div className="relative">
            <button
              onClick={() => handleFilterChange(selectedFilter === 'all' ? 'active' : 'all')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {selectedFilter === 'all' ? 'All Sessions' : 'Active Sessions'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSessions.map(session => (
          <div
            key={session.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => navigate(`/history/${session.id}`)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.subject}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session.className}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{session.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{session.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{session.studentCount} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${session.engagement >= 70 ? 'bg-green-500' : session.engagement >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{session.engagement}% engagement</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History; 