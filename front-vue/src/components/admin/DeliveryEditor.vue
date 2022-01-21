<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Update Delivery" : "Add Delivery" }}
        </h2>


        <div class="form-group">
            <label for="">Order</label>
            <select class="form-control" v-model="delivery.order">
                <option v-for="x in orders" v-bind:key="x.id" v-bind:value="x._id"> {{ x._id }} </option>
            </select>
            <validation-error :validation="$v.delivery.order" />
        </div>

        <div class="form-group">
            <label for="">Deliveryman</label>
            <input type="text" class="form-control" v-model="delivery.deliveryman" />
            <validation-error :validation="$v.delivery.deliveryman" />
        </div>

        <div class="form-group">
            <label for="">Vehicle</label>
            <input type="text" class="form-control" v-model="delivery.vehicleno" />
            <validation-error :validation="$v.delivery.vehicleno" />
        </div>

        <div class="form-group">
            <label for="">NIC</label>
            <input type="text" class="form-control" v-model="delivery.nic" />
            <validation-error :validation="$v.delivery.nic" />
        </div>

        <div class="form-group">
            <label for="">Contact</label>
            <input type="number" class="form-control" v-model="delivery.contact" />
            <validation-error :validation="$v.delivery.contact" />
        </div>

        <div class="form-group">
            <label for="">Status</label>
            <select class="form-control" v-model="delivery.status">
                    <option>Peding</option>
                    <option>Damage</option>
                    <option>Completed</option>
            </select>
            <validation-error :validation="$v.delivery.status" />
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/delivery"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handlePage">
                {{ editMode ? "Update" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ValidationError from "../ValidationError";
import { required } from "vuelidate/lib/validators";

export default {
    components: {
        ValidationError,
    },
    data() {
        return {
            delivery: {
                order: null,
                deliveryman: null,
                vehicleno: null,
                nic: null,
                contact: null,
                status: null,
            },
        };
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
        ...mapState({ orders: (state) => state.orders.orders }),
        
    },
    validations: {
        delivery: {
            order: { required },
            deliveryman: { required },
            vehicleno: { required },
            nic: { required },
            contact: { required },
            status: { required },
        },
    },
    methods: {
        ...mapActions({ setOrdersAction: "orders/setOrdersAction" }),
        ...mapActions(["addDelivery", "editDelivery"] ),
        
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editDelivery(this.delivery);
                    this.$alert("Edited Successfully!");
                } else {
                    await this.addDelivery(this.delivery);
                    this.$alert("Added Successfully!");
                }

                this.$router.push("/admin/delivery");
            }
        },
    },
    created() {
        this.setOrdersAction();
        if (this.editMode) {
            Object.assign(
                this.delivery,
                this.$store.getters.deliveryById(this.$route.params["id"])
            );
        }
        
    },
};
</script>
