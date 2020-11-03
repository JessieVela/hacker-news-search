import Search from "./components/Search";
import "./App.css";

function App() {
  return (
    <div className="App">
      <a href="/" className="app-title">
        <h1>Hacker News Search</h1>
      </a>
      <Search />
    </div>
  );
}

export default App;
