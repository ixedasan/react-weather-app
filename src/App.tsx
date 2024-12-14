import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import City from './pages/City'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/city/:name" element={<City />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
export default App
