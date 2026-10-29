import { useEffect } from 'react'

// useEffect sincronizando o componente com algo externo ao React:
// o título da aba do navegador. A dependência reflete o valor usado.
export default function useTituloDaAba(titulo) {
  useEffect(() => {
    document.title = `${titulo} · Projeto React 02`
  }, [titulo])
}
