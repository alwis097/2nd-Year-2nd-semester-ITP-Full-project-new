<template>
    <div class="container" style="max-width: 1400px;">
         <TopBar/>
        <Header />

        <router-view />
          <Footer/>
    </div>
</template>

<script>
import { mapActions } from "vuex";

import Header from "./components/Header";
import TopBar from "./components/appbar1";
import Footer from "./components/Footer";

export default {
    components: {
        Header,
        TopBar,
        Footer
    },
    methods: {
        ...mapActions(["setPagesAction", "setCategoriesAction", "setDeliveriesAction", "setStocksAction", "setGrnsAction", "setBranchesAction", "setSuppliersAction", "setUsersAction", "setFeedbacksAction", "setInquiresAction"]),
        ...mapActions({ initializeCart: "cart/initializeCart" }),
    },
    created() {
        this.setPagesAction();
        this.setCategoriesAction();
        this.setInquiresAction();
        this.setDeliveriesAction();
        this.setStocksAction();
        this.setGrnsAction();
        this.setSuppliersAction();
        this.setBranchesAction();
        this.setUsersAction();
        this.setFeedbacksAction();
        this.initializeCart(this.$store);
    },
};
</script>
