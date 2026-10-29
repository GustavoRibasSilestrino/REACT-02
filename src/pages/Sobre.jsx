import { Link } from 'react-router-dom'
import { conceitos } from '../conceitos.js'
import useTituloDaAba from '../hooks/useTituloDaAba.js'

export default function Sobre() {
  useTituloDaAba('Sobre')

  return (
    <section className="prosa">
      <p className="etiqueta">Sobre</p>

      <h1>Sobre esta aplicação</h1>

      <p>
        Esta é a entrega da atividade da <strong>Aula 09 — Projeto React 02</strong> da
        disciplina de Frameworks Front-end do SENAI, ministrada pelo Prof. Me. Deivison S.
        Takatu.
      </p>

      <p>
        A atividade pede uma aplicação React que utilize todos os conceitos estudados na
        aula. Em vez de esconder os conceitos dentro de um produto, a aplicação os coloca
        em primeiro plano: cada conceito tem a sua própria página, com a explicação, o
        código correspondente e uma demonstração que o professor pode usar na tela.
      </p>

      <h2>Conceitos e onde estão</h2>

      <ul className="lista-links">
        {conceitos.map((conceito) => (
          <li key={conceito.id}>
            <Link to={`/conceito/${conceito.id}`}>{conceito.titulo}</Link> — {conceito.resumo}
          </li>
        ))}
      </ul>

      <h2>Tecnologias</h2>

      <ul>
        <li>React 19</li>
        <li>React Router 7</li>
        <li>Vite</li>
        <li>CSS puro, com tema claro e escuro automático</li>
      </ul>

      <h2>APIs públicas consumidas</h2>

      <ul>
        <li>
          <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noreferrer">
            JSONPlaceholder
          </a>{' '}
          — publicações de exemplo, para o GET e o POST
        </li>
        <li>
          <a
            href="https://servicodados.ibge.gov.br/api/docs/localidades"
            target="_blank"
            rel="noreferrer"
          >
            IBGE — Localidades
          </a>{' '}
          — estados e municípios, para a busca encadeada
        </li>
      </ul>

      <h2>Autor</h2>

      <p>
        Gustavo Ribas Silestrino —{' '}
        <a href="https://github.com/GustavoRibasSilestrino" target="_blank" rel="noreferrer">
          github.com/GustavoRibasSilestrino
        </a>
      </p>
    </section>
  )
}
