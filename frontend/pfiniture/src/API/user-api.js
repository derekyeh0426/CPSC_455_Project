import axios from "axios";
import { BASE_URL } from "../constants";

export default class userClient {

    static async getAllUsers() {
        try {
            const response = axios.get(BASE_URL + "/api/v1/users");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteAllUsers() {
        try {
            const response = axios.delete(BASE_URL + `/api/v1/users/`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addUsers({name, email, token, location}) {
        try {
            const response = axios.post(BASE_URL + `/api/v1/users/`, {name, email, token, location});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addUsers({name, email}) {
        try {
            const response = axios.delete(BASE_URL + `/api/v1/users/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
  
    static async getUserById(id) {
        try {
            const response = axios.get(BASE_URL + `/api/v1/users/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}