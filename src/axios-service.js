import axios from 'axios';

export const serviceURL = axios.create({
    baseURL: "http://localhost:9000/"
});

