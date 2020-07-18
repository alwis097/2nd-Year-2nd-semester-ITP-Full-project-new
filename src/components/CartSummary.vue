<template>
    <div class="float-right text-white">
        <span v-if="itemCount > 0">
            {{ itemCount }} item(s) {{ totalPrice | currency }}
        </span>
        <span v-else>
            Your cart is empty.
        </span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            itemCount: "cart/itemCount",
            totalPrice: "cart/totalPrice",
        }),
    },
};
</script>
