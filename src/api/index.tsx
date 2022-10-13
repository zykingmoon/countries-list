import axios from 'axios';

const baseURL = 'https://restcountries.com/';
const timeout = 10000;
  
export const getCountries = async (url: string) => {
    const instance = axios.create({
        baseURL,
        timeout,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return instance.get(url);
}