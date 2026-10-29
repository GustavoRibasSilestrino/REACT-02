import { Link, useParams } from 'react-router-dom'
import { buscarConceito, conceitos } from '../conceitos.js'
import useTituloDaAba from '../hooks/useTituloDaAba.js'

// useParams() lê a parte variável da URL definida em /conceito/:id.
export default function Conceito() {
  const { id } = useParams()
  const conceito = buscarConceito(id)

  useTituloDaAba(conceito ? conceito.titulo : 'Conceito não encontrado')

  // Renderização condicional: a URL pode apontar para um id que não existe.
  if (!conceito) {
    return (
      <section className="aviso">
        <h1>Conceito não encontrado</h1>

        <p>
          Não existe nenhum conceito com o identificador <code>{id}</code>.
        </p>

        <Link to="/" className="botao">
          Voltar ao início
        </Link>
      </section>
    )
  }

  const posicao = conceitos.findIndex((item) => item.id === conceito.id)
  const anterior = conceitos[posicao - 1]
  const proximo = conceitos[posicao + 1]

  const { Componente } = conceito

  return (
    <article className="conceito">
      <header className="conceito-topo">
        <p className="etiqueta">
          Conceito {conceito.numero} de {String(conceitos.length).padStart(2, '0')}
        </p>

        <h1>{conceito.titulo}</h1>

        <p className="conceito-resumo">{conceito.resumo}</p>

        <p className="conceito-url">
          URL desta página: <code>/conceito/{conceito.id}</code>
        </p>
      </header>

      <Componente />

      <nav className="paginacao" aria-label="Navegar entre conceitos">
        {anterior ? (
          <Link to={`/conceito/${anterior.id}`} className="botao-vazado">
            ← {anterior.titulo}
          </Link>
        ) : (
          <Link to="/" className="botao-vazado">
            ← Início
          </Link>
        )}

        {proximo && (
          <Link to={`/conceito/${proximo.id}`} className="botao-vazado">
            {proximo.titulo} →
          </Link>
        )}
      </nav>
    </article>
  )
}
