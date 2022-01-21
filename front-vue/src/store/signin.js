import Axios from "axios";

const loginUrl = `http://localhost:3000/signin`;

export default {
    namespaced: true,

    state: {
        authenticated: false,
    },
    mutations: {
        setAuthenticate(state) {
            state.authenticated = true;
            state.loggedUser = "some";
        },
    },
    actions: {
        async authenticate(context, credentials) {
            let response = await Axios.post(loginUrl, credentials);
            if (response.data.success == true) {
                this.loggedUser = response.data.user;
                context.commit("setAuthenticate");
            }
        },
    },
};
