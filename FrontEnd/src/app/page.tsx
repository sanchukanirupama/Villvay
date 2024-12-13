import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">VILLVAY ASSESSMENT</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </main>
  )
}

