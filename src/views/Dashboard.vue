<template lang="pug">
  .dashboard
    paid-for-whom.chart
    weekday-lunch.chart
    engel-coefficient.chart
    router-link(to="/settings").link Go to Settings
</template>

<script>
import PaidForWhom from "../components/dashboard/PaidForWhom.vue";
import WeekdayLunch from "../components/dashboard/WeekdayLunch.vue";
import EngelCoefficient from "../components/dashboard/EngelCoefficient.vue";

export default {
  inject: ["$api"],
  components: { PaidForWhom, WeekdayLunch, EngelCoefficient }
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
    margin: 50px 0;
  }

  .link {
    color: #fff;
  }
}
</style>
