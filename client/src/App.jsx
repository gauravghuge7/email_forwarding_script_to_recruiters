
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Router from './Router/Basic_Routing/Router'
import NotFound from './Components/NotFound/NotFound'

function App() {


  return (
    <>
      <Routes>
        <Route path="/*" element={<Router />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

      
    </>
  )
}

export default App
