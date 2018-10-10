<template lang="pug">
  .about
    h1 This is an about page
    div {{ demoResult }}
</template>

<script>
export default {
  inject: ["$api"],
  data() {
    return {
      demoResult: ""
    };
  },
  created() {
    this.$api.get("helloworld").then(res => {
      this.demoResult = res;
    });
  }
};
</script>
