import BaseService from "../../BaseService";
import { AxiosResponse } from "axios";
import User from "../../../models/User";

export default class UserService extends BaseService {

    fetch(): Promise<AxiosResponse<User[]>> {
        return this.axios.get(`/users`, this.getCancelTokenStructure());
    }

    create(user: User): Promise<AxiosResponse<User>> {
        return this.axios.post(`/users`, {
            ...user
        });
    }

    update(user: User): Promise<AxiosResponse<User>> {
        return this.axios.put(`/users/${user.id}`, {
            ...user
        });
    }

    delete(user: User): Promise<AxiosResponse<{}>> {
        return this.axios.delete(`/users/${user.id}`);
    }

}
