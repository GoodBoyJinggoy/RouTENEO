import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AccountDetails from "./pages/AccountDetails"
import GuestHome from "./pages/GuestHome"
import ProtectedRoute from "./components/ProtectedRoute"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() { 
  localStorage.clear()
  return <Register />
}

function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
        />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountDetails />
              </ProtectedRoute>
            }
          />
        <Route path="/guest" element={<GuestHome />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<RegisterAndLogout />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
