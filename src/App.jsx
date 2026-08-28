import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nakheel from "./pages/Nakheel";
import PlantDetails from "./pages/PlantDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nakheel />} />
        <Route path="/plant/:id" element={<PlantDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;