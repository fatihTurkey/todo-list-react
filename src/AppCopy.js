import React, { useEffect, useState } from "react"

function App() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos") ?? "[]")
  })
  const [name, setName] = useState("")
  const [editName, setEditName] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function handleFormSubmit(e) {
    e.preventDefault()
    if (!name) {
      return
    }
    const id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1

    setTodos([
      ...todos,
      {
        id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
        name: name,
        completed: false,
        editable: false,
      },
    ])
    setName("")
    console.log(todos)
  }

  function handleDeleteClick(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function completeTodo(id) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }
  function editTodo(id, name) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, editable: !todo.editable } : todo)))
    setEditName(name)
  }

  function saveTodo(id) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, editable: !todo.editable, name: editName } : todo)))
  }

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} className="form">
        <div className="input-wrap">
          <label htmlFor="name">Task Name</label>
          <input className="input" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Name" />
        </div>
        <div className="input-wrap">
          <input className="submit" type="submit" value="CREATE TASK" />
        </div>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className={todo.completed ? "completed" : ""} id={todo.id} key={todo.id}>
            {!todo.editable ? <span>{todo.name}</span> : <input className="input" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />}
            <button style={{ marginLeft: "auto", marginRight: "5px" }} onClick={() => handleDeleteClick(todo.id)} className="todo-delete">
              DELETE
            </button>
            <button onClick={() => completeTodo(todo.id)} className="todo-delete">
              comp
            </button>
            {!todo.editable && (
              <button onClick={() => editTodo(todo.id, todo.name)} className="todo-delete">
                EDIT
              </button>
            )}

            {todo.editable && (
              <button onClick={() => saveTodo(todo.id)} className="todo-delete">
                SAVE
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
