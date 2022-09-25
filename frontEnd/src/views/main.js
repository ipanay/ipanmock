import '../../public/css/layout.css';
import '../../public/css/dayneight.css';
// import '../../public/css/styles.css'; // 许老板cs
import Vue from 'vue';

import App from './App.vue';
import router from '../router/router';

// Vue.use(Ant);
new Vue({
  data: {
  },
  router,
  render: (h) => h(App),
}).$mount('#app');
