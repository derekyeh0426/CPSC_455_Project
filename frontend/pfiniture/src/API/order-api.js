import axios from "axios";
import { BASE_URL } from "../constants";


export default class orderClient {
    static async getAllOrders() {
        try {
            const response = axios.get(BASE_URL + "/api/v1/orders");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getOrderById(id) {
        try {
            const response = axios.get(BASE_URL + `/api/v1/orders/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteOrderById(id) {
        try {
            const response = axios.delete(BASE_URL + `/api/v1/orders/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addToOrders({sellers, buyer, totalAmount, paymentType, furnitures, shippingAddress}) {
        try {
            const response = axios.post(BASE_URL + `/api/v1/orders/`, 
            {sellers, buyer, totalAmount, paymentType, furnitures, shippingAddress});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getOrderByUserId(id) {
        try {
            const response = axios.get(BASE_URL + `/api/v1/orders/user/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}