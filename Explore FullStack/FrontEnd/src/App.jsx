import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);

  // using useEffect hook to render data is being fetched from axios

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Full Stack App</h1>
      <div>
        <h3>Jokes -: {jokes.length}</h3>
        {jokes.map((items,index) => (
              <div key={index}>
              <p>Id -: {items.id}</p>
              <p>Title -: {items.title}</p>
              <p>Title -: {items.joke}</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default App;
