<template>
    <div>
        <h2>Orders</h2>

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Address</th>
                    <th>Order Content</th>
                    <th>Total</th>
                    <th>Feedback</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(o, i) in orders" :key="i">
                    <td class="align-middle">{{ o.name }}</td>
                    <td class="align-middle">{{ o.email }}</td>
                    <td class="align-middle">{{ o.address }}</td>
                    <td class="align-middle">
                        <ul class="list-group">
                            <li
                                class="list-group-item"
                                v-for="(item, index) in JSON.parse(o.cart)"
                                :key="index"
                            >
                                {{ item.product.name }}
                                {{ item.product.price | currency }}
                                {{ "x " + item.quantity }}
                            </li>
                        </ul>
                    </td>                    
                    <td class="align-middle">{{ o.total | currency }}</td>
                    <td class="align-middle">{{ o.feedback }}</td>
                    <td class="align-middle">
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="handleEdit(o)"
                        >
                            Add Or Edit Feedback
                        </button>
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="deleteFeed(o)"
                        >
                            Delete Feedback
                        </button>
                        <button
                            class="btn btn-sm btn-primary mx-2"
                            @click="editOrder(o)"
                        >
                            Edit Order
                        </button>
                        <button
                            class="btn btn-sm btn-danger mx-2"
                            @click="deleteOrder(o)"
                        >
                            Cancel Order
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState({ orders: (state) => state.orders.orders }),
    },
    methods: {
        ...mapActions({ setOrdersAction: "orders/setOrdersAction" }),
        ...mapActions({ setOrdersAction: "orders/setOrdersAction" }),
        ...mapActions({ cancelOrder: "orders/cancelOrder" }),
        ...mapActions({ deleteFeedback: "orders/deleteFeedback" }),
        handleEdit(order) {
            this.$router.push(`/addfeedback/${order._id}`);
        },
        editOrder(order) {
            this.$router.push(`/checkout/edit/${order._id}`);
        },
        deleteOrder(order) {
            this.$confirm("Are you sure?").then(() => {
            this.cancelOrder(order);
            });
             
        },
        deleteFeed(order) {
            this.$confirm("Are you sure?").then(() => {
            this.deleteFeedback(order);
            });
             
        },
    },
    created() {
        this.setOrdersAction();
        Object.assign(
                this.order,
                this.$orders.getters.orderById(this.$route.params["id"])
            );
    },
};
</script>
