import axios from "axios"



const fetchValues = async () =>  {
    return axios.get('/api/values/all');
}

const fetchIndexes = async () => {
    return axios.get('/api/values/all');
}

const sendIndex = async (index) => {
    return axios.post('/api/values/all', {
        index: index,
    });
} 

export { fetchValues, fetchIndexes, sendIndex }