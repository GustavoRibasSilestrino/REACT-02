import { useState } from 'react'
import Codigo from '../components/Codigo.jsx'
import Demo from '../components/Demo.jsx'

const TURMAS = ['Manhã', 'Tarde', 'Noite']

const FORMULARIO_VAZIO = {
  nome: '',
  email: '',
  turma: TURMAS[0],
  comentario: '',
  aceitou: false,
}

export default function Formularios() {
  const [formulario, setFormulario] = useState(FORMULARIO_VAZIO)
  const [erro, setErro] = useState('')
  const [inscritos, setInscritos] = useState([])

  // Um único handler atualiza qualquer campo pelo atributo name.
  function alterarCampo(evento) {
    const { name, type, value, checked } = evento.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function enviar(evento) {
    // preventDefault evita que o navegador recarregue a página.
    evento.preventDefault()

    if (formulario.nome.trim().length < 2) {
      setErro('Informe um nome com pelo menos 2 caracteres.')
      return
    }

    if (!formulario.email.includes('@')) {
      setErro('Informe um e-mail válido.')
      return
    }

    if (!formulario.aceitou) {
      setErro('É necessário aceitar a inscrição para continuar.')
      return
    }

    setErro('')

    setInscritos((anteriores) => [
      ...anteriores,
      { ...formulario, id: crypto.randomUUID() },
    ])

    setFormulario(FORMULARIO_VAZIO)
  }

  return (
    <div className="secoes">
      <section>
        <h2>Campos controlados</h2>

        <p>
          Em um campo controlado, quem manda no valor exibido é o estado do React. A
          propriedade <code>value</code> define o que aparece e o evento{' '}
          <code>onChange</code> atualiza o estado conforme o usuário digita.
        </p>

        <Codigo>{`const [nome, setNome] = useState("");

<input
  value={nome}
  onChange={(evento) => setNome(evento.target.value)}
/>`}</Codigo>

        <p>
          O fluxo é sempre o mesmo: digitação → evento → atualização do estado → nova
          renderização.
        </p>
      </section>

      <section>
        <h2>Envio e validação</h2>

        <p>
          O <code>onSubmit</code> executa uma função quando o formulário é enviado. Essa
          função valida os dados, exibe uma mensagem ao usuário e chama{' '}
          <code>preventDefault()</code> para que o React continue no controle da página.
        </p>

        <Codigo>{`function enviar(evento) {
  evento.preventDefault();

  if (!aceitou) {
    setErro("É necessário aceitar a inscrição.");
    return;
  }

  // Dados válidos: processar.
}

<form onSubmit={enviar}>
  <button type="submit">Enviar</button>
</form>`}</Codigo>
      </section>

      <section>
        <h2>Experimente o formulário</h2>

        <Demo titulo="Inscrição em uma oficina">
          <form className="formulario" onSubmit={enviar} noValidate>
            <div className="campo">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                value={formulario.nome}
                onChange={alterarCampo}
                placeholder="Como você quer ser chamado"
              />
            </div>

            <div className="campo">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formulario.email}
                onChange={alterarCampo}
                placeholder="voce@exemplo.com"
              />
            </div>

            <div className="campo">
              <label htmlFor="turma">Turma</label>
              <select
                id="turma"
                name="turma"
                value={formulario.turma}
                onChange={alterarCampo}
              >
                {TURMAS.map((turma) => (
                  <option key={turma} value={turma}>
                    {turma}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="comentario">
                Comentário <span className="opcional">(opcional)</span>
              </label>
              <textarea
                id="comentario"
                name="comentario"
                rows="3"
                value={formulario.comentario}
                onChange={alterarCampo}
                maxLength={160}
              />
              <small className="contador-caracteres">
                {formulario.comentario.length}/160
              </small>
            </div>

            <label className="campo-marcavel">
              <input
                type="checkbox"
                name="aceitou"
                checked={formulario.aceitou}
                onChange={alterarCampo}
              />
              Confirmo a minha inscrição na oficina
            </label>

            {/* Renderização condicional da mensagem de erro. */}
            {erro && (
              <p className="mensagem-erro" role="alert">
                {erro}
              </p>
            )}

            <div className="linha">
              <button type="submit" className="botao">
                Enviar inscrição
              </button>

              <button
                type="button"
                className="botao-vazado"
                onClick={() => {
                  setFormulario(FORMULARIO_VAZIO)
                  setErro('')
                }}
              >
                Limpar
              </button>
            </div>
          </form>
        </Demo>
      </section>

      <section>
        <h2>Estado do formulário em tempo real</h2>

        <p>
          Como cada campo é controlado, o estado é a única fonte da verdade — ele pode ser
          inspecionado a qualquer momento.
        </p>

        <Codigo>{JSON.stringify(formulario, null, 2)}</Codigo>
      </section>

      <section>
        <h2>Inscrições enviadas</h2>

        {/* Renderização condicional: lista vazia × lista preenchida. */}
        {inscritos.length === 0 ? (
          <p className="nota">Nenhuma inscrição enviada ainda.</p>
        ) : (
          <ul className="lista-cartoes">
            {inscritos.map((inscrito) => (
              <li key={inscrito.id}>
                <strong>{inscrito.nome}</strong>
                <span>{inscrito.email}</span>
                <span className="selo">{inscrito.turma}</span>
                {inscrito.comentario && <p>“{inscrito.comentario}”</p>}
              </li>
            ))}
          </ul>
        )}

        <p className="nota">
          As inscrições ficam apenas na memória do navegador. Em uma aplicação real, o
          servidor também deve validar tudo o que recebe.
        </p>
      </section>
    </div>
  )
}
