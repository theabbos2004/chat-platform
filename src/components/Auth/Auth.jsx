import React, { useState } from 'react'
import { SignInForm , SignUpForm } from '../shared'

export default function Auth() {
  let [isSignUp, setIsSignUp] = useState(false)
  return (
    <section className='w-100 min-vh-100 d-flex align-items-center justify-content-center'>
      {isSignUp ?
        <SignUpForm setIsSignUp={setIsSignUp} /> :
        <SignInForm setIsSignUp={setIsSignUp} />
      }
    </section>
  )
}
