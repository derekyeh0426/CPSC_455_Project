import axios from "axios";

export default class userClient {

    static async getAllUsers() {
        try {
            const response = axios.get("/api/v1/users");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteAllUsers() {
        try {
            const response = axios.delete(`/api/v1/users/`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addUsers({name, email, token}) {
        try {
            const response = axios.post(`/api/v1/users/`, {name, email, token});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteUserById(id) {
        try {
            const response = axios.delete(`/api/v1/users/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getUserById(id) {
        try {
            const response = axios.get(`/api/v1/users/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}