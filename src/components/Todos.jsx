import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import { motion } from 'framer-motion'
import { db } from './firebase-config'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { auth } from './firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import '../styles/Todo.css'

function Todos() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState(false)
  const [todoData, setTodoData] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const collectionRef = collection(db, `user${currentUser?.uid}`)

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser)
  })

  useEffect(() => {
    getDocs(collectionRef).then((res) => {
      setTodoData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [collectionRef])

  async function getData() {
    try {
      const todosData = await getDocs(collectionRef)
      setTodoData(todosData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } catch (error) {
      console.log(error.message)
    }
  }

  async function postData() {
    try {
      await addDoc(collectionRef, { title: title, active: false })
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  function addTodo(e) {
    e.preventDefault()
    setText(false)
    if (!title) {
      setText(!text)
    } else if (todoData.length > 6) {
      setTitle('')
      return todoData
    } else {
      postData()
    }

    setTitle('')
  }

  async function deleteTodo(id) {
    try {
      const todoDoc = doc(db, `user${currentUser?.uid}`, id)
      await deleteDoc(todoDoc)
      getData()
    } catch (error) {
      console.log(error.message)
    }
  }

  async function markTodo(id, active) {
    try {
      const todoDoc = doc(db, `user${currentUser?.uid}`, id)
      await updateDoc(todoDoc, { active: !active })
      getData()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={currentUser ? 'todos' : 'todos-none'}>
      <h1>Logged in as {currentUser?.email}</h1>
      <form onSubmit={addTodo}>
        <input
          type='text'
          placeholder='Add todo...'
          maxLength='15'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <button type='submit'>Add</button>

        {text && (
          <motion.div initial={{ y: -30 }} animate={{ y: 0 }} exit={{ y: 30 }}>
            <h2>Title is required</h2>
          </motion.div>
        )}
      </form>

      {todoData.length > 0 ? (
        todoData.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            active={todo.active}
            deleteTodo={() => deleteTodo(todo.id)}
            markTodo={() => markTodo(todo.id, todo.active)}
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
