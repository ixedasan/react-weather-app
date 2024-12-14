import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import { ThemeProvider } from './components/ThemeProvider'
import City from './pages/City'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city/:name" element={<City />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}
export default App
