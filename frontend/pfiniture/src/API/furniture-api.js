import axios from "axios";
<<<<<<< HEAD
import { baseUrl} from "../constants";

=======
import { BASE_URL } from "../constants"
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462

export default class furnitureClient {
    static async getAllFurnitures() {
        try {
<<<<<<< HEAD
            const response = axios.get(baseUrl + "/api/v1/furnitures");
=======
            const response = axios.get(BASE_URL + "/api/v1/furnitures");
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getFurnitureById(id) {
        try {
<<<<<<< HEAD
            const response = axios.get(baseUrl + `/api/v1/furnitures/${id}`);
=======
            const response = axios.get(BASE_URL + `/api/v1/furnitures/${id}`);
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteAllFurnitures() {
        try {
<<<<<<< HEAD
            const response = axios.delete(baseUrl + `/api/v1/furnitures/`);
=======
            const response = axios.delete(BASE_URL + `/api/v1/furnitures/`);
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteFurnitureById(id) {
        try {
<<<<<<< HEAD
            const response = axios.delete(baseUrl + `/api/v1/furnitures/${id}`);
=======
            const response = axios.delete(BASE_URL + `/api/v1/furnitures/${id}`);
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateFurnitureById({id, name, price}) {
        try {
<<<<<<< HEAD
            const response = axios.put(baseUrl + `/api/v1/furnitures/${id}`, {name, price});
=======
            const response = axios.put(BASE_URL + `/api/v1/furnitures/${id}`, {name, price});
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addFurniture({name, price}) {
        try {
<<<<<<< HEAD
            const response = axios.post(baseUrl + `/api/v1/furnitures/`, {name, price});
=======
            const response = axios.post(BASE_URL + `/api/v1/furnitures/`, {name, price});
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}