import "@/style/main.css";

// Import Vue
import Vue from 'vue';

import Vuelidate from 'vuelidate';
// Import Vue App, routes, store
import store from "@/store/store"
import router from "@/router/router"
import App from './App';


Vue.use(Vuelidate);
window.eventBus = new Vue(); 
 

Vue.config.productionTip = false

new Vue({
    el: '#app',
    store: store, 
    router: router,
    render: h => h(App),
});
