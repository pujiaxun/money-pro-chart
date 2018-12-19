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
    this.$api.get("enums", { params: { field: "account" } }).then(res => {
      this.demoResult = res.data;
    });
  }
};
</script>
