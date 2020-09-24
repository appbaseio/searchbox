import Vue from "vue";
import App from "./App.vue";
import { ClientTable } from "vue-tables-2";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
Vue.use(ClientTable, [], false, "bootstrap4", "default");
