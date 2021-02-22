import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from './firebaseDB'
import icon from "bootstrap-icons/font/bootstrap-icons.css";
import VueCardCarousel from 'vue-card-carousel';


import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueCardCarousel)
Vue.config.productionTip = false

new Vue({
  icon,
  router,
  firebase,
  render: h => h(App),
}).$mount('#app')