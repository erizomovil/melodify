import Home from "./pages/home/Home"
import Discobery from "./pages/discobery/Discobery";
import Inspect from "./pages/inspect/Inspect";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/discobery" element={<Discobery />} />
          <Route path="/inspect" element={<Inspect />} />
          <Route path="/inspect/*" element={<Inspect />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
