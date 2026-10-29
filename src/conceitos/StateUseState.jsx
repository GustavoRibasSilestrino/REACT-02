import { useState } from 'react'
import Codigo from '../components/Codigo.jsx'
import Demo from '../components/Demo.jsx'

// Fora do React: uma variável comum não provoca nova renderização.
let variavelComum = 0

export default function StateUseState() {
  const [contador, setContador] = useState(0)
  const [passo, setPasso] = useState(1)
  const [renderizacoes, setRenderizacoes] = useState(0)

  return (
    <div className="secoes">
      <section>
        <h2>O que é state</h2>

        <p>
          <strong>State</strong> é uma informação que o componente guarda, como um contador
          ou uma mensagem. Quando o estado muda, o React renderiza o componente novamente
          para atualizar a tela.
        </p>

        <p>
          O <code>useState</code> é um Hook: recebe o valor inicial e devolve dois
          elementos — o valor atual e a função que o atualiza.
        </p>

        <Codigo>{`import { useState } from "react";

const [contador, setContador] = useState(0);`}</Codigo>
      </section>

      <section>
        <h2>Por que uma variável comum não basta</h2>

        <p>
          Alterar uma variável comum não pede uma nova renderização, e a cada execução do
          componente as variáveis locais são recriadas. O botão da esquerda altera uma
          variável fora do React; o da direita altera o estado.
        </p>

        <Codigo>{`function Contador() {
  let valor = 0;

  function incrementar() {
    valor = valor + 1; // muda o valor, mas a tela não.
  }

  return <button onClick={incrementar}>Valor: {valor}</button>;
}`}</Codigo>

        <Demo titulo="Compare os dois comportamentos">
          <div className="linha">
            <button
              type="button"
              className="botao-vazado"
              onClick={() => {
                variavelComum += 1
                // eslint-disable-next-line no-console
                console.log('variavelComum agora vale', variavelComum)
              }}
            >
              Somar na variável comum
            </button>

            <button
              type="button"
              className="botao"
              onClick={() => setRenderizacoes((valor) => valor + 1)}
            >
              Somar no state
            </button>
          </div>

          <p className="placar">
            <span>
              Variável comum na tela: <strong>{variavelComum}</strong>
            </span>

            <span>
              State na tela: <strong>{renderizacoes}</strong>
            </span>
          </p>

          <p className="nota">
            O primeiro número só muda de valor na memória — ele aparece atualizado aqui
            apenas quando alguma outra coisa provoca uma renderização. O segundo atualiza a
            tela na hora. Abra o console do navegador para ver a variável sendo somada.
          </p>
        </Demo>
      </section>

      <section>
        <h2>Exemplo: contador com passo</h2>

        <p>
          Dois estados independentes no mesmo componente: o valor do contador e o passo
          escolhido. A atualização usa a forma de função, que parte sempre do valor mais
          recente.
        </p>

        <Codigo>{`setContador((valor) => valor + passo);`}</Codigo>

        <Demo titulo="Teste na prática">
          <p className="contador">{contador}</p>

          <div className="linha">
            <button
              type="button"
              className="botao"
              onClick={() => setContador((valor) => valor + passo)}
            >
              + {passo}
            </button>

            <button
              type="button"
              className="botao-vazado"
              onClick={() => setContador((valor) => valor - passo)}
            >
              − {passo}
            </button>

            <button type="button" className="botao-vazado" onClick={() => setContador(0)}>
              Zerar
            </button>
          </div>

          <label htmlFor="passo">Passo</label>

          <input
            id="passo"
            type="range"
            min="1"
            max="10"
            value={passo}
            onChange={(evento) => setPasso(Number(evento.target.value))}
          />

          {/* Renderização condicional a partir do estado. */}
          {contador === 0 && <p className="nota">O contador está zerado.</p>}

          {contador < 0 && <p className="nota">O contador está negativo.</p>}

          {contador >= 50 && <p className="nota">Passou de 50.</p>}
        </Demo>
      </section>
    </div>
  )
}
