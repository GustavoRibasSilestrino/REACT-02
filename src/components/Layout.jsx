import { NavLink, Outlet } from 'react-router-dom'
import { conceitos } from '../conceitos.js'

// Layout é a rota pai: o cabeçalho e o rodapé ficam fixos e o Outlet
// recebe a página da rota filha que estiver ativa.
export default function Layout() {
  return (
    <div className="app">
      <header className="topo">
        <NavLink to="/" className="marca">
          <span className="marca-icone" aria-hidden="true">
            ⚛
          </span>
          <span>
            <strong>Projeto React 02</strong>
            <small>Frameworks Front-end · SENAI</small>
          </span>
        </NavLink>

        <nav className="menu" aria-label="Conceitos">
          <NavLink to="/" end>
            Início
          </NavLink>

          {conceitos.map((conceito) => (
            <NavLink key={conceito.id} to={`/conceito/${conceito.id}`}>
              {conceito.titulo}
            </NavLink>
          ))}

          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </header>

      <main className="conteudo">
        <Outlet />
      </main>

      <footer className="rodape">
        <p>
          Gustavo Ribas Silestrino · Aula 09 — Projeto React 02 · Prof. Me. Deivison S.
          Takatu
        </p>
      </footer>
    </div>
  )
}
