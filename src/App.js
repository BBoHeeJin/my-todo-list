import './App.css';
import { useState, useEffect, useRef } from 'react';
import './index.css'

const FILTER_MAP = {
  All: () => true,
  Done: (task) => task.completed,
  Active: (task) => !task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function saveDoc(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const initialTasks = JSON.parse(localStorage.getItem("tasks") || "[]" );

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(name) {
    const newTask = { id: Date.now(), name };

    const updatedTasks = ([...tasks, newTask]);

    saveDoc(updatedTasks);

    setTasks(updatedTasks);

    // console.log(tasks);
  }

  function deleteTask(id) {};

  function editTask(id, newName) {};

  function toggleTaskCompleted(id) {};

  const taskList = tasks.map(task => (
    // 컴포넌트 재사용
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      // completed={task.completed}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
    />
  ))
  

  return (
    <div className="max-w-sm mx-auto mt-8 border p-8 bg-white">
      <h1 className="text-2xl font-semibold mb-4">
        Todo &#128526;
      </h1>

      <Form addTask={addTask} />

      <ul>
        {taskList}
      </ul>

    </div>
  )
};

// 폼 제출처리
function Form({ addTask }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addTask(name);
    setName("");

    addTask(name)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input 
          className="w-full border p-2 mb-2"
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <button 
          className="border disabled:opacity-50 p-2 mb-2 bg-indigo-500 text-white font-semibold"
          type="submit"
        >
        Add
      </button>
      </div>
    </form>
  )
}

// 투두 리스트 제출 처리
function Todo({
  id,
  name,
  // completed,
  deleteTask,
  toggleTaskCompleted,
  // editTask
}) {
  
  const [isEditing, setIsEditing] = useState(false);

  // const [newName, setNewName] = useState(name);

  // const inputEl = useRef(null);

  const viewTemplate = (
    <>
      <div className="flex mb-2">
        <label>
          <input
            type="text"
            className="peer hidden"
            onChange={() => toggleTaskCompleted(id)}
          />
          <span className="text-xl peer-checked:line-through">
            {name}
          </span>
        </label>
      </div>
      <div className="flex flex-nowrap gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="border-2 font-semibold px-2 py-1 w-full mb-2"
        >
          edit
        </button>
        <button
          className="px-2 py-1 w-full mb-2 bg-red-500 text-white font-semibold"
          onClick={() => deleteTask(id)}
        >
          delete
        </button>
      </div>
    </>
  )

  const editingTemplate = (
    <>
      Editing Template
     </>
  )

  return (
    <li className="mb-4">
      {isEditing? editingTemplate : viewTemplate}
    </li>
  )
}
