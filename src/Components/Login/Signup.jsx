import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../Firebase'
import './Signup.css'

const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

  const handleSignup = async () => {
    if (!email || !password || !day || !month || !year || !fullName) {
      setError('Fill in all fields')
      return
    }
    if (password.length < 6) {
      setError('Password needs 6+ characters')
      return
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: fullName })
      navigate('/homePage')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use')
      } else if (err.code === 'auth/invalid-email') {
        setError('Enter a valid email address')
      } else {
        setError('Could not create account')
      }
    }
  }

  return (
    <div className='signup-page'>
      <div className='signup-box'>
        <button className='signup-back' onClick={() => navigate('/')}>&lt;</button>
        <h1 className='signup-title'>Get started on Instagram</h1>
        <p className='signup-sub'>Sign up to see photos and videos from your friends.</p>

        <label className='signup-label'>Email address</label>
        <input
          type='email'
          className='signup-input'
          placeholder='Email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='signup-note'>You may receive notifications from us.</p>

        <label className='signup-label'>Password</label>
        <input
          type='password'
          className='signup-input'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className='signup-label'>Date of birth</label>
        <div className='signup-dob'>
          <select className='signup-select' value={day} onChange={(e) => setDay(e.target.value)}>
            <option value=''>Day</option>
            {days.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className='signup-select' value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value=''>Month</option>
            {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
          <select className='signup-select' value={year} onChange={(e) => setYear(e.target.value)}>
            <option value=''>Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <label className='signup-label'>Name</label>
        <input
          type='text'
          className='signup-input'
          placeholder='Full name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {error && <p className='signup-error'>{error}</p>}

        <button className='signup-btn' onClick={handleSignup}>Sign up</button>
        <button className='signup-login' onClick={() => navigate('/')}>Have an account? Log in</button>
      </div>
    </div>
  )
}

export default Signup