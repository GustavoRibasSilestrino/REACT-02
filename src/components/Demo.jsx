// Caixa que separa a demonstração interativa da explicação.
export default function Demo({ titulo, children }) {
  return (
    <div className="demo">
      {titulo && <p className="demo-titulo">{titulo}</p>}
      {children}
    </div>
  )
}
