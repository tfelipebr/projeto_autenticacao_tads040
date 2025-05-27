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

/*
O Axios, por padrão, considera **qualquer resposta fora do intervalo 2xx** como um erro e “joga” essa resposta direto no `catch()`. 
Ou seja, sem o `validateStatus` você só cai no `then` quando recebe `200 OK`, `201 Created` etc., e qualquer outro status 
(inclusive `400`, `401`, `404`) vai imediatamente para o `catch`, como se fosse “falha de conexão”.

Ao usar:

validateStatus: status => status < 500

você está dizendo ao Axios:

“Me traz a resposta sempre que o status for menor que 500 (todos os 1xx, 2xx, 3xx e 4xx), e só rejeita/promove erro de rede quando 
for um status `>=500` (ou algum problema de transporte).”

Por que isso é importante?

1. **4xx são *client errors***

   * `400 Bad Request`
   * `401 Unauthorized`
   * `403 Forbidden`
   * `404 Not Found`
   * etc.

   Esses códigos geralmente significam “o cliente (seu front) enviou algo errado” ou “você não está autorizado” — mas **o servidor respondeu normalmente**, com um JSON dizendo `sucesso: false` e uma `mensagem`. Você quer pegar esse JSON, extrair a mensagem e mostrá-la para o usuário, não tratá-lo como “Erro na conexão com o servidor”.

2. **5xx são *server errors***

   * `500 Internal Server Error`
   * `502 Bad Gateway`
   * `503 Service Unavailable`
   * etc.

   Esses sim você geralmente quer que caiam no `catch`, porque indicam problema no back-end ou na infraestrutura, e aí talvez mostre uma mensagem genérica de “Servidor indisponível”.

### Fluxo com `validateStatus`:

* **Status < 500** -> cai no `then`

  * Se `data.sucesso === false` → exibe `data.mensagem` (por ex. “Credenciais inválidas”)
  * Se `data.sucesso === true` → faz o redirecionamento

* **Status ≥ 500** ou **erro de rede** -> cai no `catch`

  * Trate como “Erro na conexão com o servidor” ou “Servidor fora do ar”.

Dessa forma, você distingue corretamente **erros de validação/autenticação** (4xx) de **erros do servidor** (5xx).
*/
