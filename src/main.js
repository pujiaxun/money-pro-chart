import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import createProvide from "@/common/createProvide";

Vue.config.productionTip = false;

new Vue({
  provide: createProvide(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
