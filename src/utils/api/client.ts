import axios from "axios";
import {BASE_API} from "../constant/api.ts";

export const publicApi = axios.create({
    baseURL: BASE_API,
});

export const authedApi = axios.create({
    baseURL: BASE_API,
});

authedApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `${token}`;

    return config;
});

authedApi.interceptors.response.use((res) => {
    if ('data' in res.data) {
        res.data = res.data.data;
    }

    return res;
})