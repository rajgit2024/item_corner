import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddItem from "./pages/AddItem"
import ViewItem from "./pages/ViewItem"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/add" element={<AddItem />} />
          <Route path="/" element={<ViewItem />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
