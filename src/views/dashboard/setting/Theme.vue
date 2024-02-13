<template>
  <br />
  <div>Brand Color {{ brandColor }}</div>
  <div class="brand-color"></div>
  <input
    :value="brandColor"
    type="color"
    name="bc"
    id="bc"
    class="mt-2"
    @input="handleInput"
  />
  <br />
  <TheButton>Save</TheButton>
</template>

<script>
import TheButton from "../../../components/TheButton.vue";
import { useThemeStore } from "../../../store/themeStore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      bc: "#000",
    };
  },
  components: {
    TheButton,
  },
  computed: {
    ...mapState(useThemeStore, {
      brandColor: "brandColor",
    }),
  },
  methods: {
    ...mapActions(useThemeStore, {
      setBrandColor: "setBrandColor",
    }),

    handleInput(e) {
      this.setBrandColor(e.target.value);
      //   this.bc = e.traget.value;
    },
  },
};
</script>

<style scoped>
.brand-color {
  background-color: var(--brand-color);
  width: 444px;
  height: 444px;
}
</style>