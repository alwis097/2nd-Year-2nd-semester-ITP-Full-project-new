<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit GRN" : "Add GRN" }}
        </h2>


        <div class="form-group">
            <label for="">Product</label>
            <select class="form-control" v-model="grn.product">
                <option v-for="x in products" v-bind:key="x.id" v-bind:value="x._id"> {{ x.name }} </option>
            </select>
            <validation-error :validation="$v.grn.product" />
            
        </div>
        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="grn.pname" />
            <validation-error :validation="$v.grn.pname" />
        </div>

        <div class="form-group">
            <label for="">Supplier</label>
            <select class="form-control" v-model="grn.supplier">
                <option v-for="x in suppliers" v-bind:key="x.id" v-bind:value="x.name"> {{ x.name }} </option>
            </select>
            <validation-error :validation="$v.grn.supplier" />
        </div>
        <div class="form-group">
            <label for="">Quantity</label>
            <input type="number" class="form-control" v-model="grn.quantity" />
            <validation-error :validation="$v.grn.quantity" />
        </div>
        <div class="form-group">
            <label for="">Price</label>
            <input type="number" class="form-control" v-model="grn.price" />
            <validation-error :validation="$v.grn.price" />
        </div>
        <div class="form-group">
            <label for="">Date</label>
            <input type="date" class="form-control" v-model="grn.date" />
            <validation-error :validation="$v.grn.date" />
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/grn"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handlePage">
                {{ editMode ? "Edit" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ValidationError from "../ValidationError";
import { required } from "vuelidate/lib/validators";

export default {
    components: {
        ValidationError,
    },
    data() {
        return {
            grn: {
                product: null,
                pname: null,
                supplier: null,
                quantity: null,
                price: null,
                date: null,
            },
        };
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
        ...mapState(["suppliers"]),
        ...mapState(["products"]),
    },
    validations: {
        grn: {
            product: { required },
            pname: { required },
            supplier: { required },
            quantity: { required },
            price: { required },
            date: { required },
        },
    },
    methods: {
        ...mapActions(["addGrn", "editGrn"]),
        ...mapMutations(["setCurrentCategory"]),
        ...mapActions(["setProductsByCategoryAction"]),
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editGrn(this.grn);
                    this.$alert("Edited Successfully!");
                } else {
                    await this.addGrn(this.grn);
                    this.$alert("Added Successfully!");
                }

                this.$router.push("/admin/grn");
            }
        },
    },
    created() {
        this.setCurrentCategory("all");
        this.setProductsByCategoryAction("all");
        if (this.editMode) {
            Object.assign(
                this.grn,
                this.$store.getters.grnById(this.$route.params["id"])
            );
        }
    },
};
</script>
