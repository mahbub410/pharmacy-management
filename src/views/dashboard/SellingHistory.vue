<template>
  <div>
    <h2>Selling-History</h2>
    <div class="text-center" v-if="gettingHistory">Loading...</div>
    <table class="mt-4" v-else>
      <tr>
        <th>Sl</th>
        <th>Order Id</th>
        <th>Customer Name</th>
        <th>Customer Phone</th>
        <th>Total Item</th>
        <th>Action</th>
      </tr>
      <tr v-for="(histData, i) in history" :key="histData._id">
        <td>{{ i + 1 }}</td>
        <td>{{ histData._id }}</td>
        <td>{{ histData.customer }}</td>
        <td>{{ histData.phone }}</td>
        <td>{{ Object.keys(histData.cartItems).length }}</td>
        <td>
          <img
            src="/img/eye.png"
            class="action-icon action-icon--delete ml3"
            alt=""
            @click="
              selectedHistoryIndex = i;
              detailsModal = true;
            "
          />
          <img
            src="/img/trash.png"
            class="action-icon action-icon--delete ml3"
            alt=""
            @click="
              selectedHistoryIndex = i;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </table>

    <TheModal v-model="detailsModal" heading="Order Details" size="lg">
      <div class="d-flex jc-between">
        <div>
          <strong>Customer: </strong>{{ selectedOrderHistory.customer }}
        </div>
        <div><strong>Phone: </strong>{{ selectedOrderHistory.phone }}</div>
      </div>
      <h3 class="mt-4 mb-2">Cart Items</h3>
      <div class="mt-2">
        <table>
          <tr>
            <th>Item</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Qty</th>
            <th class="text-center">Total</th>
          </tr>
          <tr v-for="item in selectedOrderHistory.cartItems" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.weight }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td class="text-right">{{ item.quantity * item.price }}</td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="text-right">
                <hr />
                <strong>Grand Total: {{ totalPrice }}</strong>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </TheModal>
    <TheModal v-model="deleteModal" heading="Are You sure?">
      <p>Do you really want to delete "{{ selectedOrderHistory.customer }}"?</p>
      <div class="mt-3">
        <TheButton @click="deleteHistory" :loading="deleting">Yes</TheButton>
        <TheButton color="gray" class="ml-4" @click="deleteModal = false"
          >No</TheButton
        >
      </div>
    </TheModal>
  </div>
</template>

<script>
import TheModal from "../../components/TheModal.vue";
import TheButton from "../../components/TheButton.vue";
import privateService from "../../service/privateService";
import { showErrorMsg, showSuccessMsg } from "../../utils/function";

export default {
  data() {
    return {
      history: [],
      gettingHistory: true,
      deleting: false,
      deleteModal: false,
      detailsModal: false,
      selectedHistoryIndex: -1,
    };
  },
  computed: {
    selectedOrderHistory() {
      return this.history[this.selectedHistoryIndex] || { cartItems: {} };
    },

    totalPrice() {
      let tp = 0;
      for (let key in this.selectedOrderHistory.cartItems) {
        tp +=
          this.selectedOrderHistory.cartItems[key].price *
          this.selectedOrderHistory.cartItems[key].quantity;
      }
      //console.log(tp);
      return tp;
    },
  },
  components: {
    TheButton,
    TheModal,
  },
  methods: {
    getHistory() {
      this.gettingHistory = true;
      privateService
        .getOrderHistory()
        .then((res) => {
          this.history = res.data;
        })
        .catch((err) => {})
        .finally(() => {
          this.gettingHistory = false;
        });
    },
    deleteHistory() {
      this.deleting = true;
      privateService
        .deleteOrderHistory(this.selectedOrderHistory._id)
        .then((res) => {
          showSuccessMsg(res.data.message);
          this.deleteModal = false;
          this.getHistory();
        })
        .catch((err) => {
          showErrorMsg(err);
        })
        .finally(() => {
          this.deleting = false;
        });
    },
  },
  mounted() {
    setTimeout(this.getHistory, 333);
  },
};
</script>