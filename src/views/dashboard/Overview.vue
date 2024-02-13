<template>
  <h2>Overview</h2>
  <div class="text-center" v-if="gettingOverView">Loading...</div>
  <div v-else>
    <div class="row mt-3">
      <div class="col-4">
        <router-link class="card-link" to="/dashboard/vendor">
          <OverviewCard
            :title="overView.totalVendors"
            description="Vendors"
          ></OverviewCard>
        </router-link>
      </div>
      <div class="col-4">
        <router-link class="card-link" to="/dashboard/drug">
          <OverviewCard
            :title="overView.totalDrugs"
            description="Drugs"
          ></OverviewCard>
        </router-link>
      </div>
      <div class="col-4">
        <router-link class="card-link" to="/dashboard/selling-history">
          <OverviewCard
            :title="overView.totalSells"
            description="Sells"
          ></OverviewCard>
        </router-link>
      </div>
    </div>

    <h2 class="mt-4">This Week Statistics</h2>

    <Chart
      :size="{ width: 800, height: 400 }"
      :data="overView.thisWeekStat"
      :margin="margin"
      :direction="direction"
      class="mt-4"
    >
      <template #layers>
        <Grid strokeDasharry="2,2" />
        <Line
          :dataKeys="['name', 'sells']"
          :lineStyle="{ strokeWidth: '10px' }"
        />
      </template>
    </Chart>
  </div>
</template>

<script>
import { infoStore } from "../../data/info";
import { mapState } from "pinia";
import { useAuthStore } from "../../store/authStore";
import privateService from "../../service/privateService";
import OverviewCard from "../../components/OverviewCard.vue";
import { Chart, Grid, Line } from "vue3-charts";

export default {
  data() {
    return {
      projectName: infoStore.projectName,
      visitCount: infoStore.visitCount,
      overView: {},
      gettingOverView: true,
    };
  },
  components: {
    OverviewCard,
    Chart,
    Grid,
    Line,
  },
  computed: {
    ...mapState(useAuthStore, {
      username: "username",
      accessToken: "accessToken",
    }),
  },
  methods: {
    increase() {
      infoStore.visitCount += 1;
      console.log(infoStore.visitCount);
    },
    getOverView() {
      this.gettingOverView = true;
      privateService
        .getOverView()
        .then((res) => {
          this.overView = res.data;
        })
        .catch((err) => {})
        .finally(() => {
          this.gettingOverView = false;
        });
    },
  },
  mounted() {
    setTimeout(this.getOverView, 333);
  },
};
</script>