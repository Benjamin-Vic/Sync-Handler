import axios, { AxiosInstance } from "axios";
import { ResultInterface } from "../interfaces/result.interface";

class Api {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_HOST + ':' + process.env.REACT_APP_API_PORT,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    login = async (email: string, password: string): Promise<ResultInterface> => {
        const res: ResultInterface = await this.api.post('/login', {
            email,
            password
        }, {
            withCredentials: true
        })
            .then(() => ({ state: true }))
            .catch((err) => ({ state: false, data: err }))
        return res
    }

    findColumns = async (type: string): Promise<ResultInterface> => {
        const res: ResultInterface = await this.api.get(`/${type}/columns`, {
            withCredentials: true
        })
            .then((res) => ({ state: true, data: res?.data }))
            .catch((err) => ({ state: false, data: err }))
        return res
    }

    findAll = async (type: string, sort: string, order: string): Promise<ResultInterface> => {
        const params: any = {}

        if (sort && sort.length > 0) {
            params['sort'] = sort;
        }

        if (order && order.length > 0) {
            params['order'] = order;
        }

        const res: ResultInterface = await this.api.get(`/${type}`, {
            withCredentials: true,
            params
        })
            .then((res) => ({ state: true, data: res?.data }))
            .catch((err) => ({ state: false, data: err }))
        return res
    }

    find = async (type: string, id: string): Promise<ResultInterface> => {
        const res: ResultInterface = await this.api.get(`/${type}/${id}`, {
            withCredentials: true
        })
            .then((res) => ({ state: true, data: res?.data }))
            .catch((err) => ({ state: false, data: err }))
        return res
    }
    
    delete = async (type: string, id: string): Promise<ResultInterface> => {
        const res: ResultInterface = await this.api.delete(`/${type}/${id}`, {
            withCredentials: true
        })
            .then(() => ({ state: true }))
            .catch((err) => ({ state: false, data: err }))
        return res
    }
}

const api = new Api();
export default api;