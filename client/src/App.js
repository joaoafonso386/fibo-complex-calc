import './App.css';
import { useState } from 'react'

const App = () => {

  const [values, setValues] = useState([])
  const [index, setIndex] = useState([])
  const [seenIndexes, setSeenIndexes] = useState([])

  


  return (
    <div className="App">
      Hi!
    </div>
  );
}

export default App;
