<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Update Inquiry" : "Add Inquiry" }}
        </h2>

        <div class="form-group">
            <label for="">Customer name</label>
            <input type="text" class="form-control" v-model="inquiry.customerName" />
            <validation-error :validation="$v.inquiry.customerName" />
        </div>

        <div class="form-group">
            <label for="">Customer ID</label>
            <input type="text" class="form-control" v-model="inquiry.customerID" />
            <validation-error :validation="$v.inquiry.customerID" />
        </div>

        <div class="form-group">
            <label for="">Inquiry Content</label>
            <input type="text" class="form-control" v-model="inquiry.inquiryContent" />
            <validation-error :validation="$v.inquiry.inquiryContent" />
        </div>

        <div class="form-group">
            <label for="">Contact Number</label>
            <input type="number" class="form-control" v-model="inquiry.contactNumber" />
            <validation-error :validation="$v.inquiry.contactNumber" />
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/inquiry"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handlePage">
                {{ editMode ? "Update" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import ValidationError from "../ValidationError";
import { required } from "vuelidate/lib/validators";

export default {
    components: {
        ValidationError,
    },
    data() {
        return {
            inquiry: {
                customerName: null,
                customerID: null,
                inquiryContent: null,
                contactNumber: null,
            },
        };
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    validations: {
        inquiry: {
            customerName: { required },
            customerID: { required },
            inquiryContent: { required },
            contactNumber: { required },
        },
    },
    methods: {
        ...mapActions(["addInquiry", "editInquiry"]),
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editInquiry(this.inquiry);
                    this.$alert("Edit Successfully!");
                } else {
                    await this.addInquiry(this.inquiry);
                    this.$alert("Added Successfully!");
                }

                this.$router.push("/admin/inquiry");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.inquiry,
                this.$store.getters.inquiryById(this.$route.params["id"])
            );
        }
    },
};
</script>
