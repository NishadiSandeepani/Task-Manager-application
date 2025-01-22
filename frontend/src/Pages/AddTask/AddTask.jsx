import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddTask() {
  const [taskData, setTaskData] = useState({
    taskName: '',
    description: '',
    status: 'Not Completed',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/tasks', taskData);

      Swal.fire({
        title: 'Success!',
        text: 'Task added successfully!',
        icon: 'success',
        confirmButtonText: 'Okay'
      });

      console.log('Task added:', response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error adding task!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });

      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="taskName" className="block text-blue-700">Task Name</label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={taskData.taskName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-blue-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="block text-blue-700">Status</label>
            <select
              id="status"
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
