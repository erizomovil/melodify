import Home from "./pages/home/Home"
import Discovery from "./pages/discovery/Discovery";
import Inspect from "./pages/inspect/Inspect";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Discovery" element={<Discovery />} />
          <Route path="/inspect" element={<Inspect />} />
          <Route path="/inspect/*" element={<Inspect />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
