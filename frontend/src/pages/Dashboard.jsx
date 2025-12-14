import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch tasks';
      toast.error(message);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await axiosInstance.post('/tasks', taskData);
      setTasks([response.data, ...tasks]);
      toast.success('Task created successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
              {user && (
                <p className="text-sm text-gray-600 mt-1">
                  Welcome, {user.username || user.email}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Task Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            + Create Task
          </button>
        </div>

        {/* Tasks Grid */}
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
            <div className="mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
              >
                + Create Task
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={handleDeleteTask} />
            ))}
          </div>
        )}
      </main>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
};

export default Dashboard;


