import axios from "axios"

const fetchValues = async () =>  {
    return await axios.get('/api/values/current').data;
}

const fetchIndexes = async () => {
    return await axios.get('/api/values/all').data;
}

const sendIndex = async (index) => {
    return await axios.post('/api/values', {
        index: index,
    });
} 

export { fetchValues, fetchIndexes, sendIndex }