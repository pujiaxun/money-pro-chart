<template lang="pug">
  .about
    div
      ve-histogram(:data="chartData")
    h1 ENUMS
    div {{ agents }}
    h1 BILLS
    div {{ bills }}
</template>

<script>
export default {
  inject: ["$api"],
  data() {
    return {
      agents: [],
      bills: []
    };
  },
  computed: {
    chartData() {
      return {
        columns: ["createdAt", ...this.agents],
        rows: this.bills.map(bill => {
          return {
            // TODO merge Dates
            createdAt: bill.createdAt,
            [bill.agent]: bill.amount
          };
        })
      };
    }
  },
  created() {
    this.$api.get("enums", { params: { field: "agent" } }).then(res => {
      this.agents = res.data.results.map(res => res.val);
    });

    this.$api
      .get("bills", {
        params: {
          transactionType: "支出"
        }
      })
      .then(res => {
        this.bills = res.data.results;
      });
  }
};
</script>
