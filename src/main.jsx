import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import EnvironmentalCalculator from './EnvironmentalCalculator.jsx'
import PlantDetails from './pages/PlantDetails.jsx'
import './index.css'
import './theme-vars.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calculator" element={<EnvironmentalCalculator />} />
        <Route path="/plant/:id" element={<PlantDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

