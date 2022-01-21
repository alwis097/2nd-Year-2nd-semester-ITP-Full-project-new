<template>
  <div class="row">
    <div class="col-12">
      
      <h2 class="text-center p-2">
        {{ editMode ? "Edit Order" : "Add Order" }}
      </h2>
      <label for="">Delevery Details</label>
      <div class="form-group m-2">
        <label for="">Name</label>
        <input
          type="text"
          class="form-control"
          v-model="$v.order.name.$model"
        />
        <validation-error :validation="$v.order.name" />
      </div>

      <div class="form-group m-2">
        <label for="">E-mail</label>
        <input
          type="text"
          class="form-control"
          v-model="$v.order.email.$model"
        />
        <validation-error :validation="$v.order.email" />
      </div>

      <div class="form-group m-2">
        <label for="">Contact</label>
        <input
          type="number"
          maxlength="10"
          class="form-control"
          v-model="$v.order.contact.$model"
        />
        <validation-error :validation="$v.order.contact" />
      </div>

      <div class="form-group m-2">
        <label for="">Address</label>
        <input
          type="text"
          class="form-control"
          v-model="$v.order.address.$model"
        />
        <validation-error :validation="$v.order.address" />
      </div>
      <br />
      <label for="">Payment Details</label>
      <div class="form-group m-2">
        <label for="">Name on Card</label>
        <input
          type="text"
          class="form-control"
          v-model="$v.order.name_on_card.$model"
        />
        <validation-error :validation="$v.order.name_on_card" />
      </div>

      <div class="form-group m-2">
        <label for="">Card Number</label>
        <input
          type="number"
          maxlength="16"
          class="form-control"
          v-model="$v.order.card_number.$model"
        />
        <validation-error :validation="$v.order.card_number" />
      </div>

      <div class="form-group m-2">
        <label for="">CVV</label>
        <input
          type="number"
          maxlength="3"
          class="form-control"
          v-model="$v.order.cvv.$model"
        />
        <validation-error :validation="$v.order.cvv" />
      </div>

      <div class="form-group m-2">
        <label for="">Expire Date</label>
        <input
          type="date"
          class="form-control"
          v-model="$v.order.expire_date.$model"
        />
        <validation-error :validation="$v.order.expire_date" />
      </div>
    </div>

    <div class="col-12 text-center">
      <router-link class="btn btn-secondary m-1" to="/cart">Back</router-link>
      <button class="btn btn-primary m-1" @click="submitOrder">
        Place Order
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import ValidationError from "./ValidationError";
import { required, email, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  components: {
    ValidationError,
  },
  data() {
    return {
      order: {
        name: "",
        email: "",
        contact: "",
        address: "",
        name_on_card: "",
        card_number: "",
        cvv: "",
        expire_date: "",
      },
    };
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
    }),
    ...mapGetters({
      total: "cart/totalPrice",
    }),
    editMode() {
      return this.$route.params["op"] == "edit";
    },
  },
  validations: {
    order: {
      name: { required },
      email: { required, email },
      contact: { required },
      address: { required },
      name_on_card: { required },
      card_number: { required, minLength: minLength(16), maxLength : maxLength(16)},
      cvv: { required, minLength: minLength(3), maxLength : maxLength(3)},
      expire_date: { required },
    },
  },
  methods: {
    ...mapActions({
      storeOrder: "orders/storeOrderAction",
      editOrder: "orders/editOrder",
      clearCartData: "cart/clearCartData",
    }),
    async submitOrder() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const order = new FormData();
        if (this.cart.itemCount == 0) {
          this.$alert("Your cart is empty.. Please add items to cart!");
        } else {
          if (this.editMode) {
            order._id = this.$route.params["id"];
            order.append("name", this.order.name);
            order.append("email", this.order.email);
            order.append("contact", this.order.contact);
            order.append("address", this.order.address);
            order.append("cart", JSON.stringify(this.cart));
            order.append("total", this.total);
            await this.editOrder(order);
            this.$alert("Edited Successfully!");
            
          } else {
            order.append("name", this.order.name);
            order.append("email", this.order.email);
            order.append("contact", this.order.contact);
            order.append("address", this.order.address);
            order.append("cart", JSON.stringify(this.cart));
            order.append("total", this.total);
            await this.storeOrder(order);
            this.$alert("Added Successfully!");
          }

          this.clearCartData();
          this.$router.push("/yourorders");
        }
      }
    },
  },
};
</script>
