import axios from "axios";


export default class furnitureClient {
    static async getAllFurnitures() {
        try {
            const response = axios.get("/api/v1/furnitures");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFurnitureById(id) {
        try {
            const response = axios.get(`/api/v1/furnitures/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteAllFurnitures() {
        try {
            const response = axios.delete(`/api/v1/furnitures/`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteFurnitureById(id) {
        try {
            const response = axios.delete(`/api/v1/furnitures/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateFurnitureById({id, name, price}) {
        try {
            const response = axios.put(`/api/v1/furnitures/${id}`, {name, price});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addFurniture({name, price}) {
        try {
            const response = axios.post(`/api/v1/furnitures/`, {name, price});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}
