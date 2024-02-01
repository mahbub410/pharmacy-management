<template>
  <div class="d-flex jc-between ai-center">
    <h2>All Drugs</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <!-- Show drugs data -->
  <div class="text-center" v-if="getingDrugs">Loading...</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Sl</th>
        <th>Name</th>
        <th>Type</th>
        <th>Weight</th>
        <th>Vendor</th>
        <th>Price</th>
        <th>Quentity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(vData, i) in drugs" :key="vData.name">
        <td>{{ i + 1 }}</td>
        <td>{{ vData.name }}</td>
        <td>{{ vData.type }}</td>
        <td>{{ vData.weight }}</td>
        <td>{{ vData.vendor }}</td>
        <td>{{ vData.price }}</td>
        <td>{{ vData.quantity }}</td>
        <td>
          <img
            src="/img/edit.png"
            alt=""
            class="action-icon"
            @click="editBtnHandler(vData)"
          />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="
              selectedDrug = vData;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Add Modal -->
  <TheModal v-model="addModal" heading="Add New Drug">
    <form @submit.prevent="addNew">
      <label class="block">Select Drug Type</label>
      <div class="mt-2">
        <label>
          <input
            type="radio"
            name="drugtype"
            value="Tab"
            v-model="newDrug.type"
          />
          Tab
        </label>
        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Capsul"
            v-model="newDrug.type"
          />
          Capsul
        </label>
        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Syrup"
            v-model="newDrug.type"
          />
          Syrup
        </label>
        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Suppository"
            v-model="newDrug.type"
          />
          Suppository
        </label>
      </div>

      <label class="block">Drug Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        v-model="newDrug.name"
        required
      />

      <label class="block mt-3">weight</label>
      <input
        type="text"
        placeholder="write short description"
        class="mt-1 w-100"
        v-model="newDrug.weight"
        required
      />

      <label class="block mt-3">Vendor</label>
      <select v-model="newDrug.vendor">
        <option value="">Select Vendore</option>
        <option
          v-for="vendor in vendors"
          :key="vendor.name"
          :value="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="write short description"
        class="mt-1 w-100"
        v-model="newDrug.price"
        required
      />

      <label class="block mt-3">Quentity</label>
      <input
        type="text"
        placeholder="write short description"
        class="mt-1 w-100"
        v-model="newDrug.quantity"
        required
      />

      <TheButton class="w-100 mt-3" :loading="adding">Add</TheButton>
    </form>
  </TheModal>

  <!-- Edit Modal -->
  <TheModal v-model="editModal" heading="Update Vendor">
    <form @submit.prevent="editDrug">
      <label class="block">Select Drug Type</label>
      <div class="mt-2">
        <label>
          <input
            type="radio"
            name="drugtype"
            value="Tab"
            v-model="selectedDrug.type"
          />
          Tab
        </label>
        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Capsul"
            v-model="selectedDrug.type"
          />
          Capsul
        </label>
        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Syrup"
            v-model="selectedDrug.type"
          />
          Syrup
        </label>
        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Suppository"
            v-model="selectedDrug.type"
          />
          Suppository
        </label>
      </div>

      <label class="block">Drug Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        v-model="selectedDrug.name"
        required
      />

      <label class="block mt-3">weight</label>
      <input
        type="text"
        placeholder="write short description"
        class="mt-1 w-100"
        v-model="selectedDrug.weight"
        required
      />

      <label class="block mt-3">Vendor</label>
      <select v-model="selectedDrug.vendor">
        <option value="">Select Vendore</option>
        <option
          v-for="vendor in vendors"
          :key="vendor.name"
          :value="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="write short description"
        class="mt-1 w-100"
        v-model="selectedDrug.price"
        required
      />

      <label class="block mt-3">Quentity</label>
      <input
        type="text"
        placeholder="write short description"
        class="mt-1 w-100"
        v-model="selectedDrug.quantity"
        required
      />

      <TheButton class="w-100 mt-3" :loading="editing">Update</TheButton>
    </form>
  </TheModal>

  <!-- Delete Modal -->
  <TheModal v-model="deleteModal" heading="Are You Soure?">
    <p>
      Are you went to delete
      <strong>{{ selectedDrug.name }}</strong>
    </p>

    <TheButton class="mt-4" :loading="deleteing" @click="deleteDrug"
      >Yes</TheButton
    >
    <TheButton class="ml-4" color="gray" @click="this.deleteModal = false"
      >No</TheButton
    >
  </TheModal>
</template>
  
  <script>
// import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import { showErrorMsg, showSuccessMsg } from "../../utils/function";
import privateService from "../../service/privateService";

export default {
  data() {
    return {
      addModal: false,
      editModal: false,
      deleteModal: false,
      newDrug: {
        name: "",
        weight: "",
        type: "",
        vendor: "",
        price: "",
        quantity: "",
      },
      adding: false,
      editing: false,
      deleteing: false,
      getingDrugs: false,
      drugs: [],
      selectedDrug: {},
      vendors: [],
    };
  },

  components: {
    TheButton,
    TheModal,
  },
  mounted() {
    setTimeout(this.getAlldrugs, 100);
    setTimeout(this.getAllvendors, 100);
  },
  methods: {
    resetForm() {
      this.newDrug = {
        name: "",
        weight: "",
        type: "",
        vendor: "",
        price: "",
        quantity: "",
      };
    },

    getAlldrugs() {
      this.getingDrugs = true;
      privateService
        .getDrugs()
        .then((res) => {
          this.drugs = res.data;
        })
        .catch((err) => {
          showErrorMsg(err);
        })
        .finally(() => {
          this.getingDrugs = false;
        });
    },

    getAllvendors() {
      //this.getingDrugs = true;
      privateService
        .getVendors()
        .then((res) => {
          this.vendors = res.data;
        })
        .catch((err) => {
          showErrorMsg(err);
        })
        .finally(() => {
          //this.getingDrugs = false;
        });
    },

    addNew() {
      // console.log(this.newDrug);
      this.adding = true;
      privateService
        .addDrug(this.newDrug)
        .then((res) => {
          //console.log(res.data);
          showSuccessMsg(res);
          this.addModal = false;
          this.resetForm();
          this.getAlldrugs();
        })
        .catch((err) => {
          showErrorMsg(err);
        })
        .finally(() => {
          this.adding = false;
        });
    },

    deleteDrug() {
      this.deleteing = true;
      privateService
        .deleteDrug(this.selectedDrug._id)
        .then((res) => {
          showSuccessMsg(res);
          this.deleteModal = false;
          this.getAlldrugs();
        })
        .catch((err) => {
          showErrorMsg(err);
        })
        .finally(() => {
          this.deleteing = false;
        });
    },

    editDrug() {
      this.editing = true;
      privateService
        .updateDrug(this.selectedDrug)
        .then((res) => {
          showSuccessMsg(res);
          this.editModal = false;
          this.getAlldrugs();
        })
        .catch((err) => {
          showErrorMsg(err);
        })
        .finally(() => {
          this.editing = false;
        });
    },

    editBtnHandler(vData) {
      this.editModal = true;
      this.selectedDrug.name = vData.name;
      this.selectedDrug.weight = vData.weight;
      this.selectedDrug.vendor = vData.vendor;
      this.selectedDrug.type = vData.type;
      this.selectedDrug.price = vData.price;
      this.selectedDrug.quantity = vData.quantity;
      this.selectedDrug._id = vData._id;
      console.log(vData);
    },
  },
};
</script>