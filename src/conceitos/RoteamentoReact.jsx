import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import Codigo from '../components/Codigo.jsx'
import Demo from '../components/Demo.jsx'
import { conceitos } from '../conceitos.js'

export default function RoteamentoReact() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navegar = useNavigate()

  return (
    <div className="secoes">
      <section>
        <h2>Por que precisamos de roteamento</h2>

        <p>
          Uma aplicação React pode ter várias telas. O roteamento associa caminhos da URL
          aos componentes exibidos, organiza a navegação e evita concentrar toda a lógica
          em um único componente.
        </p>

        <p>
          O <strong>React Router</strong> faz isso: associa URLs a componentes e permite
          navegar entre páginas sem recarregar todo o documento a cada clique.
        </p>

        <Codigo>{`import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="/sobre" element={<Sobre />} />
  </Routes>
</BrowserRouter>`}</Codigo>
      </section>

      <section>
        <h2>As rotas desta aplicação</h2>

        <p>
          O <code>BrowserRouter</code> envolve a aplicação em{' '}
          <code>src/main.jsx</code>; o <code>Routes</code> e os <code>Route</code> ficam em{' '}
          <code>src/App.jsx</code>. O <code>Layout</code> é uma{' '}
          <strong>rota aninhada</strong>: ele desenha o cabeçalho e o rodapé e usa{' '}
          <code>Outlet</code> para receber a página ativa.
        </p>

        <Codigo>{`<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/conceito/:id" element={<Conceito />} />
    <Route path="/sobre" element={<Sobre />} />
    <Route path="*" element={<NaoEncontrada />} />
  </Route>
</Routes>`}</Codigo>

        <table className="tabela">
          <thead>
            <tr>
              <th>Caminho</th>
              <th>O que exibe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>/</code>
              </td>
              <td>Início, com os cartões dos conceitos</td>
            </tr>
            <tr>
              <td>
                <code>/conceito/:id</code>
              </td>
              <td>A página do conceito indicado pelo parâmetro</td>
            </tr>
            <tr>
              <td>
                <code>/sobre</code>
              </td>
              <td>Informações sobre a entrega</td>
            </tr>
            <tr>
              <td>
                <code>*</code>
              </td>
              <td>Página 404, para qualquer caminho que não exista</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>1. Navegação com Link</h2>

        <p>
          O componente <code>Link</code> navega entre rotas e a propriedade{' '}
          <code>to</code> define o destino. É preferível a um link tradicional, porque não
          recarrega o documento. O <code>NavLink</code> faz o mesmo e ainda marca o item
          ativo — é o que o menu do topo usa.
        </p>

        <Codigo>{`import { Link, NavLink } from "react-router-dom";

<Link to="/sobre">Sobre o projeto</Link>

<NavLink to="/sobre">Sobre</NavLink> // recebe a classe "active"`}</Codigo>

        <Demo titulo="Links para os outros conceitos">
          <div className="linha">
            {conceitos
              .filter((conceito) => conceito.id !== id)
              .map((conceito) => (
                <NavLink
                  key={conceito.id}
                  to={`/conceito/${conceito.id}`}
                  className="botao-vazado"
                >
                  {conceito.titulo}
                </NavLink>
              ))}
          </div>
        </Demo>
      </section>

      <section>
        <h2>2. Parâmetros de rota com useParams</h2>

        <p>
          Parâmetros representam partes variáveis da URL e são úteis em páginas de
          detalhes. O <code>useParams()</code> dá acesso a esses valores. Esta própria
          página é um exemplo: existe um único <code>Route</code> para todos os cinco
          conceitos.
        </p>

        <Codigo>{`// Rota: /conceito/:id
const { id } = useParams();

const conceito = buscarConceito(id);`}</Codigo>

        <Demo titulo="Valores lidos da URL agora">
          <p className="placar">
            <span>
              <code>useParams().id</code>: <strong>{id}</strong>
            </span>

            <span>
              <code>useLocation().pathname</code>: <strong>{pathname}</strong>
            </span>
          </p>

          <p className="nota">
            Se a URL apontar para um id que não existe, a página mostra um aviso em vez de
            quebrar. Teste visitando <code>/conceito/inexistente</code>.
          </p>
        </Demo>
      </section>

      <section>
        <h2>3. Navegação por código com useNavigate</h2>

        <p>
          Quando a navegação acontece depois de uma ação — um envio de formulário, por
          exemplo — usamos o <code>useNavigate()</code> em vez de um link.
        </p>

        <Codigo>{`import { useNavigate } from "react-router-dom";

const navegar = useNavigate();

navegar("/sobre");   // vai para uma rota
navegar(-1);          // volta uma página no histórico`}</Codigo>

        <Demo titulo="Experimente">
          <div className="linha">
            <button type="button" className="botao" onClick={() => navegar('/sobre')}>
              Ir para /sobre
            </button>

            <button
              type="button"
              className="botao-vazado"
              onClick={() => navegar('/conceito/estado-que-nao-existe')}
            >
              Ir para uma rota inválida
            </button>

            <button type="button" className="botao-vazado" onClick={() => navegar(-1)}>
              Voltar
            </button>
          </div>
        </Demo>
      </section>

      <section>
        <h2>Conceitos fundamentais</h2>

        <ul>
          <li>
            <strong>Rota</strong> — regra que associa um caminho a uma interface.
          </li>
          <li>
            <strong>URL</strong> — endereço da página atual.
          </li>
          <li>
            <strong>Link</strong> — elemento para navegar entre rotas.
          </li>
          <li>
            <strong>Parâmetro</strong> — parte variável do caminho, como{' '}
            <code>:id</code>.
          </li>
          <li>
            <strong>Rota aninhada</strong> — rota organizada dentro de uma estrutura pai,
            como o <code>Layout</code> desta aplicação.
          </li>
        </ul>

        <p className="nota">
          Em hospedagens estáticas, é preciso redirecionar todos os caminhos para{' '}
          <code>index.html</code>, senão abrir <code>/conceito/router</code> direto no
          navegador devolve 404 do servidor. O arquivo <code>vercel.json</code> deste
          projeto faz esse redirecionamento.
        </p>

        <p>
          <Link to="/" className="botao">
            Voltar ao início
          </Link>
        </p>
      </section>
    </div>
  )
}
