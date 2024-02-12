<template>
  <div class="the-cart">
    <div class="the-cart__heading">Cart Items</div>
    <!-- {{ cartItems }} -->
    <table>
      <tr>
        <th>Item</th>
        <th>Weight</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Total</th>
        <th>
          <img src="/img/trash.png" class="action-icon--delete-small" alt="" />
        </th>
      </tr>
      <tr v-for="(item, key) in cartItems" :key="key">
        <td>{{ item.name }}</td>
        <td>{{ item.weight }}</td>
        <td>{{ item.price }}</td>
        <td>
          <input class="qty-input" type="number" v-model="item.quantity" />
        </td>
        <td class="text-right">{{ item.price * item.quantity }}</td>
        <td>
          <img
            src="/img/trash.png"
            class="action-icon--delete-small"
            alt=""
            @click="removeCart(item._id)"
          />
        </td>
      </tr>

      <tr>
        <td colspan="6">
          <div class="text-right">
            <hr />
            <strong>Grand Total : {{ totalPrice }}</strong>
          </div>
        </td>
      </tr>
    </table>
    <TheButton
      class="w-100 mt-4"
      v-if="!showingCustomerInfo"
      @click="showingCustomerInfo = true"
    >
      Checkout</TheButton
    >
    <!-- customer info -->
    <div class="mt-4" v-if="showingCustomerInfo">
      <label for="" class="block">Customer Name</label>
      <input
        type="text"
        placeholder="Enter customer name"
        class="w-100"
        v-model="customer"
      />
      <label for="" class="block mt-4">Customer Phone</label>
      <input
        type="text"
        placeholder="Enter customer phone"
        class="w-100"
        v-model="phone"
      />
      <TheButton class="w-100 mt-4" @click="confirmNow" :loading="confirming"
        >Confirm</TheButton
      >
    </div>
    <!-- customer info -->
  </div>
</template>

<script>
import TheButton from "./TheButton.vue";
import { mapState, mapActions } from "pinia";
import { useCartStore } from "../store/cartStore";
import privateService from "../service/privateService";
import { showErrorMsg, showSuccessMsg } from "../utils/function";

export default {
  data() {
    return {
      customer: "",
      phone: "",
      showingCustomerInfo: false,
      confirming: false,
    };
  },
  computed: {
    ...mapState(useCartStore, {
      cartItems: "products",
      totalPrice: "getTotalPrice",
    }),
  },
  methods: {
    ...mapActions(useCartStore, {
      removeCart: "removeCart",
      clearCart: "clearCart",
    }),
    confirmNow() {
      const orderData = {
        customer: this.customer,
        phone: this.phone,
        cartItems: this.cartItems,
      };
      this.confirming = true;
      privateService
        .sellDrugs(orderData)
        .then((res) => {
          showSuccessMsg(res);
          this.customer = "";
          this.phone = "";
          this.cartItems = false;
          this.clearCart();
          this.$router.push("/dashboard/selling-history");
        })
        .catch((err) => {
          showErrorMsg(err);
        })
        .finally(() => {
          this.confirming = false;
        });
      //console.log(orderData);
    },
  },
  components: {
    TheButton,
  },
};
</script>

<style>
</style>

<style>
.the-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 11px 22px;
}

.the-cart__heading {
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid rgb(173, 173, 173);
}

.qty-input {
  width: 50px;
  padding: 5px 7px !important;
}

.action-icon--delete-small {
  height: 14px !important;
}
</style>