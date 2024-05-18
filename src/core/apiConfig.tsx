import axios from "axios";

export const baseAPIURL = 'http://localhost:8082/';

export const axiosInstance = axios.create({
    baseURL: baseAPIURL,
    timeout: 4000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    },
});

export class ApiRequests {
    static getAvailableDestinations = async () => {
        return await axiosInstance.get('transports/available');
    }
}
