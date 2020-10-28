import BaseService from "../../BaseService";
import { AxiosResponse } from "axios";
import User from "../../../models/User";

export default class UserService extends BaseService {

    fetch(): Promise<AxiosResponse<User[]>> {
        return this.axios.get(`/users`, this.getCancelTokenStructure());
    }

    delete(user: User): Promise<AxiosResponse<{}>> {
        return this.axios.delete(`/users/${user.id}`);
    }

}
