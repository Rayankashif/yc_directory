'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

const SearchFormReset = () => {
  const router = useRouter()

  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement
    if (form) form.reset()

    // Clear query string in URL
    router.push('/')
  }

  return (
    <button type="button" className="search-btn text-white cursor-pointer" onClick={reset}>
      <X className="size-5" />
    </button>
  )
}

export default SearchFormReset
