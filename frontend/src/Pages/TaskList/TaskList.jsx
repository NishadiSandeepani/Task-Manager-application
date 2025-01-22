import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({ taskName: '', description: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const endpoint =
          filter === 'All'
            ? 'http://localhost:5000/tasks'
            : `http://localhost:5000/tasks?status=${filter}`;
        const response = await axios.get(endpoint);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [filter]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));

      Swal.fire({
        title: 'Deleted!',
        text: 'Task has been deleted.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
    } catch (error) {
      console.error('Error deleting task:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete task!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  const handleMarkAsCompleted = async (id) => {
    const task = tasks.find(task => task._id === id);
    const updatedTask = { ...task, status: task.status === 'Completed' ? 'Not Completed' : 'Completed' };

    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));

      Swal.fire({
        title: 'Updated!',
        text: `Task marked as ${updatedTask.status}.`,
        icon: 'success',
        confirmButtonText: 'Okay'
      });
    } catch (error) {
      console.error('Error updating task:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to update task status!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setEditedTask({ taskName: task.taskName, description: task.description });
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedTask = { ...tasks.find(task => task._id === id), ...editedTask };
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);

      setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
      setEditingTask(null);

      Swal.fire({
        title: 'Saved!',
        text: 'Task has been updated.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
    } catch (error) {
      console.error('Error saving task:', error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to save task!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Task List</h2>

        <div className="mb-4">
          <label htmlFor="filter" className="text-lg text-blue-700 font-medium">Filter by status: </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-4 p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>

        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="bg-blue-100 p-4 rounded-lg shadow-sm hover:bg-blue-200">
              {editingTask === task._id ? (
                <div>
                  <input
                    type="text"
                    value={editedTask.taskName}
                    onChange={(e) => setEditedTask({ ...editedTask, taskName: e.target.value })}
                    className="block w-full p-2 border rounded-lg mb-2"
                  />
                  <textarea
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    className="block w-full p-2 border rounded-lg mb-2"
                  />
                  <button
                    onClick={() => handleSaveEdit(task._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <div className="task-info mb-4">
                    <p className="text-xl font-semibold text-blue-800">{task.taskName}</p>
                    <p className="text-gray-700">{task.description}</p>
                    <p className="text-sm text-blue-600">Status: {task.status}</p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleMarkAsCompleted(task._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Mark as {task.status === 'Completed' ? 'Not Completed' : 'Completed'}
                    </button>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
