import { useState, useEffect, useCallback } from "react";
import { fetchIndexes, fetchValues, sendIndex } from "../data/api";

const Fibonacci = () => {
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");
  const [seenIndexes, setSeenIndexes] = useState([]);

  const valuesCall = async () => {
    const { data } = await fetchValues();
    setValues(data);
  }

  const indexesCall = async () => {
    const { data } = await fetchIndexes();
    setSeenIndexes(data);
  };

  useEffect(() => {
    indexesCall()
    valuesCall()
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await sendIndex(index);
    console.log(res)
    setIndex("");
  };

  const RenderValues = () => {
    const data = Object.entries(values || {}).flatMap((key, val) => {
      return (
        <div key={key}>
          For index {key} I calculated {val}
        </div>
      );
    });

    return data.length > 0 ? data : <div>No calculated values</div>
  };
  const RenderSeenIndexes = () => {
    const indexes = (seenIndexes || []).map(({ number }) => number).join(", ") ?? <div>Error fetching</div>;
    return indexes.length > 0 ? indexes : <div>No indexes seen</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      <RenderSeenIndexes />
      <h3>Calculated Values:</h3>
      <RenderValues />
    </div>
  );
};

export default Fibonacci;
