import axios from "axios";

export default class imageClient {
    static async getAllImages() {
        try {
            const response = axios.get("/api/v1/images");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getImagebyId(id) {
        try {
            const response = axios.get(`/api/v1/images/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteImageById(id) {
        try {
            const response = axios.delete(`/api/v1/images/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}