<template>
    <div class="mt-5">
        <h4
            v-if="showFailureMessage"
            class="bg-danger text-white text-center p-2"
        >
            Authentication failed, please try again.
        </h4>

        <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control" v-model="email" />
        </div>

        <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" v-model="password" />
        </div>

        <div class="text-center">
            <button class="btn btn-primary m-1" @click="handleAuth">
                Sign In
            </button>
            <router-link class="btn btn-secondary m-1" to="/signup"
                >Don't u Have an account?</router-link
            >
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            email: "",
            password: "",
            showFailureMessage: false,
        };
    },
    computed: {
        ...mapState({ authenticated: (state) => state.signin.authenticated }),
    },
    methods: {
        ...mapActions({ authenticate: "signin/authenticate" }),
        async handleAuth() {
            await this.authenticate({
                email: this.email,
                password: this.password,
            });

            if (this.authenticated) {
                this.$router.push("/categories/all");
            } else {
                this.showFailureMessage = true;
            }
        },
    },
};
</script>
