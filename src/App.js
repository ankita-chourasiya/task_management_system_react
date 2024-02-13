import React, { useState } from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';

function App() {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);

  return (
    <div className="App">
      <TaskList />
      {showCreateTaskForm && <CreateTask />}
    </div>
  );
}

export default App;
