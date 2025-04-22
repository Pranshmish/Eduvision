import { useParams } from 'react-router-dom';
import StudentProfile from '../components/student/StudentProfile';
import { mockStudents } from '../lib/mock-data';

const StudentProfilePage = () => {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id);

  if (!student) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Student not found</h2>
      </div>
    );
  }

  return <StudentProfile student={student} />;
};

export default StudentProfilePage; 