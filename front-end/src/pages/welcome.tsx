import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Welcome() {
  const router = useRouter()
  const { user } = router.query
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (typeof user === 'string') setUsername(user)
  }, [user])

  if (!username) return null

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Bem‑vindo, {username}!</h1>
      <p>Login realizado com sucesso.</p>
    </div>
  )
}