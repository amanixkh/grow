import React, { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import App from './App.jsx'
import EnvironmentalCalculator from './EnvironmentalCalculator.jsx'
import PlantDetails from './pages/PlantDetails.jsx'
import Nakheel from './pages/Nakheel.jsx'
import './index.css'
import './theme-vars.css'

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Nakheel />} />
        <Route path="/calculator" element={<EnvironmentalCalculator />} />
        <Route path="/plant/:id" element={<PlantDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

