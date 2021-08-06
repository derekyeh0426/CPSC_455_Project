import axios from "axios";
import { BASE_URL } from "../constants";

export default class listingClient {
    static async getAllListings() {
        try {
            const response = axios.get(BASE_URL + "/api/v1/listings");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getListingById(id) {
        try {
            const response = axios.get(BASE_URL + `/api/v1/listings/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async getListingByUserId(id) {
        try {
            const response = axios.get(BASE_URL + `/api/v1/listings/users/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async deleteListingById(id) {
        try {
            const response = axios.delete(BASE_URL + `/api/v1/listings/${id}`);
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async updateListingById({images, title, description, type, user, furniture, id}) {
        try {
            const response = axios.put(BASE_URL + `/api/v1/listings/${id}`,
            {images, title, description, type, user, furniture});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }

    static async addListing({images, title, description, type, user, furniture,}) {
        try {
            const response = axios.post(BASE_URL + `/api/v1/listings/`,
            {images, title, description, type, user, furniture});
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}