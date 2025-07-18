// components/SignInButton.tsx
'use client'

import { signIn } from 'next-auth/react'

const SignInButton = () => {
  return (
    <button onClick={() => signIn('github',{ callbackUrl: "/"})} className="cursor-pointer">
      Login
    </button>
  )
}

export default SignInButton
