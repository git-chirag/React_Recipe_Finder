import React, { useState, useRef, useEffect } from "react";
import Loading from "./Loading";
import "./style.css";

function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [isloading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const YOUR_APP_ID = "b2e0f3e6";
  const YOUR_APP_KEY = "a4d778c346b657dae4e350e7a6e9e72d";

  useEffect(() => {
    apiCall("chicken");
  }, []);

  function apiCall(query) {
    setLoading(true);
    let url = `search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    fetch(url, { mode: "no-cors" })
      .then((response) => response.json())
      .then((res) => {
        updateIngredientList(res.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  }

  function handleSearch(e) {
    const query = inputRef.current.value;
    apiCall(query);
  }

  fetch("http://quotable.io/random")
    .then((res) => res.json())
    .then((response) => console.log(response.content, response.author))
    .catch((err) => console.log(err));

  return (
    <div className="app">
      <div className="input-div">
        <input ref={inputRef} placeholder="Enter a Ingredient" type="text" />
        <button onClick={handleSearch}>
          <i class="fa fa-search"></i>
        </button>
      </div>
      {isloading && <Loading />}

      <div className="card-wrapper">
        {ingredientList.map(({ recipe }) => {
          const { label, image, ingredientLines } = recipe;
          return (
            <div key={label} className="card">
              <img src={image} alt="no image" />
              <p>{label}</p>
              <div className="steps">
                {ingredientLines.map((line, index) => {
                  return (
                    <div>
                      <span key={index}>{line}</span>
                      <br></br>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
