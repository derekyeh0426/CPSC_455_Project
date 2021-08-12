import Dashboard from "./components/my-account/Dashboard";
import Orders from "./components/my-account/order-history/Orders";
import Cart from "./components/cart/ViewCart";
import DisplayMyListings from "./components/my-account/DisplayMyListings";

export const BASE_URL = 'http://localhost:8080';

export const FURNITURE_TYPES = ["chair", "desk", "table", "couch", "drawers", "shelves", "bed", "cabinet", "dresser"];

export const TIME_OUT = 1500;

export const MAX_PRICE_RANGE = 1000.0;

export const MY_ACCOUNT_VIEWS = {
    dashboard: {
        title: "Dashboard",
        icon: "fas fa-home",
        component: <Dashboard />
    },
    orders: {
        title: "My Orders",
        icon: "fas fa-barcode",
        component: <Orders />
    },
    card: {
        title: "Cart",
        icon: "fas fa-shopping-cart",
        component: <Cart />
    },
    myFurnitures: {
        title: "My Listings",
        icon: "fas fa-couch",
        component: <DisplayMyListings />
    }
};

export const LOCATIONS = ["Surrey", "Langley", "Abbotsford", "Vancouver", "Richmond", "Burnaby", "Coquitlam", "Port Coquitlam", "Delta", "White Rock"]

export const MESSAGE_TYPES = {
    SUCCESS: "success",
    FAILURE: "failure"
};

export const MAX_IMAGE_COUNT = 3;

export const RATINGS = ["1", "2", "3", "4", "5"];
