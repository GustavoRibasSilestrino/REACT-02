import { useEffect, useState } from 'react'
import Codigo from '../components/Codigo.jsx'
import Demo from '../components/Demo.jsx'

const API_PUBLICACOES = 'https://jsonplaceholder.typicode.com/posts?_limit=5'
const API_ESTADOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'

export default function ConsumoApis() {
  // --- GET: publicações ---
  const [publicacoes, setPublicacoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)

  // --- GET encadeado: estados e municípios do IBGE ---
  const [estados, setEstados] = useState([])
  const [uf, setUf] = useState('')
  const [municipios, setMunicipios] = useState([])
  const [carregandoMunicipios, setCarregandoMunicipios] = useState(false)

  // --- POST: nova publicação ---
  const [titulo, setTitulo] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [criada, setCriada] = useState(null)
  const [erroEnvio, setErroEnvio] = useState('')

  // O useEffect inicia a busca quando o componente é exibido.
  // A limpeza aborta a requisição se o componente sair da tela antes da resposta.
  useEffect(() => {
    const controlador = new AbortController()

    async function carregar() {
      setCarregando(true)
      setErro('')

      try {
        const resposta = await fetch(API_PUBLICACOES, { signal: controlador.signal })

        // Verificar response.ok identifica erros HTTP, que não viram exceção sozinhos.
        if (!resposta.ok) {
          throw new Error(`A API respondeu com o status ${resposta.status}.`)
        }

        const dados = await resposta.json()
        setPublicacoes(dados)
      } catch (erroRecebido) {
        if (erroRecebido.name !== 'AbortError') {
          setErro(erroRecebido.message || 'Falha ao consultar a API.')
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    carregar()

    return () => controlador.abort()
  }, [tentativa])

  // Estados do IBGE: buscados uma única vez, na montagem.
  useEffect(() => {
    const controlador = new AbortController()

    async function carregar() {
      try {
        const resposta = await fetch(API_ESTADOS, { signal: controlador.signal })

        if (!resposta.ok) {
          return
        }

        setEstados(await resposta.json())
      } catch {
        // A demonstração seguinte apenas fica vazia se a API não responder.
      }
    }

    carregar()

    return () => controlador.abort()
  }, [])

  // Municípios: a dependência [uf] faz o efeito rodar de novo a cada troca de estado.
  useEffect(() => {
    if (!uf) {
      return
    }

    const controlador = new AbortController()

    async function carregar() {
      setCarregandoMunicipios(true)

      try {
        const resposta = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
          { signal: controlador.signal },
        )

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os municípios.')
        }

        setMunicipios(await resposta.json())
      } catch (erroRecebido) {
        if (erroRecebido.name !== 'AbortError') {
          setMunicipios([])
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCarregandoMunicipios(false)
        }
      }
    }

    carregar()

    return () => controlador.abort()
  }, [uf])

  async function enviarPublicacao(evento) {
    evento.preventDefault()

    if (titulo.trim().length < 3) {
      setErroEnvio('Escreva um título com pelo menos 3 caracteres.')
      return
    }

    setErroEnvio('')
    setEnviando(true)
    setCriada(null)

    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titulo,
          body: 'Enviado pelo Projeto React 02',
          userId: 1,
        }),
      })

      if (!resposta.ok) {
        throw new Error(`A API respondeu com o status ${resposta.status}.`)
      }

      setCriada(await resposta.json())
      setTitulo('')
    } catch (erroRecebido) {
      setErroEnvio(erroRecebido.message || 'Falha ao enviar os dados.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="secoes">
      <section>
        <h2>O que é uma API</h2>

        <p>
          Uma <strong>API</strong> permite a comunicação entre sistemas. Em aplicações
          React, ela possibilita buscar e enviar dados para serviços externos — produtos,
          usuários, publicações, indicadores.
        </p>

        <p>
          O <code>fetch()</code> realiza a requisição. A resposta é assíncrona, então
          precisamos aguardá-la; <code>resposta.json()</code> interpreta os dados e{' '}
          <code>resposta.ok</code> identifica erros HTTP.
        </p>

        <Codigo>{`const resposta = await fetch(url);

if (!resposta.ok) {
  throw new Error("Erro na consulta");
}

const dados = await resposta.json();`}</Codigo>
      </section>

      <section>
        <h2>1. GET — publicações da API</h2>

        <p>
          O <code>useEffect</code> inicia a busca quando o componente é exibido e o{' '}
          <code>useState</code> guarda os dados recebidos. A interface precisa prever
          quatro situações: carregando, sucesso, erro e lista vazia.
        </p>

        <Codigo>{`useEffect(() => {
  const controlador = new AbortController();

  async function carregar() {
    try {
      const resposta = await fetch(url, { signal: controlador.signal });

      if (!resposta.ok) throw new Error("Erro na consulta");

      setPublicacoes(await resposta.json());
    } catch (erro) {
      if (erro.name !== "AbortError") setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  carregar();

  return () => controlador.abort();
}, [tentativa]);`}</Codigo>

        <Demo titulo="JSONPlaceholder · 5 publicações">
          <button
            type="button"
            className="botao"
            onClick={() => setTentativa((valor) => valor + 1)}
            disabled={carregando}
          >
            {carregando ? 'Carregando…' : 'Buscar novamente'}
          </button>

          {carregando && <output>Carregando publicações…</output>}

          {!carregando && erro && (
            <p className="mensagem-erro" role="alert">
              {erro}
            </p>
          )}

          {!carregando && !erro && publicacoes.length === 0 && (
            <p className="nota">Nenhuma publicação encontrada.</p>
          )}

          {!carregando && !erro && publicacoes.length > 0 && (
            <ul className="lista-cartoes">
              {publicacoes.map((publicacao) => (
                <li key={publicacao.id}>
                  <strong>
                    {publicacao.id}. {publicacao.title}
                  </strong>
                  <p>{publicacao.body}</p>
                </li>
              ))}
            </ul>
          )}
        </Demo>
      </section>

      <section>
        <h2>2. Dependências corretas no useEffect</h2>

        <p>
          Esta busca depende do estado escolhido. Com <code>[uf]</code> na lista de
          dependências, o efeito roda de novo só quando a UF muda — nem a cada
          renderização, nem nunca mais.
        </p>

        <Codigo>{`useEffect(() => {
  if (!uf) return;

  // Busca os municípios da UF selecionada.
}, [uf]);`}</Codigo>

        <Demo titulo="IBGE · estados e municípios">
          <div className="campo">
            <label htmlFor="uf">Estado</label>
            <select
              id="uf"
              value={uf}
              onChange={(evento) => {
                // A lista antiga é descartada no evento, nao dentro do efeito.
                setMunicipios([])
                setUf(evento.target.value)
              }}
            >
              <option value="">Selecione um estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </div>

          {carregandoMunicipios && <output>Carregando municípios…</output>}

          {!carregandoMunicipios && uf && (
            <p className="placar">
              <span>
                UF: <strong>{uf}</strong>
              </span>

              <span>
                Municípios: <strong>{municipios.length}</strong>
              </span>
            </p>
          )}

          {!carregandoMunicipios && municipios.length > 0 && (
            <ul className="lista-selos">
              {municipios.slice(0, 24).map((municipio) => (
                <li key={municipio.id}>{municipio.nome}</li>
              ))}
            </ul>
          )}

          {!carregandoMunicipios && municipios.length > 24 && (
            <p className="nota">
              Exibindo os 24 primeiros de {municipios.length} municípios.
            </p>
          )}
        </Demo>
      </section>

      <section>
        <h2>3. POST — enviando dados</h2>

        <p>
          O método <code>POST</code> envia informações para a API. O cabeçalho{' '}
          <code>headers</code> informa o formato do conteúdo e{' '}
          <code>JSON.stringify()</code> transforma o objeto JavaScript em JSON.
        </p>

        <Codigo>{`await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Aprendendo React" }),
});`}</Codigo>

        <Demo titulo="Criar uma publicação">
          <form className="formulario" onSubmit={enviarPublicacao} noValidate>
            <div className="campo">
              <label htmlFor="titulo">Título da publicação</label>
              <input
                id="titulo"
                value={titulo}
                onChange={(evento) => setTitulo(evento.target.value)}
                placeholder="Aprendendo React"
              />
            </div>

            {erroEnvio && (
              <p className="mensagem-erro" role="alert">
                {erroEnvio}
              </p>
            )}

            <button type="submit" className="botao" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar com POST'}
            </button>
          </form>

          {criada && (
            <>
              <output>
                A API respondeu com o id <strong>{criada.id}</strong>.
              </output>

              <Codigo>{JSON.stringify(criada, null, 2)}</Codigo>
            </>
          )}

          <p className="nota">
            O JSONPlaceholder é uma API de testes: ela confirma o envio e devolve o
            registro criado, mas não o guarda de verdade.
          </p>
        </Demo>
      </section>

      <section>
        <h2>Erros e cuidados</h2>

        <ul>
          <li>
            Trate erros de rede e verifique o status HTTP com <code>resposta.ok</code>.
          </li>
          <li>Preveja carregamento, estado vazio e indisponibilidade do serviço.</li>
          <li>Evite requisições repetidas por dependências incorretas no useEffect.</li>
          <li>Não exponha chaves secretas no código que roda no navegador.</li>
          <li>Respeite autenticação, limites de uso e políticas de CORS.</li>
        </ul>

        <p className="nota">
          As duas demonstrações desta página dependem de conexão com a internet e da
          disponibilidade das APIs públicas usadas.
        </p>
      </section>
    </div>
  )
}
