import { Routes, Route } from "react-router-dom";
import { routes } from "./routes/Routes"


function App() {

  return (
    <Routes>

      {routes.map((r) => (
        <Route path={r.path} element={<r.element/>} />
      ))}

    </Routes>
  )
}

export default App
