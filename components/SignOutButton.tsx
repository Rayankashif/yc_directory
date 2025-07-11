// components/SignOutButton.tsx
'use client'

import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer">
      <span>Logout</span>
    </button>
  )
}

export default SignOutButton
