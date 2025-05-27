import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import styles from '../styles/Login.module.css'

export default function Login() {
  const [nomeUsuario, setNomeUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // limpa erro antigo

    try {
      // força o axios a não lançar para status < 500
      const { data } = await axios.post(
        'http://localhost:8080/api/auth/login',
        { nomeUsuario, senha },
        { validateStatus: status => status < 500 }
      )

      if (data.sucesso) {
        router.push(`/welcome?user=${encodeURIComponent(nomeUsuario)}`)
      } else {
        // backend retornou sucesso=false
        setError(data.mensagem)
      }

    } catch (err) {
      // cai aqui só se status >= 500 ou erro de rede
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ mensagem: string }>
        if (axiosErr.response?.data?.mensagem) {
          // usa a mensagem do backend mesmo em erro 500
          setError(axiosErr.response.data.mensagem)
        } else {
          setError('Erro na conexão com o servidor')
        }
      } else {
        setError('Erro inesperado')
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Usuário"
          value={nomeUsuario}
          onChange={e => setNomeUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
