import axios from "axios"



const fetchValues = async () =>  {
    return axios.get('/api/values/current');
}

const fetchIndexes = async () => {
    return axios.get('/api/values/all');
}

const sendIndex = async (index) => {
    return axios.post('/api/values', {
        index: index,
    });
} 

export { fetchValues, fetchIndexes, sendIndex }