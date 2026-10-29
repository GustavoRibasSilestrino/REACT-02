import { Link, useLocation } from 'react-router-dom'
import useTituloDaAba from '../hooks/useTituloDaAba.js'

// A rota "*" recebe qualquer caminho que nenhuma outra rota atendeu.
export default function NaoEncontrada() {
  const { pathname } = useLocation()

  useTituloDaAba('Página não encontrada')

  return (
    <section className="aviso">
      <p className="etiqueta">Erro 404</p>

      <h1>Esta página não existe</h1>

      <p>
        O caminho <code>{pathname}</code> não corresponde a nenhuma rota desta aplicação.
      </p>

      <Link to="/" className="botao">
        Voltar ao início
      </Link>
    </section>
  )
}
