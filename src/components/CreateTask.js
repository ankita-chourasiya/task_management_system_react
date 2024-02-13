import React, { useState } from 'react';

function CreateTask() {
  const initialFormData = {
    title: '',
    description: '',
    status: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://task-management-system-prsv.onrender.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          status: formData.status
        })
      });
      if (response.ok) {
        console.log('Task created successfully!');
      } else {
        console.error('Failed to create task:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
    setFormData(initialFormData);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ position: "absolute", left: "39%", border: "1px solid", padding: "60px" }}>
          <div>
            <label>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleChange} style={{ marginLeft: "57px" }} />
            </label>
          </div>
          <br />
          <div>
            <label>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleChange} style={{ marginLeft: "6px" }} />
            </label>
          </div>
          <br />
          <div>
            <label>
              Status:
              <input type="text" name="status" value={formData.status} onChange={handleChange} style={{ marginLeft: "45px" }} />
            </label>
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ padding: "6px 10px" }}>Create Task</button>
          </div>
        </div>

      </form>
    </div>
  );
}

export default CreateTask;

