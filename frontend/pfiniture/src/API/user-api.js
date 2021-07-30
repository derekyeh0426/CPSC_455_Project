import axios from "axios";
import { baseUrl } from "../constants";

export default class userClient {

    static async getAllUsers() {
        try {
            const response = axios.get(baseUrl + "/api/v1/users");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteAllUsers() {
        try {
            const response = axios.delete(baseUrl + `/api/v1/users/`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addUsers({name, email, token}) {
        try {
            const response = axios.post(baseUrl + `/api/v1/users/`, {name, email, token});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteUserById(id) {
        try {
            const response = axios.delete(baseUrl + `/api/v1/users/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getUserById(id) {
        try {
            const response = axios.get(baseUrl + `/api/v1/users/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}