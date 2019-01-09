<template lang="pug">
.paid-for-whom
  ve-histogram(
    :data="chartData"
    :settings="settings"
    theme-name="dark"
    :title="title"
  )
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
        axisSite: { right: ["count"] },
        yAxisType: ["KMB", "KMB"],
        yAxisName: ["Amount", "Count"],
        labelMap: {
          amount: "Amount",
          count: "Count"
        }
      },
      title: {
        text: "People I Spent Money For",
        left: "center",
        top: "bottom"
      }
    };
  },
  computed: {
    rows() {
      // TODO: order
      return this.bills.reduce((prev, curr) => {
        if (curr.agent) {
          const row = prev.find(item => item.agent === curr.agent);
          row.amount += curr.amount;
          row.count += 1;
        }
        return prev;
      }, this.agents.map(agent => ({ agent, amount: 0, count: 0 })));
    },
    chartData() {
      return {
        columns: ["agent", "amount", "count"],
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
