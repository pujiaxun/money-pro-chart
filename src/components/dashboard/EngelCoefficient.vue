<template lang="pug">
.engel-coefficient
  ve-pie(
    :data="chartData"
    :settings="settings"
    theme-name="dark"
    :title="title"
  )
</template>

<script>
export default {
  name: "EngelCoefficient",
  inject: ["$api"],
  data() {
    return {
      bills: [],

      title: {
        text: "Engel's Coefficient",
        left: "center",
        top: "bottom"
      }
    };
  },
  computed: {
    amount() {
      let total = 0;
      let food = 0;
      this.bills.forEach(bill => {
        total += bill.amount;
        // TODO setting
        if (bill.category === "食物") {
          food += bill.amount;
        }
      });

      return { food, total, other: total - food };
    },
    rate() {
      return this.amount.food / this.amount.total;
    },
    engelDesc() {
      const rate = this.rate;
      if (rate >= 0.6) {
        return "A poor guy";
      } else if (rate >= 0.5) {
        return "Just not hungry";
      } else if (rate >= 0.4) {
        return "Kinda comfortable";
      } else if (rate >= 0.3) {
        return "Reletively rich";
      } else if (rate >= 0.2) {
        return "Rich";
      }
      return "Rich and bitch";
    },
    chartData() {
      return {
        columns: ["category", "amount"],
        rows: [
          { category: "Food", amount: this.amount.food },
          { category: "Others", amount: this.amount.other }
        ]
      };
    },
    settings() {
      return {
        label: {
          formatter: ({ name, value }) => {
            console.log(value);
            if (name === "Food") {
              return `${name}\n${(this.rate * 100).toFixed(2)}%\n${
                this.engelDesc
              }`;
            }
            return name;
          }
        },
        labelMap: {
          category: "Category",
          amount: "Amount"
        }
      };
    }
  },
  created() {
    this.$api
      .get("bills", {
        params: { transactionType: "expense" }
      })
      .then(res => {
        this.bills = res.data.results;
      });
  }
};
</script>
