import Dashboard from "./components/my-account/Dashboard";
import Orders from "./components/my-account/Orders";
import Cart from "./components/my-account/Cart";
import MyFurnitures from "./components/my-account/MyFurnitures";

export const BASE_URL = "http://localhost:8080"

export const MY_ACCOUNT_VIEWS = {
    dashboard: {
        title: "Dashboard",
        icon: "fas fa-home",
        component: <Dashboard />
    },
    orders: {
        title: "Orders",
        icon: "fas fa-barcode",
        component: <Orders />
    },
    card: {
        title: "Cart",
        icon: "fas fa-shopping-cart",
        component: <Cart />
    },
    myFurnitures: {
        title: "My Furniture",
        icon: "fas fa-couch",
        component: <MyFurnitures />
    }
}