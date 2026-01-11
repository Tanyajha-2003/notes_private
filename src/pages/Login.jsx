// import { useState } from 'react'
// import { supabase } from '../supabase'

// export default function Login() {
//   const [isSignup, setIsSignup] = useState(false)

//   const handleAuth = async (e) => {
//     e.preventDefault()
//     const email = e.target.email.value
//     const password = e.target.password.value

//     const { error } = isSignup
//       ? await supabase.auth.signUp({ email, password })
//       : await supabase.auth.signInWithPassword({ email, password })

//     if (error) alert(error.message)
//   }

//   return (
//     <div className="center">
//       <h1>🔐 Private Notes Vault</h1>

//       <form onSubmit={handleAuth}>
//         <input name="email" placeholder="Email" required />
//         <input name="password" type="password" placeholder="Password" required />
//         <button>{isSignup ? 'Sign Up' : 'Login'}</button>
//       </form>

//       <button
//         onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
//       >
//         Continue with Google
//       </button>

//       <p
//         style={{ cursor: 'pointer', marginTop: '10px', opacity: 0.8 }}
//         onClick={() => setIsSignup(!isSignup)}
//       >
//         {isSignup
//           ? 'Already have an account? Login'
//           : "Don't have an account? Sign up"}
//       </p>
//     </div>
//   )
// }
import { useState } from 'react'
import { supabase } from '../supabase'

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) alert(error.message)
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Private Notes Vault</h1>
        <p className="auth-subtitle">
          {isSignup
            ? 'Create a private account'
            : 'Login to your private space'}
        </p>

        <form onSubmit={handleAuth} className="auth-form">
          <input name="email" placeholder="Email address" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button className="primary-btn">
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button
          className="google-btn"
          onClick={() =>
            supabase.auth.signInWithOAuth({ provider: 'google' })
          }
        >
          Continue with Google
        </button>

        <p
          className="auth-toggle"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign up"}
        </p>
      </div>
    </div>
  )
}
