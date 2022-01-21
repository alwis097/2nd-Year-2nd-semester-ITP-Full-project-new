<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit Branch" : "Add Branch" }}
        </h2>

        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="branch.name" />
            <validation-error :validation="$v.branch.name" />
        </div>

        <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control" v-model="branch.email" />
            <validation-error :validation="$v.branch.email" />
        </div>

        <div class="form-group">
            <label for="">Address</label>
            <input type="text" class="form-control" v-model="branch.address" />
            <validation-error :validation="$v.branch.address" />
        </div>

        <div class="form-group">
            <label for="">Phone</label>
            <input type="number" class="form-control" v-model="branch.phone" />
            <validation-error :validation="$v.branch.phone" />
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/branch"
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
            branch: {
                name: null,
                email: null,
                address: null,
                phone: null,
            },
        };
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    validations: {
        branch: {
            name: { required },
            email: { required, email },
            address: { required },
            phone: { required },
        },
    },
    methods: {
        ...mapActions(["addBranch", "editBranch"]),
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editBranch(this.branch);
                    this.$alert("Edit Successfully!");
                } else {
                    await this.addBranch(this.branch);
                    this.$alert("Added Successfully!");
                }

                this.$router.push("/admin/branch");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.branch,
                this.$store.getters.branchById(this.$route.params["id"])
            );
        }
    },
};
</script>
