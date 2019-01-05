<template lang="pug">
.paid-for-whom
  ve-pie(:data="chartData" :settings="settings" theme-name="dark" :title="title")
</template>

<script>
export default {
  name: "PaidForWhom",
  inject: ["$api"],
  data() {
    return {
      agents: [],
      bills: [],
      settings: {
        // roseType: "angle"
      },
      title: {
        text: "People You Spent Money For",
        left: "center",
        top: "bottom"
      }
    };
  },
  computed: {
    rows() {
      return this.bills.reduce((prev, curr) => {
        if (curr.agent) {
          const row = prev.find(item => item.agent === curr.agent);
          row.amount += curr.amount;
        }
        return prev;
      }, this.agents.map(agent => ({ agent, amount: 0 })));
    },
    chartData() {
      return {
        columns: ["agent", "amount"],
        rows: this.rows
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
          transactionType: "expense"
        }
      })
      .then(res => {
        this.bills = res.data.results;
      });
  }
};
</script>
