import Axios from "axios";

const loginUrl = `http://localhost:3000/login`;

export default {
    namespaced: true,

    state: {
        authenticated: false,
    },
    mutations: {
        setAuthenticate(state) {
            state.authenticated = true;
        },
    },
    actions: {
        async authenticate(context, order) {
            let response = await Axios.post(loginUrl, credentials);
            if (response.data.success == true) {
                context.commit("setAuthenticate");
            }
        },
    },
};
