'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import RoleHome from '../../../../components/RoleHome'

export default function GuestHome() {
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== 'GUEST') {
      router.push('/login')
    } else {
      setAuthorized(true)
    }
  }, [router])

  if (!authorized) {
    return <div>Loading...</div>
  }

  return <RoleHome role="GUEST" />
}
