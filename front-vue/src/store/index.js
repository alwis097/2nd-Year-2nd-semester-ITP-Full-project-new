import Vue from "vue";
import Vuex from "vuex";

import Axios from "axios";

import CartModule from "./cart";
import OrdersModule from "./orders";
import AuthModule from "./auth";
import SignInModule from "./signin";

Vue.use(Vuex);

const baseUrl = "http://localhost:3000";
const pagesUrl = `${baseUrl}/pages`;
const categoriesUrl = `${baseUrl}/categories`;
const productsUrl = `${baseUrl}/products`;
const wishlistUrl = `${baseUrl}/wishlists`;
const productImagesUrl = `${baseUrl}/media/products/`;
const deliveryUrl = `${baseUrl}/deliveries`;
const stockUrl = `${baseUrl}/stocks`;
const grnUrl = `${baseUrl}/grns`;
const supplierUrl = `${baseUrl}/suppliers`;
const branchUrl = `${baseUrl}/branches`;
const userUrl = `${baseUrl}/users`;
const feedbackUrl = `${baseUrl}/feedbacks`;
const inquiryUrl = `${baseUrl}/inquires`;

export default new Vuex.Store({
    strict: true,
    modules: {
        cart: CartModule,
        orders: OrdersModule,
        auth: AuthModule,
        signin: SignInModule
    },
    state: {
        pages: [],
        categories: [],
        products: [],
        wishlists: [],
        inquires: [],
        deliveries: [],
        stocks: [],
        grns: [],
        suppliers: [],
        branches: [],
        users: [],
        feedbacks: [],
        productImages: productImagesUrl,
        currentPage: 1,
        pageCount: 0,
        pageSize: 4,
        currentCategory: "all",
        username: "roshan",
    },
    getters: {
        pageById: (state) => (id) => state.pages.find((p) => p._id == id),
        productById: (state) => (id) => state.products.find((p) => p._id == id),
        deliveryById: (state) => (id) => state.deliveries.find((p) => p._id == id),
        inquiryById: (state) => (id) => state.inquires.find((p) => p._id == id),
        grnById: (state) => (id) => state.grns.find((p) => p._id == id),
        supplierById: (state) => (id) => state.suppliers.find((p) => p._id == id),
        branchById: (state) => (id) => state.branches.find((p) => p._id == id),
        userById: (state) => (id) => state.users.find((p) => p._id == id),
        feedbackById: (state) => (id) => state.feedbacks.find((p) => p._id == id),
    },
    mutations: {
        setPages(state, pages) {
            state.pages = pages;
        },
        setDeliveries(state, deliveries) {
            state.deliveries = deliveries;
        },
        setStocks(state, stocks) {
            state.stocks = stocks;
        },
        setGrns(state, grns) {
            state.grns = grns;
        },
        setSuppliers(state, suppliers) {
            state.suppliers = suppliers;
        },
        setBranches(state, branches) {
            state.branches = branches;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setInquires(state, inquires) {
            state.inquires = inquires;
        },
        setFeedbacks(state, feedbacks) {
            state.feedbacks = feedbacks;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setWishlists(state, wishlists) {
            state.wishlists = wishlists;
        },
        setPageCount(state, count) {
            state.pageCount = Math.ceil(Number(count) / state.pageSize);
        },
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setCurrentCategory(state, category) {
            state.currentCategory = category;
        },
        
    },
    actions: {
        async setPagesAction(context) {
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
            
        },
        
        async setCategoriesAction(context) {
            context.commit(
                "setCategories",
                (await Axios.get(categoriesUrl)).data
            );
        },
        async setDeliveriesAction(context) {
            context.commit(
                "setDeliveries",
                (await Axios.get(deliveryUrl)).data
            );
        },
        async setInquiresAction(context) {
            context.commit(
                "setInquires",
                (await Axios.get(inquiryUrl)).data
            );
        },
        async setStocksAction(context) {
            context.commit(
                "setStocks",
                (await Axios.get(stockUrl)).data
            );
        },
        async setGrnsAction(context) {
            context.commit(
                "setGrns",
                (await Axios.get(grnUrl)).data
            );
        },
        async setSuppliersAction(context) {
            context.commit(
                "setSuppliers",
                (await Axios.get(supplierUrl)).data
            );
        },
        async setBranchesAction(context) {
            context.commit(
                "setBranches",
                (await Axios.get(branchUrl)).data
            );
        },
        async setUsersAction(context) {
            context.commit(
                "setUsers",
                (await Axios.get(userUrl)).data
            );
        },
        async setFeedbacksAction(context) {
            context.commit(
                "setFeedbacks",
                (await Axios.get(feedbackUrl)).data
            );
        },
        async setProductsByCategoryAction(context, category) {
            let url;
            let productCountUrl;

            if (category != "all") {
                url = `${productsUrl}/${category}`;
                productCountUrl = `${productsUrl}/count/${category}`;
            } else {
                url = `${productsUrl}`;
                productCountUrl = `${productsUrl}/count/all`;
            }

            const productCount = (await Axios.get(productCountUrl)).data;

            context.commit("setPageCount", productCount);
            context.commit("setProducts", (await Axios.get(url)).data);
        },
        async setWishlistByCategoryAction(context, category) {
            let url;
            let productCountUrl;

            if (category != "all") {
                url = `${wishlistUrl}/${category}`;
                productCountUrl = `${wishlistUrl}/count/${category}`;
            } else {
                url = `${wishlistUrl}`;
                productCountUrl = `${wishlistUrl}/count/all`;
            }

            const productCount = (await Axios.get(productCountUrl)).data;

            context.commit("setPageCount", productCount);
            context.commit("setWishlists", (await Axios.get(url)).data);
        },

        async setProductsByCategoryPaginationAction(context, page) {
            let url;

            if (context.state.currentCategory != "all") {
                url = `${productsUrl}/${context.state.currentCategory}?p=${page}`;
            } else {
                url = `${productsUrl}?p=${page}`;
            }

            context.commit("setProducts", (await Axios.get(url)).data);
        },

        async setWishListByCategoryPaginationAction(context, page) {
            let url;

            if (context.state.currentCategory != "all") {
                url = `${wishlistUrl}/${context.state.currentCategory}?p=${page}`;
            } else {
                url = `${wishlistUrl}?p=${page}`;
            }

            context.commit("setWishlists", (await Axios.get(url)).data);
        },
        

        async addPage(context, page) {
            await Axios.post(pagesUrl, page);
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
        },
        async editPage(context, page) {
            await Axios.put(`${pagesUrl}/${page._id}`, page);
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
        },
        async deletePage(context, page) {
            await Axios.delete(`${pagesUrl}/${page._id}`);
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
        },
        async addInquiry(context, inquiry) {
            await Axios.post(inquiryUrl, inquiry);
            context.commit("setInquires", (await Axios.get(inquiryUrl)).data);
        },
        async editInquiry(context, inquiry) {
            await Axios.put(`${inquiryUrl}/${inquiry._id}`, inquiry);
            context.commit("setInquires", (await Axios.get(inquiryUrl)).data);
        },
        async deleteInquiry(context, inquiry) {
            await Axios.delete(`${inquiryUrl}/${inquiry._id}`);
            context.commit("setInquires", (await Axios.get(inquiryUrl)).data);
        },

        async addProduct(context, product) {
            await Axios.post(productsUrl, product);
        },
        async editProduct(context, product) {
            await Axios.put(productsUrl, product);
        },
        async deleteProduct(context, product) {
            await Axios.delete(`${productsUrl}/${product._id}`);

            const url = `${productsUrl}?p=${context.state.currentPage}`;
            context.commit("setProducts", (await Axios.get(url)).data);
        },
        async addDelivery(context, delivery) {
            await Axios.post(deliveryUrl, delivery);
            context.commit(
                "setDeliveries",
                (await Axios.get(deliveryUrl)).data
            );
        },
        async editDelivery(context, delivery) {
            await Axios.put(`${deliveryUrl}/${delivery._id}`, delivery);
            context.commit("setDeliveries", (await Axios.get(deliveryUrl)).data);
        },
        async deleteDelivery(context, delivery) {
            await Axios.delete(`${deliveryUrl}/${delivery._id}`, delivery);
            context.commit("setDeliveries", (await Axios.get(deliveryUrl)).data);
        },
        async addGrn(context, grn) {
            await Axios.post(grnUrl, grn);
            context.commit(
                "setGrns",
                (await Axios.get(grnUrl)).data
            );
        },
        async editGrn(context, grn) {
            await Axios.put(`${grnUrl}/${grn._id}`, grn);
            context.commit("setGrns", (await Axios.get(grnUrl)).data);
        },
        async deleteGrn(context, grn) {
            await Axios.put(`${grnUrl}/stock/${grn._id}`, grn);
            context.commit("setGrns", (await Axios.get(grnUrl)).data);
        },
        async addSupplier(context, suppliers) {
            await Axios.post(supplierUrl, suppliers);
            context.commit(
                "setSuppliers",
                (await Axios.get(supplierUrl)).data
            );
        },
        async editSupplier(context, suppliers) {
            await Axios.put(`${supplierUrl}/${suppliers._id}`, suppliers);
            context.commit("setSuppliers", (await Axios.get(supplierUrl)).data);
        },
        async deleteSupplier(context, suppliers) {
            await Axios.delete(`${supplierUrl}/${suppliers._id}`, suppliers);
            context.commit("setSuppliers", (await Axios.get(supplierUrl)).data);
        },
        async addBranch(context, branches) {
            await Axios.post(branchUrl, branches);
            context.commit(
                "setBranches",
                (await Axios.get(branchUrl)).data
            );
        },
        async editBranch(context, branches) {
            await Axios.put(`${branchUrl}/${branches._id}`, branches);
            context.commit("setBranches", (await Axios.get(branchUrl)).data);
        },
        async deleteBranch(context, branches) {
            await Axios.delete(`${branchUrl}/${branches._id}`, branches);
            context.commit("setBranches", (await Axios.get(branchUrl)).data);
        },
        async addUser(context, users) {
            await Axios.post(userUrl, users);
            context.commit(
                "setUsers",
                (await Axios.get(userUrl)).data
            );
        },
        async editUser(context, users) {
            await Axios.put(`${userUrl}/${users._id}`, users);
            context.commit("setUsers", (await Axios.get(userUrl)).data);
        },
        async deleteUser(context, users) {
            await Axios.delete(`${userUrl}/${users._id}`, users);
            context.commit("setUsers", (await Axios.get(userUrl)).data);
        },
        async addFeedback(context, feedbacks) {
            await Axios.post(feedbackUrl, feedbacks);
            context.commit(
                "setFeedbacks",
                (await Axios.get(feedbackUrl)).data
            );
        },
        async editFeedback(context, feedbacks) {
            await Axios.put(`${feedbackUrl}/${feedbacks._id}`, feedbacks);
            context.commit("setFeedbacks", (await Axios.get(feedbackUrl)).data);
        },
        async deleteFeedback(context, feedbacks) {
            await Axios.delete(`${feedbackUrl}/${feedbacks._id}`, feedbacks);
            context.commit("setFeedbacks", (await Axios.get(feedbackUrl)).data);
        },
    },
});
