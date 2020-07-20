<template>
    <div class="row">
        <div class="col-12">
            <div class="form-group m-2">
                <label for="">Name</label>
                <input type="text" class="form-control" v-model="order.name" />
            </div>

            <div class="form-group m-2">
                <label for="">E-mail</label>
                <input type="text" class="form-control" v-model="order.email" />
            </div>

            <div class="form-group m-2">
                <label for="">Address</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="order.address"
                />
            </div>
        </div>

        <div class="col-12 text-center">
            <router-link class="btn btn-secondary m-1" to="/cart"
                >Back</router-link
            >
            <button class="btn btn-primary m-1">Place Order</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            order: {
                name: "John",
                email: "john@gmail.com",
                address: "John Street",
            },
        };
    },
    computed: {
        ...mapState({
            cart: (state) => state.cart.cart,
        }),
        ...mapGetters({
            total: "cart/totalPrice",
        }),
    },
    methods: {
        ...mapActions({
            storeOrder: "orders/storeOrderAction",
            clearCartData: "cart/clearCartData"
        })
    },
};
</script>
