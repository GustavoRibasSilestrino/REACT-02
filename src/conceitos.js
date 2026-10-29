import ConsumoApis from './conceitos/ConsumoApis.jsx'
import Formularios from './conceitos/Formularios.jsx'
import RoteamentoReact from './conceitos/RoteamentoReact.jsx'
import StateUseState from './conceitos/StateUseState.jsx'
import UseEffect from './conceitos/UseEffect.jsx'

// Cada conceito da Aula 09 virou uma página, acessada por /conceito/:id.
export const conceitos = [
  {
    id: 'state',
    numero: '01',
    titulo: 'State e useState',
    resumo: 'Guardar informações que mudam e atualizar a tela quando elas mudam.',
    Componente: StateUseState,
  },
  {
    id: 'formularios',
    numero: '02',
    titulo: 'Formulários',
    resumo: 'Campos controlados, validação e envio sem recarregar a página.',
    Componente: Formularios,
  },
  {
    id: 'useeffect',
    numero: '03',
    titulo: 'useEffect',
    resumo: 'Sincronizar o componente com o que está fora do React.',
    Componente: UseEffect,
  },
  {
    id: 'apis',
    numero: '04',
    titulo: 'Consumo de APIs',
    resumo: 'Buscar dados com fetch, tratar erros e exibir o resultado.',
    Componente: ConsumoApis,
  },
  {
    id: 'router',
    numero: '05',
    titulo: 'React Router',
    resumo: 'Associar URLs a páginas e navegar sem recarregar o documento.',
    Componente: RoteamentoReact,
  },
]

export function buscarConceito(id) {
  return conceitos.find((conceito) => conceito.id === id)
}
