import React, { useState } from 'react'
import Todo from './Todo'
import { motion } from 'framer-motion'
import '../styles/Todo.css'

function Todos() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState(false)
  const [todoData, setTodoData] = useState([])
  function addTodo(e) {
    e.preventDefault()
    setText(false)
    if (!title) {
      setText(!text)
    } else {
      const newTodo = {
        title,
        active: false,
        id: Date.now(),
      }
      setTodoData([...todoData, newTodo])
    }

    setTitle('')
  }

  function deleteTodo(id) {
    setTodoData(todoData.filter((todo) => todo.id !== id))
  }

  function markTodo(id) {
    setTodoData(
      todoData.map((todo) =>
        todo.id === id ? { ...todo, active: !todo.active } : todo
      )
    )
  }

  return (
    <div className='todos'>
      <form onSubmit={addTodo}>
        <input
          type='text'
          placeholder='Add todo'
          maxLength='15'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <button type='submit'>Submit</button>

        {text && (
          <motion.div initial={{ y: -30 }} animate={{ y: 0 }} exit={{ y: 30 }}>
            <h2>Title is required</h2>
          </motion.div>
        )}
      </form>

      {todoData.length > 0 ? (
        todoData.map((post) => (
          <Todo
            key={post.id}
            title={post.title}
            active={post.active}
            deleteTodo={() => deleteTodo(post.id)}
            markTodo={() => markTodo(post.id)}
          />
        ))
      ) : (
        <motion.div initial={{ y: -30 }} animate={{ y: 0 }}>
          <h1>There is no todos, add some.</h1>
        </motion.div>
      )}
    </div>
  )
}

export default Todos
