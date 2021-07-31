import axios from "axios";
import { baseUrl } from "../constants";

export default class cartClient {
    static async addToCart({user, listing}) {
        try {
            const response = axios.post(baseUrl + "/api/v1/carts", {user, listing});
            return response;
        } catch (e) {
            console.log(e.message())
        }
    }
}