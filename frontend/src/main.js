import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueMDCAdapter from 'vue-mdc-adapter';
import infiniteScroll from 'vue-infinite-scroll';

Vue.config.productionTip = false;

Vue.use(VueMDCAdapter);

Vue.use(infiniteScroll);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
