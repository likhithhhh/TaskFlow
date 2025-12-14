const TaskCard = ({ task, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pending':
      default:
        return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const formatStatus = (status) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 flex-1 mr-4">
          {task.title}
        </h3>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
            task.status
          )}`}
        >
          {formatStatus(task.status)}
        </span>
        {task.createdAt && (
          <span className="text-xs text-gray-500">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

