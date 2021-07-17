import axios from "axios";
import { baseUrl } from "../constants";


export default class imageClient {
    static async getAllImages() {
        try {
            const response = axios.get(baseUrl + "/api/v1/images");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getImagebyId(id) {
        try {
            const response = axios.get(baseUrl + `/api/v1/images/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteImageById(id) {
        try {
            const response = axios.delete(baseUrl + `/api/v1/images/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    // TODO implement addImage api call
    static async addImage({imageFile}) {
        try {
            const response = axios.post(baseUrl + "/api/v1/images/", {imageFile});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}