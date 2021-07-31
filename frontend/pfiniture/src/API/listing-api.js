import axios from "axios";
<<<<<<< HEAD
import { baseUrl } from "../constants";

=======
import { BASE_URL } from "../constants"
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462

export default class listingClient {
    static async getAllListings() {
        try {
<<<<<<< HEAD
            const response = axios.get(baseUrl + "/api/v1/listings");
=======
            const response = axios.get(BASE_URL + "/api/v1/listings");
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getListingById(id) {
        try {
<<<<<<< HEAD
            const response = axios.get(baseUrl + `/api/v1/listings/${id}`);
=======
            const response = axios.get(BASE_URL + `/api/v1/listings/${id}`);
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteListingById(id) {
        try {
<<<<<<< HEAD
            const response = axios.delete(baseUrl + `/api/v1/listings/${id}`);
=======
            const response = axios.delete(BASE_URL + `/api/v1/listings/${id}`);
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateListingById({images, title, description, user, furniture, createdDate, id}) {
        try {
<<<<<<< HEAD
            const response = axios.put(baseUrl + `/api/v1/listings/${id}`, 
=======
            const response = axios.put(BASE_URL + `/api/v1/listings/${id}`,
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            {images, title, description, user, furniture, createdDate});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addListing({images, title, description, user, furniture, type}) {
        try {
<<<<<<< HEAD
            const response = axios.post(baseUrl + `/api/v1/listings/`, 
            {images, title, description, user, furniture, type});
=======
            const response = axios.post(BASE_URL + `/api/v1/listings/`,
            {images, title, description, user, furniture});
>>>>>>> 7d2d629c078888c57939d74543e3df40dd254462
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}