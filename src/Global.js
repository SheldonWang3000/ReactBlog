import store from './redux/store';
import axios from 'axios';
import { googleConfig } from './Keys';

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:8000/api/v1/",
    baseURL: "https://www.sheldonweb.com/api/v1/",
});

export const gapiRequest = () => new Promise((resolve, reject) => {
    if (window.gapi.auth2 === undefined) {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                apiKey: googleConfig.apiKey,
                discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
                clientId: googleConfig.clientId,
                scope: 'profile'
            }).then(function () {
                resolve();
            });
        });
    } else {
        resolve();
    }
});

function createAxiosResponseInterceptor() {
    const interceptor = axiosInstance.interceptors.response.use(
        response => response,
        (error) => {
            let errorResponse = error.response;
            if (errorResponse !== undefined && errorResponse.status === 401) {
                axiosInstance.interceptors.response.eject(interceptor);
                return axiosInstance.post('/refresh/', { withCredentials: true }).then((response) => {
                    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + response.data.access;
                    errorResponse.config.headers['Authorization'] = "Bearer " + response.data.access;
                    if (errorResponse.config.data !== undefined) {
                        var responseData = JSON.parse(errorResponse.config.data);
                        if (responseData.token !== undefined) responseData.token = response.data.access;
                        errorResponse.config.data = JSON.stringify(responseData);
                    }
                    return axiosInstance(errorResponse.config);
                }).catch(error => {
                    return Promise.reject(error);
                }).finally(createAxiosResponseInterceptor);
            }
            return Promise.reject(error);
        }
    );
}

createAxiosResponseInterceptor();

export const verifyLogin = () => new Promise((resolve, reject) => {
    const token = axiosInstance.defaults.headers.common['Authorization'] === undefined ? "*" :
        axiosInstance.defaults.headers.common['Authorization'].split(' ')[1];

    axiosInstance.post("/token/verify/", {
        token: token
    }).then(() => {
        resolve();
    }).catch(() => {
        reject();
    });
});
