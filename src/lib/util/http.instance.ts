import axios from 'axios';
import { BACKEND_URL } from '@lib/config';

const BASE_URL = BACKEND_URL;

const httpInstance = axios.create({
	baseURL: BASE_URL,
	responseType: 'json',
});

export { httpInstance };
