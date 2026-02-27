import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

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
          : {
              email: username,
              password,
              first_name: firstName,
              last_name: lastName,
            }

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
      console.log(error)
      alert("Error: " + error.response?.data?.detail || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg space-y-5"
>
  <h1 className="text-3xl font-bold text-center text-gray-800">{name}</h1>

  <input
    type="email"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Email"
    required
    className="w-full px-4 py-3 rounded-xl border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-indigo-400
               focus:border-transparent transition-all"
  />

  {method === "login" && (
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      required
      className="w-full px-4 py-3 rounded-xl border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-indigo-400
                 focus:border-transparent transition-all"
    />
  )}

  {method === "register" && (
    <>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        placeholder="First Name"
        className="w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   transition-all"
      />
      <input
        type="text"
        value={lastName}
        required
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   transition-all"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   transition-all"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   transition-all"
      />
    </>
  )}

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold
               hover:bg-indigo-600 active:scale-95 transition-all duration-200
               disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? "Loading..." : name}
  </button>
</form>
  )
}

export default Form