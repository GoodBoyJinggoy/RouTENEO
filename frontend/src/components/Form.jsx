import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import bg from "../assets/img/ateneo_logo.jpg";

function Form({ route, method }) {
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const name = method === "login" ? "Login" : "Register"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (method === "register" && password !== confirmPassword) {
      alert("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const payload =
        method === "login"
          ? { username, password } 
          : { email: username, password, first_name: firstName, last_name: lastName }

      const res = await api.post(route, payload)

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate("/")
      } else {
        alert("Registration successful! Please log in.")
        navigate("/login")
      }
    } catch (error) {
      console.error(error)
      alert("Error: " + (error.response?.data?.detail || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
    <form
  onSubmit={handleSubmit}
  className="min-h-screen flex items-center justify-center px-4"
>
  <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-md space-y-5">

    {/* Top Right Help */}
    {method === "login" && (
      <div className="flex justify-end text-sm text-gray-500">
        <span className="underline cursor-pointer"><a href="https://docs.google.com/document/d/170zFxpLeFjIMibChLj2tn5Wr5hCdNL8efKuIMCGGG7g/edit?usp=sharing" target="_blank"> ⓘ What is RouTeneo? </a></span>
      </div>
    )}

    {/* Logo */}
    <div className="flex justify-center mb-2">
      <h1
        className="text-4xl text-indigo-500"
        style={{ fontFamily: "'Faster One', cursive" }}
      >
        RouTENEO
      </h1>
    </div>

    {/* FORM */}
    <div className="space-y-4">

      {/* Email */}
      <div>
        <label className="text-sm font-medium text-gray-600">
          Ateneo email
        </label>
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300
                     focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>

      {/* REGISTER ONLY */}
      {method === "register" && (
        <>
          <div>
            <label className="text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
        </>
      )}

      {/* Password */}
      <div>
        <label className="text-sm font-medium text-gray-600">
          {method === "login" ? "Password" : "Create Password"}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300
                     focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>

      {/* Confirm Password */}
      {method === "register" && (
        <div>
          <label className="text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300
                       focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
      )}
    </div>

    {/* PRIMARY BUTTON */}
    <button
      type="submit"
      className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold
                 hover:bg-indigo-600 transition"
    >
      {loading ? "Loading..." : name}
    </button>

    {/* SECONDARY ACTIONS */}
    {method === "login" && (
      <button
        type="button"
        onClick={() => navigate("/register")}
        className="w-full border-2 border-indigo-500 text-indigo-500 py-3 rounded-xl font-semibold
                   hover:bg-indigo-50 transition"
      >
        Register
      </button>
    )}

    {/* TERTIARY */}
    <button
      type="button"
      onClick={() => navigate("/guest")}
      className="w-full bg-gray-800 text-white py-3 rounded-xl font-medium
                 hover:bg-gray-900 transition"
    >
      Continue as Guest
    </button>

  </div>
</form>
</div>
  )
}

export default Form