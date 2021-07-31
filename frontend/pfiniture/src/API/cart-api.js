import axios from "axios";
import { BASE_URL } from "../constants";


export default class cartClient {
    static async getAllCarts() {
        try {
            const response = axios.get(BASE_URL + "/api/v1/carts");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getCartById(id) {
        try {
            const response = axios.get(BASE_URL + `/api/v1/carts/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteCartById(id) {
        try {
            const response = axios.delete(BASE_URL + `/api/v1/carts/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateCartById({user, listings, id}) {
        try {
            const response = axios.put(BASE_URL + `/api/v1/carts/${id}`, 
            {user, listings});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addCartToUser({user, listings}) {
        try {
            const response = axios.post(BASE_URL + `/api/v1/carts/`, 
            {user, listings});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}