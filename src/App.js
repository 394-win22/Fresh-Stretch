import logo from './logo.svg';
import './App.css';
import { useData, getItemsFromUser } from './firebase';
import DisplayFoods from './displayFoods';

function App() {
  const [data, loading, error] = useData('/');

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  console.log(data);

  return (
    <div className="App">
      <DisplayFoods></DisplayFoods>
    </div>
  );
}

export default App;
