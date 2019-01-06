import Vue from "vue";
import VCharts from "v-charts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import createProvide from "@/common/createProvide";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(VCharts);
Vue.use(ElementUI);

new Vue({
  provide: createProvide(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
