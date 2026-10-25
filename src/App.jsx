import { Route, Routes } from "react-router"
import Navbar from "./Components/Navber"
import NotFound from "./Pages/NotFound"
import RecipeDetail from "./Pages/RecipeDetail"
import Home from "./Pages/Home"

function App() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/recipe/:id" element={<RecipeDetail/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App
