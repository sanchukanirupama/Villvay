'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthResponse, signIn } from '@/api/auth'
import { toast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data: AuthResponse = await signIn(email, password)
      if (data.status) {
        debugger
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('userRole', data.data.role)
        localStorage.setItem('email', data.data.email)
        toast({
          title: 'Login successful',
          description: `Welcome, ${data.data.role}!`,
        })
        switch (data.data.role) {
          case 'ADMIN':
            router.push('/admin/home')
            break
          case 'USER':
            router.push('/user/home')
            break
          case 'GUEST':
            router.push('/guest/home')
            break
          default:
            throw new Error('Invalid role')
        }
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  )
}

