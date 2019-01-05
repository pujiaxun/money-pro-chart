<template lang="pug">
  .dashboard
    paid-for-whom

</template>

<script>
import PaidForWhom from "../components/PaidForWhom.vue";

export default {
  inject: ["$api"],
  components: { PaidForWhom }
};
</script>
