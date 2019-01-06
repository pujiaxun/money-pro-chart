<template lang="pug">
.weekday-lunch
  ve-line(
    :data="chartData"
    :settings="settings"
    theme-name="dark"
    :mark-line="markLine"
    :title="title"
  )
</template>

<script>
import "echarts/lib/component/markLine";
import format from "date-fns/format";

export default {
  name: "WeekdayLunch",
  inject: ["$api"],
  data() {
    return {
      bills: [],
      title: {
        text: "My Weekday Lunch",
        left: "center",
        top: "bottom"
      },
      markLine: {
        label: {
          position: "start"
        },
        data: [
          {
            name: "Average",
            type: "average"
          }
        ]
      },
      settings: {
        area: true,
        labelMap: {
          amount: "Amount",
          createdAt: "Created At"
        }
      }
    };
  },
  computed: {
    weekdayLunchBills() {
      return this.bills.filter(bill => {
        if (!bill.createdAt) return false;
        const createdDate = new Date(bill.createdAt);
        const hour = createdDate.getHours();
        const day = createdDate.getDay();
        // * holiday
        const date = createdDate.getDate();
        const month = createdDate.getMonth();
        if (month === 9 && date <= 7) return false;
        return hour > 10 && hour <= 14 && day > 0 && day < 6;
      });
    },
    chartData() {
      return {
        columns: ["createdAt", "amount"],
        rows: this.weekdayLunchBills.reduce((prev, curr) => {
          const currDate = this.formatDate(curr.createdAt);
          const lastBill = prev[prev.length - 1];

          // Merge bills by their dates
          if (lastBill && this.formatDate(lastBill.createdAt) === currDate) {
            lastBill.amount += curr.amount;
          } else {
            prev.push({
              amount: curr.amount,
              createdAt: currDate
            });
          }
          return prev;
        }, [])
      };
    }
  },
  created() {
    this.$api
      .get("bills", {
        // TODO setting
        params: { subCategory: "用餐", transactionType: "expense" }
      })
      .then(res => {
        this.bills = res.data.results;
      });
  },
  methods: {
    formatDate(dateString) {
      return format(new Date(dateString), "YYYY-MM-DD");
    }
  }
};
</script>
