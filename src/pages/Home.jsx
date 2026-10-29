import { Link } from 'react-router-dom'
import { conceitos } from '../conceitos.js'
import useTituloDaAba from '../hooks/useTituloDaAba.js'

export default function Home() {
  useTituloDaAba('Início')

  return (
    <>
      <section className="hero">
        <p className="etiqueta">Aula 09 · Projeto React 02</p>

        <h1>Os cinco conceitos da aula, em uma aplicação só.</h1>

        <p className="hero-texto">
          Cada cartão abre uma página com a explicação, o código e um exemplo que
          funciona de verdade. A navegação é feita pelo <strong>React Router</strong>, então
          a URL muda junto com a página.
        </p>
      </section>

      <section className="grade" aria-label="Conceitos estudados">
        {conceitos.map(({ id, numero, titulo, resumo }) => (
          <Link key={id} to={`/conceito/${id}`} className="cartao">
            <span className="numero">{numero}</span>

            <h2>{titulo}</h2>

            <p>{resumo}</p>

            <span className="cartao-acao">
              Abrir conceito <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>
    </>
  )
}
