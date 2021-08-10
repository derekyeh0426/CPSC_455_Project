import Dashboard from "./components/my-account/Dashboard";
import Orders from "./components/my-account/order-history/Orders";
import Cart from "./components/cart/ViewCart";
import DisplayMyListings from "./components/my-account/DisplayMyListings";

export const BASE_URL = 'http://localhost:8080';
// export const BASE_URL = 'https://fresh-furniture.herokuapp.com';

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

export const MESSAGE_TYPES = {
    SUCCESS: "success",
    FAILURE: "failure"
};

export const MAX_IMAGE_COUNT = 3;