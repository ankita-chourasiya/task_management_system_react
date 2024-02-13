import React, { useState, useEffect } from 'react';
import './TaskList.css';
import 'tailwindcss/tailwind.css';
import CreateTask from './CreateTask';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetch('https://task-management-system-prsv.onrender.com/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleCreateTask = (e) => {
    e.preventDefault();
    setShowComponent(true);
  };

  const handleEditClick = (task) => {
    setEditedTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditStatus(task.status);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    fetch(`https://task-management-system-prsv.onrender.com/tasks/${editedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editedTitle,
        description: editedDescription,
        status: editStatus,
      }),
    })
      .then(response => response.json())
      .then(updatedTask => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      })
      .catch(error => console.error('Error saving task:', error));

    setIsEditing(false);
    setEditedTask({});
    setEditedTitle('');
    setEditedDescription('');
    setEditStatus('');
  };

  const handleDeleteClick = (taskId) => {
    fetch(`https://task-management-system-prsv.onrender.com/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  }

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (statusFilter === 'All') {
      return true;
    } else {
      return task.status === statusFilter;
    }
  });

  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>Task List</h1>
        <div style={{ float: "right", margin: "10px 30px" }}>
          <button onClick={(e) => handleCreateTask(e)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" style={{ padding: "10px", margin: "0px 24px" }}
          >
            Create
          </button>
          <select value={statusFilter} onChange={handleFilterChange} className="border border-gray-300 rounded-md px-2 py-1" style={{ padding: "10px" }}>
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="Done">Done</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>
      {
        !showComponent ? <table className="task-table mt-4" style={{ width: "97%", margin: "auto" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td>{isEditing && editedTask.id === task.id ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : task.title}</td>
                <td>{isEditing && editedTask.id === task.id ? <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} /> : task.description}</td>
                <td>{isEditing && editedTask.id === task.id ? <input type="text" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} /> : task.status}</td>
                <td onClick={() => isEditing && editedTask.id === task.id ? handleSaveClick() : handleEditClick(task)}>{isEditing && editedTask.id === task.id ? 'Save' : 'Edit'}</td>
                <td onClick={() => handleDeleteClick(task.id)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
          : <CreateTask />
      }
    </div >
  );
}

export default TaskList;
