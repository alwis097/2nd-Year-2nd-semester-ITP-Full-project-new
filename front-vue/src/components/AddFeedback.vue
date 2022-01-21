<template>
    <div>
        <h2 class="text-center p-2">
            Add Order Feedback
        </h2>


        <div class="form-group">
            <label for="">Your Feedback</label>
            <input type="text" class="form-control" v-model="order.feedback" />
            <validation-error :validation="$v.order.feedback" />
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/yourorders"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handlePage">
                Save
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions} from "vuex";
import ValidationError from "./ValidationError";
import { required } from "vuelidate/lib/validators";

export default {
    components: {
        ValidationError,
    },
    data() {
        return {
            order: {
                feedback: "",
            },
        };
    },
    validations: {
        order: {
            feedback: { required },
        },
    },
    methods: {
        ...mapActions({ addFeedback: "orders/addFeedback" }),
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.order._id = this.$route.params["id"];
                await this.addFeedback(this.order);
                this.$alert("Added Successfully!");

                this.$router.push("/yourorders");
            }
        },
    },
    created() {
            Object.assign(
                this.order,
                this.$store.getters.orderById(this.$route.params["id"])
            );
        
    },
};
</script>
