import React, { useEffect, useState } from "react"

function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos") ?? "[]"))

  const [name, setName] = useState("")
  const [editName, setEditName] = useState("")
  const [validation, setValidation] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function handleFormSubmit(e) {
    e.preventDefault()
    if (name.length < 2) {
      setValidation("Please Enter a task name")
      return
    }
    setTodos([
      ...todos,
      {
        id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
        name: name,
        isCompleted: false,
        isEditable: false,
      },
    ])
    setName("")
    setValidation("")
  }

  function editTodo(id, name) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isEditable: !todo.isEditable } : todo)))
    setEditName(name)
  }
  function saveTodo(id) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isEditable: false, name: editName } : todo)))
  }

  function completeTodo(id) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)))
  }

  function handleDeleteClick(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const completedTodos = todos.filter((todo) => todo.isCompleted === true)
  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} className="form">
        <div className="input-wrap">
          <label htmlFor="name">Task Name</label>
          <input className="input" type="text" placeholder="Task Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-wrap">
          <p className="validation">{validation}</p>
        </div>
        <div className="input-wrap">
          <input type="submit" value="Create Task" className="submit" />
        </div>
      </form>
      <p className="p-2">
        Total Todos : {todos.length} | Completed Todos : {completedTodos.length}
      </p>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className={todo.isCompleted ? "completed" : ""} key={todo.id}>
            {!todo.isEditable && <span onDoubleClick={() => editTodo(todo.id, todo.name)}> {todo.name} </span>}
            {todo.isEditable && <input className="input" type="text" placeholder="Task Name" id="name" value={editName} onChange={(e) => setEditName(e.target.value)} />}

            {!todo.isEditable && (
              <button onClick={() => editTodo(todo.id, todo.name)} className="delete-todo">
                EDIT
              </button>
            )}
            {todo.isEditable && (
              <button onClick={() => saveTodo(todo.id)} className="delete-todo">
                SAVE
              </button>
            )}
            <button onClick={() => completeTodo(todo.id)} className="delete-todo">
              COMP
            </button>
            <button onClick={() => handleDeleteClick(todo.id)} className="delete-todo">
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
