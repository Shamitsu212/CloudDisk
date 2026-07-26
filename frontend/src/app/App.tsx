import { Routes, Route } from "react-router-dom";
import { routes } from "./routes/Routes"

import { useAuth } from "../auth/hooks/useAuth";


function App() {

  useAuth()

  return (
    <Routes>

      {routes.map((r) => (
        <Route 
          key={r.path}
          path={r.path} 
          element={r.element} 
          />
      ))}

    </Routes>
  )
}

export default App
