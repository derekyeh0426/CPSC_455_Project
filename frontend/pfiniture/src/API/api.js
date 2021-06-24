import furnitureClient from "./furniture-api";
import userClient from "./user-api";


export default class client {
    static furniture = furnitureClient
    static user = userClient
}