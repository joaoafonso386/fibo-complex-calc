import './App.css';
import { useState } from 'react'
import { sendIndex } from './data/api';

const App = () => {

  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')
  const [seenIndexes, setSeenIndexes] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendIndex(index)
    setIndex('');
  };

  const renderValues = () => null
  const renderSeenIndexes = () => null

  return (
     <div>
        <form onSubmit={handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {renderValues()}
      </div>
  );
}

export default App;
