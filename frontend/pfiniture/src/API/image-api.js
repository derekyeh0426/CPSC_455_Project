import axios from "axios";
<<<<<<< HEAD
import { baseUrl } from "../constants";

=======
import { BASE_URL } from "../constants"
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462

export default class imageClient {
    static async getAllImages() {
        try {
<<<<<<< HEAD
            const response = axios.get(baseUrl + "/api/v1/images");
=======
            const response = axios.get(BASE_URL + "/api/v1/images");
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getImagebyId(id) {
        try {
<<<<<<< HEAD
            const response = axios.get(baseUrl + `/api/v1/images/${id}`);
=======
            const response = axios.get(BASE_URL + `/api/v1/images/${id}`);
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteImageById(id) {
        try {
<<<<<<< HEAD
            const response = axios.delete(baseUrl + `/api/v1/images/${id}`);
=======
            const response = axios.delete(BASE_URL + `/api/v1/images/${id}`);
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addImages(imageFiles) {
        try {
            const formData = new FormData();
            imageFiles.forEach(imageFile => {
                formData.append('photo', imageFile);
            });
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
<<<<<<< HEAD
            const response = axios.post(baseUrl + `/api/v1/images/`, formData, config);
=======
            const response = axios.post(BASE_URL + `/api/v1/images/`, formData, config);
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e)
        }
    }
}