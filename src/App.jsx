import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Conceito from './pages/Conceito.jsx'
import Home from './pages/Home.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'
import Sobre from './pages/Sobre.jsx'

// Routes agrupa as rotas; cada Route associa um caminho a um componente.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/conceito/:id" element={<Conceito />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}
