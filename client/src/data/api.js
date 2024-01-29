import axios from "axios"

const fetchValues = async () =>  {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
        seenIndexes: seenIndexes.data,
    });
}

const sendIndex = async (index) => {
    await axios.post('/api/values', {
        index: index,
    });
} 

export { fetchValues, fetchIndexes, sendIndex }