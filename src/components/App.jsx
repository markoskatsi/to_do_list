import { useState , useEffect} from 'react';
import '../css/App.css';
import TaskCard from './TaskCard.jsx';

function App() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todo-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleNewTaskToggle = () => {
    setIsAddingTask(!isAddingTask);
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, checked: false }]);
    setNewTask('');
    setIsAddingTask(false);
  };

  const handleDelete = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const handleChecked = (indexToCheck) => {
    setTasks(tasks.map((task, index) =>
      index === indexToCheck ? { ...task, checked: !task.checked } : task
    ));
  };

  const handleEdit = (indexToEdit, newText) => {
    setTasks(tasks.map((task, index) =>
      index === indexToEdit ? { ...task, text: newText } : task
    ));
  };

  return (
    <div className="container">
      <h1 className="todo-header">To Do List</h1>
        <button className="addTaskButton" onClick={handleNewTaskToggle}>
          {isAddingTask ? 'Cancel' : 'Add New Task'}
        </button>
    
        {isAddingTask && (
          <div className="task-input-container">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="new-task"
              placeholder="Enter a new task"
            />
            <button onClick={handleAddTask}>Save</button>
          </div>
        )}
    
        {tasks.map((task, index) => (
          <TaskCard 
            key={index}
            aim={task.text}
            isChecked={task.checked}
            onDelete={() => handleDelete(index)}
            onChecked={() => handleChecked(index)}
            onEdit={(newText) => handleEdit(index, newText)}
          />
        ))}
    </div>
  );
}

export default App;



