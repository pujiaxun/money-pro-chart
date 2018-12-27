<template lang="pug">
  .about
    h1 ENUMS
    div {{ enums }}
    h1 BILLS
    div {{ bills }}
</template>

<script>
export default {
  inject: ["$api"],
  data() {
    return {
      enums: [],
      bills: []
    };
  },
  created() {
    this.$api.get("enums", { params: { field: "account" } }).then(res => {
      this.enums = res.data;
    });

    this.$api
      .get("bills", {
        params: {
          agent: "DWF",
          amount: {
            // min: 100,
            max: 300
          },
          desc: "自动"
        }
      })
      .then(res => {
        this.bills = res.data;
      });
  }
};
</script>
