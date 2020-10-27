import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import CancelRequestError from "./CancelRequestError";
import TimeoutRequestError from "./TimeoutRequestError";
import { Environment } from "./Environment";
import iziToast from 'izitoast';

import { store } from '../store';
import * as actionCreators from '../actions';
import Axios, { CancelTokenSource } from "axios";

export default class BaseService {

    public readonly baseURL: string;
    public token: string | null;
    protected axios!: AxiosInstance;
    private readonly timeout: number = 20000;

    private readonly source: CancelTokenSource;

    constructor() {

        this.source = Axios.CancelToken.source();
        this.baseURL = process.env.NODE_ENV === "production" ? Environment.production : Environment.develop;

        const { authReducer: { token } } = store.getState();
        this.token = token;
        
        this.setup();
        this.errorHandling();
    }

    public cancelRequest() {
        this.source.cancel();
    }

    public getCancelTokenStructure() {
        return {
            cancelToken: this.source.token
        };
    }

    private setup() {

        let lang = localStorage.getItem("i18nextLng")?.split('-')[0] ?? "en";

        let options: AxiosRequestConfig = {
            baseURL: this.baseURL,
            timeout: this.timeout,
            headers: {
                "Accept-Language": lang,
            }
        }

        if(this.token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${this.token}`,
            }
        }

        this.axios = axios.create(options);

    }

    private errorHandling() {
        
        this.axios.interceptors.response.use((response: AxiosResponse<any>) => {

            if(response.data.message) {
                this.showSuccessMessage(response.data.message)
            }
            return response;

        }, (error: any) => {

            if(
                Axios.isCancel(error) ||
                error.response?.status === null || 
                error.response?.status === undefined
            ) {

                if(error.response) return Promise.reject(error.response);
                else if(error.message?.toLowerCase().includes("timeout")) return Promise.reject( new TimeoutRequestError() );
                return Promise.reject( new CancelRequestError() );
            }

            switch(error.response.status) {
                case 401:
                    store.dispatch<any>( actionCreators.authLogout() );
                    break;
                case 400:
                case 403:
                case 404:
                case 422:
                    this.showErrorToast(error.response ?? "");
                    break;
                default:
                    break;
            }

            return Promise.reject(error.response);

        });

    }

    private showErrorToast(message: string) {
        iziToast.error({
            title: '',
            message,
        });
    }

    private showSuccessMessage(message: string) {
        iziToast.info({
            title: '',
            message,
        });
    }
    
}
