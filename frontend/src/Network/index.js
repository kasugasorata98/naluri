import axios from "axios";

const API = () => {
    let axiosInstance = axios.create({
        baseURL: 'http://localhost:6001',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return {
        getLatestPiValue: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.get(`/v1/pi/getLatestPiValue`);
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        getMorePrecisePi: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.get(`/v1/pi/getMorePrecisePi`);
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
        getCircumferenceOfSun: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await axiosInstance.get(`/v1/circumference/getCircumferenceOfSun`);
                    resolve(data);
                }
                catch (err) {
                    if (err && err.response && err.response.data) {
                        reject(err.response.data);
                    }
                }
            });
        },
    };
};

export default API;