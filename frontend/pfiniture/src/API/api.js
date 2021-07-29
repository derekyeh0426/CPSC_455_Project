import furnitureClient from "./furniture-api";
import userClient from "./user-api";
import imageClient from "./image-api";
import listingClient from "./listing-api";
import cartClient from "./cart-api";


export default class client {
    static furniture = furnitureClient
    static user = userClient
    static image = imageClient
    static listing = listingClient
    static cart = cartClient
}