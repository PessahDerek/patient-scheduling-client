import axios, {AxiosError} from "axios";
import authStore from "../../stores/AuthStore";


const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

/** Set request headers with every request */
api.interceptors.request.use(config => {
    const token = localStorage.getItem("auth-store")
    const decoded = token ? JSON.parse(token).state : undefined;
    if (decoded && decoded.token)
        config.headers.Authorization = "Bearer " + decoded.token
    return config
})

api.interceptors.response.use(response => response, (err) => {
    if (err instanceof AxiosError && err.status == 401) {
        authStore.getState().clearCredentials()
    }
    return Promise.reject(err)
})


export default api
