<template>
  <div class="d-flex jc-between ai-center">
    <h2>All Vendors</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <!-- Show vendors data -->
  <div class="text-center" v-if="getingVendors">Loading...</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Sl</th>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(vData,i) in vendors" :key="vData.name">
        <td>{{ i+1}}</td>
        <td>{{vData.name}}</td>
        <td>{{vData.description}}</td>
        <td>
          <img src="/img/edit.png" alt="" class="action-icon" 
          @click="selectedVendor = vData; editModal = true;" 
          />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="selectedVendor = vData; deleteModal = true;" 
          />
        </td>
      </tr>
    </tbody>
  </table>

    <!-- Add Modal -->
  <TheModal v-model="addModal" heading="Add New Vendor">
    <form @submit.prevent="addNew">
      <label class="block">Vendore Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        v-model="newVendor.name"
        required
      />

      <label class="block mt-3">Description</label>
      <input
        type="text"
        placeholder="write short description"
        class="mt-1 w-100"
        v-model="newVendor.description"
        required
      />

      <TheButton class="w-100 mt-3" :loading="adding">Add</TheButton>
    </form>
  </TheModal>

     <!-- Edit Modal -->
     <TheModal v-model="editModal" heading="Update Vendor">
    <form @submit.prevent="editVendor">
      <label class="block">Vendore Name</label>
      <input
        type="text"
        placeholder="Enter vendor name"
        class="mt-1 w-100"
        v-model="selectedVendor.name"
        required
      />

      <label class="block mt-3">Description</label>
      <input
        type="text"
        placeholder="write short description"
        class="mt-1 w-100"
        v-model="selectedVendor.description"
        required
      />

      <TheButton class="w-100 mt-3" :loading="editing">Update</TheButton>
    </form>
  </TheModal>
  
  <!-- Delete Modal -->
  <TheModal v-model="deleteModal" heading="Are You Soure?">
    <p>
        Are you went to delete
        <strong>{{ selectedVendor.name }}</strong>
    </p>
    
    <TheButton class="mt-4" :loading="deleteing" @click="deleteVendor">Yes</TheButton>
    <TheButton class="ml-4" color="gray" @click="this.deleteModal=false">No</TheButton>
  </TheModal>

</template>

<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
export default {
  data() {
    return {
      addModal: false,
      editModal: false,
      deleteModal: false,
      newVendor: {
        name: "",
        description: "",
      },
      adding: false,
      editing: false,
      deleteing: false,
      getingVendors: false,
      vendors: [],
      selectedVendor:{}
    };
  },

  components: {
    TheButton,
    TheModal,
  },
  mounted() {
    this.getAllVendors();
  },
  methods: {
    resetForm() {
      this.newVendor = { name: "", description: "" };
    },
    getAllVendors() {
        this.getingVendors = true;
        axios
        .get(
          "https://api.rimoned.com/api/pharmacy-management/v1/private/vendor",
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          this.vendors = res.data;
          console.log(this.vendors)
        })
        .catch((err) => {
          let errMessage = "Something Wrong.!";
          if (err.response) {
            errMessage = err.response.data.message;
          }
          this.$eventBus.emit("toast", {
            type: "Error",
            message: errMessage,
          });
        })
        .finally(() => {
            this.getingVendors = false;
        });
    },
    addNew() {
      // console.log(this.newVendor);
      this.adding = true;
      axios
        .post(
          "https://api.rimoned.com/api/pharmacy-management/v1/private/vendor",
          this.newVendor,
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          this.$eventBus.emit("toast", {
            type: "Success",
            message: res.data.message,
          });
          this.addModal = false;
          this.resetForm();
          this.getAllVendors();
        })
        .catch((err) => {
          let errMessage = "Something Wrong.!";
          if (err.response) {
            errMessage = err.response.data.message;
          }
          this.$eventBus.emit("toast", {
            type: "Error",
            message: errMessage,
          });
        })
        .finally(() => {
          this.adding = false;
        });
    },
    deleteVendor(){
        this.deleteing = true;
      axios
        .delete(
          "https://api.rimoned.com/api/pharmacy-management/v1/private/vendor/"+
          this.selectedVendor._id,
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          this.$eventBus.emit("toast", {
            type: "Success",
            message: res.data.message,
          });
          //   localStorage.setItem("accessToken",res.data.accessToken)
          //   this.$router.push('/dashboard')
          this.deleteModal = false;
          this.getAllVendors();
        })
        .catch((err) => {
          let errMessage = "Something Wrong.!";
          if (err.response) {
            errMessage = err.response.data.message;
          }
          this.$eventBus.emit("toast", {
            type: "Error",
            message: errMessage,
          });
        })
        .finally(() => {
          this.deleteing = false;
        });
    },
    editVendor(){
        this.editing = true;
      axios
        .put(
          "https://api.rimoned.com/api/pharmacy-management/v1/private/vendor/"+
          this.selectedVendor._id,
          this.selectedVendor,
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          this.$eventBus.emit("toast", {
            type: "Success",
            message: res.data.message,
          });
          this.editModal = false;
        })
        .catch((err) => {
          let errMessage = "Something Wrong.!";
          if (err.response) {
            errMessage = err.response.data.message;
          }
          this.$eventBus.emit("toast", {
            type: "Error",
            message: errMessage,
          });
        })
        .finally(() => {
          this.editing = false;
        });
    }
  },
};
</script>