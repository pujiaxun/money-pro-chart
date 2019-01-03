<template lang="pug">
  .about
    div
      ve-pie(:data="chartData")
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
        columns: ["agent", "amount"],
        rows: this.bills.reduce((prev, curr) => {
          if (curr.agent) {
            const row = prev.find(item => item.agent === curr.agent);
            row.amount += curr.amount;
          }
          return prev;
        }, this.agents.map(agent => ({ agent, amount: 0 })))
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
