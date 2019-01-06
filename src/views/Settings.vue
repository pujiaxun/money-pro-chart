<template lang="pug">
.settings
  engel-coefficient-settings.setting-card

  router-link(to="/dashboard").link Go to dashboard
</template>

<script>
// TODO: let user select cate/subcate and $store it in localStorage
import EngelCoefficientSettings from "../components/settings/EngelCoefficientSettings.vue";

export default {
  name: "Settings",
  inject: ["$api"],
  components: { EngelCoefficientSettings }
};
</script>

<style lang="scss">
.settings {
  margin: 20px;

  .setting-card {
    width: 50%;

    .card-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
