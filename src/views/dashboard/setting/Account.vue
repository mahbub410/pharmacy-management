<template>
  <div class="pt-3">
    <div class="text-center" v-if="getting">Loading...</div>
    <div v-else>
      <label class="block">Full Name</label>
      <input type="text" v-model="accountSettings.fullName" />
      <label class="mt-3 block">Email</label>
      <input type="text" v-model="accountSettings.email" />
      <label class="mt-3 block">Phone</label>
      <input type="text" v-model="accountSettings.phone" />
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
      accountSettings: {
        fullName: "",
        email: "",
        phone: "",
      },
    };
  },
  components: {
    TheButton,
  },
  methods: {
    getAccountSeetings() {
      this.getting = true;
      privateService
        .getAccountSettings()
        .then((res) => {
          if (res.data.fullName) {
            this.accountSettings = res.data;
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
        .updateAccountSettings(this.accountSettings)
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
    setTimeout(this.getAccountSeetings, 333);
  },
};
</script>

<style>
</style>