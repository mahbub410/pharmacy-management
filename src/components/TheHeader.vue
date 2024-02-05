
<template>
  <div class="the-header">
    <div class="p-relative ml-7">
      <input
        type="text"
        class="the-header__search"
        placeholder="Search.."
        @focus="searchFocus = true"
        @blur="handleBlur"
        v-model="searchString"
      />

      <div class="search-results" v-show="searchFocus">
        <table>
          <tr
            class="result-item"
            v-for="drug in drugs"
            :key="drug.name"
            @click="handleClick(drug)"
          >
            <td>{{ drug.name }}</td>
            <td>{{ drug.weight }}</td>
            <td>{{ drug.vendore }}</td>
            <td>{{ drug.quantity }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="avatar-wrapper">
      <div class="avatar" @click="showAvatar = !showAvatar">T</div>
      <div class="avatar__overflow" v-show="showAvatar">
        <div class="avatar__overflow-title">
          test@gmail.com
          <router-link to="/dashboard/settings/account">
            <div
              class="avatar__overflow-link mt-2"
              @click="
                showAvatar = false;
                $router.push('/dashboard/settings');
              "
            >
              Setting
            </div>
          </router-link>
          <router-link to="#" @click="logout">
            <div class="avatar__overflow-link mb-2">Logout</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <TheModal v-model="detailsModal" heading="Drug Details">
    <div>
      <table class="drug-details">
        <tr>
          <th>Name:</th>
          <td>{{ selectedDrug.name }}</td>
        </tr>
        <tr>
          <th>Type:</th>
          <td>{{ selectedDrug.type }}</td>
        </tr>
        <tr>
          <th>Weight:</th>
          <td>{{ selectedDrug.weight }}</td>
        </tr>
        <tr>
          <th>Vendor:</th>
          <td>{{ selectedDrug.vendor }}</td>
        </tr>
        <tr>
          <th>Price:</th>
          <td>{{ selectedDrug.price }}</td>
        </tr>
        <tr>
          <th>Available:</th>
          <td>{{ selectedDrug.quantity }}</td>
        </tr>
        <tr>
          <th>Quantity:</th>
          <td><input type="number" v-model="quantity" ref="qtyInput" /></td>
        </tr>
      </table>
      <TheButton @click="addToCart" class="w-100 mt-4">Add to Cart</TheButton>
    </div>
  </TheModal>
</template>

<script>
import privateService from "../service/privateService";
import TheModal from "./TheModal.vue";
import TheButton from "./TheButton.vue";
import { showErrorMsg } from "../utils/function";
import { mapActions } from "pinia";
import { useCartStore } from "../store/cartStore";

export default {
  data() {
    return {
      showAvatar: false,
      searchString: "",
      drugs: [],
      searchFocus: false,
      lastSearchtime: 0,
      detailsModal: false,
      selectedDrug: {},
      quantity: "",
    };
  },
  components: {
    TheModal,
    TheButton,
  },
  methods: {
    ...mapActions(useCartStore, {
      addCartStore: "addCart",
    }),
    logout() {
      localStorage.removeItem("accessToken");
      location.href = "/";
    },
    searchDrug(searchString, lastSearchtime) {
      privateService
        .searchDrug(searchString)
        .then((res) => {
          if (lastSearchtime === this.lastSearchtime) {
            this.drugs = res.data;
            console.log("update");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleClick(drug) {
      this.selectedDrug = drug;
      this.detailsModal = true;
      //console.log("click handle..");
    },
    handleBlur() {
      setTimeout(() => {
        this.searchFocus = false;
      }, 1000);
      // console.log("blur handle...")
    },
    addToCart() {
      // console.log(this.selectedDrug)
      //console.log(this.quantity);
      if (!this.quantity) {
        showErrorMsg("Please enter quqntity");
        this.$refs.qtyInput.focus();
      } else {
        if (this.quantity > this.selectedDrug.quantity) {
          showErrorMsg("Note enough available quqntity.!!");
          this.$refs.qtyInput.focus();
        } else {
          console.log("item add to card");
          this.addCartStore({ ...this.selectedDrug, quantity: this.quantity });
          this.detailsModal = false;
          this.quantity = 1;
          this.searchString = "";
          //console.log(this.addCartStore(this.selectedDrug));
        }
      }
      //TODO
    },
  },
  watch: {
    searchString(newValue) {
      if (newValue) {
        this.lastSearchtime = Date.now();
        this.searchDrug(newValue, this.lastSearchtime);
        //console.log(newValue)
      } else {
        this.drugs = [];
      }
    },
  },
};
</script>

<style>
.the-header {
  /* background-color: rgb(117, 20, 129); */
  padding: 9px 22px;
  /* color: rgb(221, 221, 221); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.the-header__search {
  width: 555px;
}

.the-header a {
  color: rgb(233, 168, 27);
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 33px;
  height: 33px;
  background-color: var(--brand-color);
  border-radius: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
}

.avatar__overflow {
  position: absolute;
  right: -8px;
  top: 50px;
  width: 186px;
  background: #fff;
  box-shadow: 0px 8px 6px 4px rgb(0 0 0 / 20%);
  min-height: 111px;
  z-index: 9999;
  border-radius: 0 0 3px 3px;
}

.avatar__overflow a {
  text-decoration: none;
}

.avatar__overflow-title {
  padding: 3px 9px;
  background-color: #ffecec;
  text-align: center;
}

.avatar__overflow-link {
  width: 100%;
  cursor: pointer;
  padding: 5px 15px;
  font-size: 16px;
  color: #000;
}

.avatar__overflow-link:hover {
  background-color: rgb(241, 241, 241);
}

.search-results {
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 46px;
  min-height: 111px;
  max-height: 366px;
  box-shadow: 0 16px 11px 5px rgb(0 0 0 / 20%);
  width: 555px;
  border-radius: 0 0 5px 5px;
  overflow-y: auto;
}

.search-results table tr:nth-child(odd) {
  background-color: rgb(250, 250, 250);
}

.search-results table tr:nth-child(odd):hover {
  background-color: rgb(215, 248, 208);
}

.search-results table tr {
  cursor: pointer;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(196, 196, 196);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(143, 143, 143);
}

table.drug-details th {
  background: none;
}

table.drug-details tr {
  background: none;
}

.p-relative {
  position: relative;
}
</style>