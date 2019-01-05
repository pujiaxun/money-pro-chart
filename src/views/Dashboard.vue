<template lang="pug">
  .dashboard
    paid-for-whom.chart
    weekday-lunch.chart
    router-link(to="/settings") Go to Settings
</template>

<script>
import PaidForWhom from "../components/PaidForWhom.vue";
import WeekdayLunch from "../components/WeekdayLunch.vue";

export default {
  inject: ["$api"],
  components: { PaidForWhom, WeekdayLunch }
};
</script>

<style lang="scss">
.dashboard {
  display: flex;
  flex-wrap: wrap;
  background-color: #333;
  color: #fff;

  .chart {
    width: 50%;
    flex-shrink: 0;
  }
}
</style>
