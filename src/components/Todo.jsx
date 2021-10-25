import React from 'react'
import { motion } from 'framer-motion'

function Todo({ title, deleteTodo, markTodo, active }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      initial={{ x: -30 }}
      animate={{ x: 0 }}
      onDoubleClick={markTodo}
      className='todo'
    >
      {!active ? (
        <h1>{title}</h1>
      ) : (
        <h1>
          <del>{title}</del>
        </h1>
      )}
      <button onClick={deleteTodo}>Delete</button>
    </motion.div>
  )
}

export default Todo
