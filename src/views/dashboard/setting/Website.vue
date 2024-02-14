<template>
  <div class="pt-3">
    <div class="text-center" v-if="getting">Loading...</div>
    <div v-else>
      <label class="block">Shop Name</label>
      <input type="text" v-model="webSettings.shopName" />
      <label class="mt-3 block">Address</label>
      <input type="text" v-model="webSettings.address" />
      <br />
      <TheButton class="inline-block mt-4" :loading="saving" @click="saveData"
        >Save</TheButton
      >
    </div>
  </div>
</template>

<script>
import TheButton from "../../../components/TheButton.vue";
import privateService from "../../../service/privateService";
import { showSuccessMsg, showErrorMsg } from "../../../utils/function";

export default {
  data() {
    return {
      getting: false,
      saving: false,
      webSettings: {
        shopName: "",
        address: "",
      },
    };
  },
  components: {
    TheButton,
  },
  methods: {
    getWebsiteSeetings() {
      this.getting = true;
      privateService
        .getWebsiteSettings()
        .then((res) => {
          if (res.data.shopName) {
            this.webSettings = res.data;
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.getting = false;
        });
    },
    saveData() {
      this.saving = true;
      privateService
        .updateWebsiteSettings(this.webSettings)
        .then((res) => {
          showSuccessMsg(res.data.message);
        })
        .catch((err) => {
          showErrorMsg(res);
        })
        .finally(() => {
          this.saving = false;
        });
      //console.log(this.accountSettings);
    },
  },
  mounted() {
    setTimeout(this.getWebsiteSeetings, 333);
  },
};
</script>

<style>
</style>