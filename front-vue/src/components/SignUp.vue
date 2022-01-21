<template>
    <div class="mt-5">

        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="user.name" />
            <validation-error :validation="$v.user.name" />
        </div>

        <div class="form-group">
            <label for="">Address</label>
            <input type="text" class="form-control" v-model="user.address" />
            <validation-error :validation="$v.user.address" />
        </div>

        <div class="form-group">
            <label for="">Contact</label>
            <input type="number" class="form-control" v-model="user.contact" />
            <validation-error :validation="$v.user.contact" />
        </div>

        <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control" v-model="user.email" />
            <validation-error :validation="$v.user.email" />
        </div>

        <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" v-model="user.password" />
            <validation-error :validation="$v.user.password" />
        </div>

        <div class="text-center">
            <button class="btn btn-primary m-1" @click="handlePage">
                Sign Up
            </button>
            <router-link class="btn btn-secondary m-1" to="/signin"
                >U Have an account?</router-link
            >
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import ValidationError from "./ValidationError";
import { required, email } from "vuelidate/lib/validators";

export default {
    components: {
        ValidationError,
    },
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
    validations: {
        user: {
            name: { required },
            address: { required },
            contact: { required },
            email: { required, email },
            password: { required },
        },
    },
    methods: {
        ...mapActions(["addUser"]),
        async handlePage() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                    await this.addUser(this.user);

                this.$router.push("/signin");
            }
        },
    },
};
</script>
