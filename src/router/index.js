import Vue from "vue";
import VueRouter from "vue-router";

import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/Checkout";
import Thanks from "../components/Thanks";

import Admin from "../components/admin/Admin";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",

    routes: [
        { path: "/cart", component: ShoppingCart },
        { path: "/thanks", component: Thanks },
        { path: "/checkout", component: Checkout },
        { path: "/categories/:category", component: ProductList },
        { path: "/admin", component: Admin },
        { path: "/:slug?", component: Pages },
        { path: "*", redirect: "/" },
    ],
});
