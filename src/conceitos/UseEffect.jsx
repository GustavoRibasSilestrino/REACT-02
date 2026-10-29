import { useEffect, useState } from 'react'
import Codigo from '../components/Codigo.jsx'
import Demo from '../components/Demo.jsx'

export default function UseEffect() {
  const [agora, setAgora] = useState(() => new Date())
  const [relogioLigado, setRelogioLigado] = useState(true)
  const [largura, setLargura] = useState(() => window.innerWidth)
  const [execucoes, setExecucoes] = useState(0)
  const [etiqueta, setEtiqueta] = useState('useEffect')

  // Efeito 1: temporizador. A limpeza encerra o setInterval.
  useEffect(() => {
    if (!relogioLigado) {
      return
    }

    const intervalo = setInterval(() => {
      setAgora(new Date())
    }, 1000)

    return () => clearInterval(intervalo)
  }, [relogioLigado])

  // Efeito 2: evento do navegador. A limpeza remove o listener.
  useEffect(() => {
    function atualizar() {
      setLargura(window.innerWidth)
    }

    window.addEventListener('resize', atualizar)

    return () => window.removeEventListener('resize', atualizar)
  }, [])

  // Efeito 3: a dependência controla quando o efeito roda de novo.
  // O contador existe só para a demonstração: atualizar o estado dentro de um
  // efeito provoca uma renderização extra e, fora de uma aula, deve ser evitado.
  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setExecucoes((valor) => valor + 1)
  }, [etiqueta])

  return (
    <div className="secoes">
      <section>
        <h2>O que é um efeito</h2>

        <p>
          Efeitos permitem executar ações <strong>fora da renderização</strong> da
          interface: alterar o título da aba, usar temporizadores, ouvir eventos do
          navegador e buscar dados de APIs.
        </p>

        <p>
          O <code>useEffect</code> recebe a função com o efeito e, opcionalmente, uma lista
          de dependências que controla quando ele precisa ser executado novamente.
        </p>

        <Codigo>{`useEffect(() => {
  document.title = titulo;
}, [titulo]);`}</Codigo>

        <p className="nota">
          O título da aba desta aplicação é definido exatamente assim, pelo hook{' '}
          <code>useTituloDaAba</code>. Troque de página e observe o nome da aba.
        </p>
      </section>

      <section>
        <h2>1. Temporizador com limpeza</h2>

        <p>
          Tudo o que o efeito configura e que precisa ser encerrado deve ter uma limpeza. A
          função de limpeza é retornada pelo próprio <code>useEffect</code> e roda antes de
          uma nova configuração e quando o componente deixa de ser usado.
        </p>

        <Codigo>{`useEffect(() => {
  const intervalo = setInterval(() => {
    setAgora(new Date());
  }, 1000);

  return () => clearInterval(intervalo);
}, [relogioLigado]);`}</Codigo>

        <Demo titulo="Relógio">
          <p className="relogio">{agora.toLocaleTimeString('pt-BR')}</p>

          <button
            type="button"
            className="botao"
            onClick={() => setRelogioLigado((ligado) => !ligado)}
          >
            {relogioLigado ? 'Parar o relógio' : 'Ligar o relógio'}
          </button>

          <p className="nota">
            Ao parar, a limpeza encerra o <code>setInterval</code> — nenhum temporizador
            continua ativo em segundo plano.
          </p>
        </Demo>
      </section>

      <section>
        <h2>2. Evento do navegador</h2>

        <p>
          O mesmo princípio vale para eventos: quem adiciona um listener precisa removê-lo
          na limpeza, senão ele continua ativo indevidamente.
        </p>

        <Codigo>{`useEffect(() => {
  window.addEventListener("resize", atualizar);

  return () => window.removeEventListener("resize", atualizar);
}, []);`}</Codigo>

        <Demo titulo="Largura da janela">
          <p className="relogio">{largura}px</p>

          <p className="nota">
            Redimensione a janela do navegador para ver o valor acompanhar o evento{' '}
            <code>resize</code>.
          </p>
        </Demo>
      </section>

      <section>
        <h2>3. Entendendo as dependências</h2>

        <ul>
          <li>
            <code>useEffect(() =&gt; ...)</code> — executa após cada renderização
            confirmada.
          </li>
          <li>
            <code>useEffect(() =&gt; ..., [])</code> — executa só na montagem, porque não
            depende de nenhum valor reativo.
          </li>
          <li>
            <code>useEffect(() =&gt; ..., [valor])</code> — executa de novo sempre que{' '}
            <code>valor</code> mudar.
          </li>
        </ul>

        <Demo titulo="O efeito abaixo depende de [etiqueta]">
          <div className="linha">
            {['useEffect', 'dependências', 'limpeza'].map((opcao) => (
              <button
                key={opcao}
                type="button"
                className={opcao === etiqueta ? 'botao' : 'botao-vazado'}
                onClick={() => setEtiqueta(opcao)}
              >
                {opcao}
              </button>
            ))}
          </div>

          <p className="placar">
            <span>
              Etiqueta: <strong>{etiqueta}</strong>
            </span>

            <span>
              Execuções do efeito: <strong>{execucoes}</strong>
            </span>
          </p>

          <p className="nota">
            Clicar no botão que já está ativo não muda a dependência, então o efeito não
            roda de novo. Em desenvolvimento, o Strict Mode executa um ciclo extra de
            configuração e limpeza de propósito, para expor efeitos sem limpeza.
          </p>
        </Demo>
      </section>
    </div>
  )
}
