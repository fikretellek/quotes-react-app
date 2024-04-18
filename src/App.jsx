import { useState } from "react";
import logo from "./images/logo.png";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);

  const searchQuotes = async (e) => {
    const response = await fetch(
      `https://quote-server-5272fhb01xog.runkit.sh/quotes/search?term=${e.target.value}`
    );
    const data = await response.json();
    data.filteredQuotes ? setQuotes(data.filteredQuotes) : searchQuotes([]);
    e.target.value = "";
  };

  const getRandomQuote = async () => {
    const response = await fetch(`https://quote-server-5272fhb01xog.runkit.sh/quotes/random`);
    const data = await response.json();
    console.log(data);
    setQuotes([data.randomQuote]);
  };

  return (
    <>
      <div id="header">
        <img className="logo" src={logo} alt="" />
        <h1>Quotes React App</h1>
      </div>
      <div id="inputs">
        <input
          className="button"
          type="text"
          placeholder="search quote"
          onKeyDown={(e) => e.key === "Enter" && searchQuotes(e)}
        />
        <button className="button" onClick={getRandomQuote}>
          get a random quote
        </button>
      </div>

      <div className="card">
        <h3>Quotes:</h3>
        <ul className="quoteUl">
          {quotes.map((quoteObj) => {
            return (
              <li className="quoteLi" key={quoteObj._id}>
                <p className="quote">{quoteObj.content}</p>
                <p className="author">{quoteObj.author}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="read-the-docs">Developed by Fikret Ellek</p>
    </>
  );
}

export default App;
