import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: "https://localhost:8000/api",
})