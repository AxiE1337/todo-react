import React, { useState } from 'react'
import { auth } from './firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import '../styles/Login.css'

function Login() {
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPass, setSignUpPass] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPass, setSignInPass] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState('')
  const [isRegistered, setIsRegistered] = useState(true)

  onAuthStateChanged(auth, (state) => {
    setIsLoggedIn(state)
  })

  function registered() {
    setIsRegistered(!isRegistered)
  }

  async function signUpFunction(e) {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPass)
    } catch (err) {
      console.log(err.message)
    }
  }

  async function signInFunction(e) {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPass)
    } catch (err) {
      console.log(err.message)
    }
  }

  async function sighOutFunction() {
    await signOut(auth)
  }

  return (
    <div className={!isLoggedIn ? 'log-in' : 'log-out'}>
      {isLoggedIn && <button onClick={sighOutFunction}>Log out</button>}
      {!isRegistered && (
        <div className='forms'>
          <h1>Create a new account</h1>
          <form onSubmit={signUpFunction}>
            <input
              type='email'
              placeholder='email...'
              onChange={(e) => {
                setSignUpEmail(e.target.value)
              }}
            />

            <input
              type='password'
              placeholder='password...'
              onChange={(e) => {
                setSignUpPass(e.target.value)
              }}
            />
            <button type='submit'>Sigh up</button>
            <button onClick={registered}>Have an account?</button>
          </form>
        </div>
      )}
      {isRegistered && (
        <div className='forms'>
          <h1>Log in</h1>
          <form onSubmit={signInFunction}>
            <input
              id='email'
              type='email'
              placeholder='email...'
              onChange={(e) => {
                setSignInEmail(e.target.value)
              }}
            />

            <input
              type='password'
              placeholder='password...'
              onChange={(e) => {
                setSignInPass(e.target.value)
              }}
            />
            <button type='submit'>Log in</button>
            <button onClick={registered}>Create an account</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Login
