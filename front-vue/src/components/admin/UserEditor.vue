<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit User" : "Add User" }}
        </h2>

        <h4
            v-if="$v.$invalid && $v.$dirty"
            class="bg-danger text-white text-center p-2"
        >
            Values Required for All Fields!
        </h4>

        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="user.name" />
        </div>

        <div class="form-group">
            <label for="">Address</label>
            <input type="text" class="form-control" v-model="user.address" />
        </div>

        <div class="form-group">
            <label for="">Contact</label>
            <input type="text" class="form-control" v-model="user.contact" />
        </div>

        <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control" v-model="user.email" />
        </div>

        <div class="form-group">
            <label for="">Password</label>
            <input type="text" class="form-control" v-model="user.password" />
        </div>


        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/user"
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
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            user: {
                name: null,
                address: null,
                contact: null,
                email: null,
                password: null,
            },
        };
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    validations: {
        user: {
            name: { required },
            address: { required },
            contact: { required },
            email: { required },
            password: { required },
        },
    },
    methods: {
        ...mapActions(["addUser", "editUser"]),
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editUser(this.user);
                    this.$alert("Edited Successfully!");
                } else {
                    await this.addUser(this.user);
                    this.$alert("Added Successfully!");
                }

                this.$router.push("/admin/user");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.user,
                this.$store.getters.userById(this.$route.params["id"])
            );
        }
    },
};
</script>
