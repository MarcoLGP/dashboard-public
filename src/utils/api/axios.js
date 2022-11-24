import axios from 'axios'

const axios_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
        "Access-Control-Allow-Origin": true
    }
})

export default axios_instance
