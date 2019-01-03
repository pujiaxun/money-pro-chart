import Vue from "vue";
import VCharts from "v-charts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import createProvide from "@/common/createProvide";

Vue.config.productionTip = false;

Vue.use(VCharts);

new Vue({
  provide: createProvide(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
