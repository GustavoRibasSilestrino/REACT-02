// Bloco de código usado nas explicações de cada conceito.
export default function Codigo({ children }) {
  return (
    <pre className="codigo">
      <code>{children}</code>
    </pre>
  )
}
