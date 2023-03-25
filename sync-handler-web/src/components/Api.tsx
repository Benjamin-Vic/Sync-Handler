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

    findAll = async (type: string, search: string = "", value: string = "", sort: string = "", order: string = "", page: number = 0, size: number = 0): Promise<ResultInterface> => {
        const params: any = {}

        if (search && search.length > 0 && value && value.length > 0) {
            params['search'] = search;
            params['value'] = value;
        }

        if (sort && sort.length > 0 && order && order.length > 0) {
            params['sort'] = sort;
            params['order'] = order;
        }

        if (page && page > 0) {
            params['page'] = page;
        }

        if (size && size > 10) {
            params['size'] = size;
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

    create = async (type: string, data: any): Promise<ResultInterface> => {
        const res: ResultInterface = await this.api.post(`/${type}`, data, {
            withCredentials: true
        })
            .then(() => ({ state: true }))
            .catch((err) => ({ state: false, data: err }))
        return res
    }

    update = async (type: string, id: string, data: any): Promise<ResultInterface> => {
        const res: ResultInterface = await this.api.put(`/${type}/${id}`, data, {
            withCredentials: true
        })
            .then(() => ({ state: true }))
            .catch((err) => ({ state: false, data: err }))
        return res
    }
}

const api = new Api();
export default api;