import Vue from "vue";
import VueRouter from "vue-router";

import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/Checkout";
import Thanks from "../components/Thanks";
import Login from "../components/admin/Login";
import Signin from "../components/Signin";
import SignUp from "../components/SignUp";
import WishList from "../components/admin/WishList";
import YourOrders from "../components/YourOrders";
import Branches from "../components/Branches";
import AddFeedback from "../components/AddFeedback";
import InquiryClient from "../components/admin/InquiryEditor";

import Admin from "../components/admin/Admin";
import AdminPages from "../components/admin/Pages";
import PageEditor from "../components/admin/PageEditor";
import Products from "../components/admin/Products";
import ProductEditor from "../components/admin/ProductEditor";
import Orders from "../components/admin/Orders";
import Delivery from "../components/admin/Delivery";
import DeliveryEditor from "../components/admin/DeliveryEditor";
import Stock from "../components/admin/Stock";
import Grn from "../components/admin/Grn";
import GrnEditor from "../components/admin/GrnEditor";
import Supplier from "../components/admin/Supplier";
import SupplierEditor from "../components/admin/SupplierEditor";
import Branch from "../components/admin/Branch";
import BranchEditor from "../components/admin/BranchEditor";
import User from "../components/admin/User";
import UserEditor from "../components/admin/UserEditor";
import Feedback from "../components/admin/Feedback";
import FeedbackEditor from "../components/admin/FeedbackEditor";
import Inquiry from "../components/admin/Inquiry";
import InquiryEditor from "../components/admin/InquiryEditor";

import dataStore from "../store";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",

    routes: [
        { path: "/cart", component: ShoppingCart },
        { path: "/thanks", component: Thanks },
        { path: "/checkout/:op(add|edit)/:id?", component: Checkout },
        { path: "/categories/:category", component: ProductList },
        { path: "/login", component: Login },
        { path: "/Signin", component: Signin },
        { path: "/signup", component: SignUp },
        { path: "/wishlist", component: WishList },
        { path: "/yourorders", component: YourOrders },
        { path: "/branches", component: Branches },
        { path: "/addfeedback/:id?", component: AddFeedback },
        { path: "/inquires/add", component: InquiryClient },
        {
            path: "/admin",
            component: Admin,
            beforeEnter(to, from, next) {
                if (dataStore.state.auth.authenticated) {
                    next();
                } else {
                    next("/login");
                }
            },
            children: [
                { path: "pages", component: AdminPages },
                { path: "pages/:op(add|edit)/:id?", component: PageEditor },
                { path: "products", component: Products },
                { path: "products/:op(add|edit)/:id?", component: ProductEditor },
                { path: "orders", component: Orders },
                { path: "delivery", component: Delivery },
                { path: "delivery/:op(add|edit)/:id?", component: DeliveryEditor },
                { path: "stock", component: Stock },
                { path: "grn", component: Grn },
                { path: "grn/:op(add|edit)/:id?", component: GrnEditor },
                { path: "supplier", component: Supplier },
                { path: "supplier/:op(add|edit)/:id?", component: SupplierEditor },
                { path: "branch", component: Branch },
                { path: "branch/:op(add|edit)/:id?", component: BranchEditor },
                { path: "user", component: User },
                { path: "user/:op(add|edit)/:id?", component: UserEditor },
                { path: "feedback", component: Feedback },
                { path: "feedback/:op(add|edit)/:id?", component: FeedbackEditor },
                { path: "inquiry", component: Inquiry },
                { path: "inquiry/:op(add|edit)/:id?", component: InquiryEditor },
                { path: "wishlist", component: WishList },
                { path: "*", redirect: "/admin/products" },
            ],
        },

        { path: "/:slug?", component: Pages },
        { path: "*", redirect: "/" },
    ],
});
