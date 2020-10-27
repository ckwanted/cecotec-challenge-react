import BaseService from "../../BaseService";
import LoginResponse from "./LoginResponse";
import { AxiosResponse } from "axios";

export default class AuthService extends BaseService {

    login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return this.axios.post(`/login`, {
            email,
            password,
        });
    }

}
