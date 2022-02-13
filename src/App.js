import logo from './logo.svg';
import './App.css';
import { useData, getItemsFromUser } from './firebase';

function App() {
  const [data, loading, error] = useData('/');

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
