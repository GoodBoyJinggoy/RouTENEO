function Home() {
  const firstName = localStorage.getItem("first_name") || "User"
  const lastName = localStorage.getItem("last_name") || ""

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome, User!
      </h1>
    </div>
  )
}

export default Home