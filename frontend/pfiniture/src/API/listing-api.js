import axios from "axios";
import { baseUrl } from "../constants";


export default class listingClient {
    static async getAllListings() {
        try {
            const response = axios.get(baseUrl + "/api/v1/listings");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getListingById(id) {
        try {
            const response = axios.get(baseUrl + `/api/v1/listings/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteListingById(id) {
        try {
            const response = axios.delete(baseUrl + `/api/v1/listings/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateListingById({images, title, description, user, furniture, createdDate, id}) {
        try {
            const response = axios.put(baseUrl + `/api/v1/listings/${id}`, 
            {images, title, description, user, furniture, createdDate});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addListing({images, title, description, user, furniture}) {
        try {
            const response = axios.post(baseUrl + `/api/v1/listings/`, 
            {images, title, description, user, furniture});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}