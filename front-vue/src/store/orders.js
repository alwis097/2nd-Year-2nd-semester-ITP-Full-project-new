import Axios from "axios";

const ordersUrl = `http://localhost:3000/orders`;

export default {
    namespaced: true,

    state: {
        orders: [],
    },
    getters: {
        orderById: (state) => (id) => state.orders.find((p) => p._id == id),
    },
    mutations: {
        setOrders(state, data) {
            state.orders = data;
        },
    },
    actions: {
        async storeOrderAction(context, order) {
            return (await Axios.post(ordersUrl, order)).data.id;
        },
        async editOrder(context, orders) {
            await Axios.put(`${ordersUrl}/${orders._id}`, orders);
            context.commit("setOrders", (await Axios.get(ordersUrl)).data);
        },
        async addFeedback(context, orders) {
            await Axios.put(`${ordersUrl}/feedback/${orders._id}`, orders);
            context.commit("setOrders", (await Axios.get(ordersUrl)).data);
        },
        async deleteFeedback(context, orders) {
            await Axios.put(`${ordersUrl}/removefeedback/${orders._id}`, orders);
            context.commit("setOrders", (await Axios.get(ordersUrl)).data);
        },
        async cancelOrder(context, orders) {
            await Axios.delete(`${ordersUrl}/${orders._id}`, orders);
            context.commit("setOrders", (await Axios.get(ordersUrl)).data);
        },
        async setOrdersAction(context) {
            context.commit("setOrders", (await Axios.get(ordersUrl)).data);
        },
    },
};
