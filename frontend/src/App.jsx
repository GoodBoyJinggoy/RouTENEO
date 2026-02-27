import { useEffect,useState } from "react";

function App(){
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error =>console.error('Error fetching message:',error));
  },[]);

  return(
    <div>
      <h1>Messsage from Backend:</h1>
      <p>{message}</p>
    </div>
  )
}

export default App;
