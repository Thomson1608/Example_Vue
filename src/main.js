import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
// import * as VueGoogleMaps from 'vue2-google-maps'
import VueFire from "vuefire";

Vue.use(VueFire);
Vue.config.productionTip = false;
// Vue.use(VueGoogleMaps, {
//   installComponents: true,
//   load: {
//     key: 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
//     libraries: 'places', // This is required if you use the Autocomplete plugin
//   }
// });
Vue.use(BootstrapVue);

new Vue({
  el: "#app",
  render: h => h(App)
});
