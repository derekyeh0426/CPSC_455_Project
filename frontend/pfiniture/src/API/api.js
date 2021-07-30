import furnitureClient from "./furniture-api";
import userClient from "./user-api";
import listingClient from "./listing-api";
import imageClient from "./image-api"


export default class client {
    static furniture = furnitureClient
    static user = userClient
    static listing = listingClient
    static image = imageClient
}