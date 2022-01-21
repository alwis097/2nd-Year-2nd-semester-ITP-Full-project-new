<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit Supplier" : "Add Supplier" }}
        </h2>

        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="supplier.name" />
            <validation-error :validation="$v.supplier.name" />
        </div>
        <div class="form-group">
            <label for="">Company Name</label>
            <input type="text" class="form-control" v-model="supplier.company_name" />
            <validation-error :validation="$v.supplier.company_name" />
        </div>
        <div class="form-group">
            <label for="">Contact</label>
            <input type="number" class="form-control" v-model="supplier.contact" />
            <validation-error :validation="$v.supplier.contact" />
        </div>

        <div class="form-group">
            <label for="">Email</label>
            <input type="email" class="form-control" v-model="supplier.email" />
            <validation-error :validation="$v.supplier.email" />
        </div>

        <div class="form-group">
            <label for="">Address</label>
            <input type="text" class="form-control" v-model="supplier.address" />
            <validation-error :validation="$v.supplier.address" />
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/supplier"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handlePage">
                {{ editMode ? "Edit" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import ValidationError from "../ValidationError";
import { required, email } from "vuelidate/lib/validators";

export default {
    components: {
        ValidationError,
    },
    data() {
        return {
            supplier: {
                name: null,
                company_name: null,
                contact: null,
                email: null,
                address: null,
            },
        };
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    validations: {
        supplier: {
            name: { required },
            company_name: { required },
            contact: { required },
            email: { required, email},
            address: { required },
        },
    },
    methods: {
        ...mapActions(["addSupplier", "editSupplier"]),
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editSupplier(this.supplier);
                    this.$alert("Edited Successfully!");
                } else {
                    await this.addSupplier(this.supplier);
                    this.$alert("Added Successfully!");
                }

                this.$router.push("/admin/supplier");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.supplier,
                this.$store.getters.supplierById(this.$route.params["id"])
            );
        }
    },
};
</script>
