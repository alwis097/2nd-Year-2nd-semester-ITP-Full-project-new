import Vue from "vue";
import VueRouter from "vue-router";

import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",

    routes: [
        { path: "/cart", component: ShoppingCart },
        { path: "/categories/:category", component: ProductList },
        { path: "/:slug?", component: Pages },
        { path: "*", redirect: "/" },
    ],
});
