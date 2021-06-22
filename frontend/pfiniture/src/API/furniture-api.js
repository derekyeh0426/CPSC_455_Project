import axios from "axios";
import { baseUrl} from "../constants";


export default class furnitureClient {
    static async getAllFurnitures() {
        try {
            const response = axios.get(baseUrl + "/furniture/all");
            return response
        } catch (e) {
            console.log(e.message())
        }
    }
}
