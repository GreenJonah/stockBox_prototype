import axios from 'axios';

export const iextradingURL = axios.create({
    baseURL: "https://api.iextrading.com/1.0"
});

export const firebaseURL = axios.create({
    baseURL: "https://stock-box-prototype.firebaseio.com"
});

