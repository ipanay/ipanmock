import Vue from 'vue';
import VueRouter from 'vue-router';
import loginhead from '../views/login/header/main.vue';
import login from '../views/login/view/main.vue';
import home from '../views/home/main.vue';
// eslint-disable-next-line import/no-unresolved
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
import proDetail from '../views/proDetail/main.vue';

const routes = [
  {
    path: '/',
    component: loginhead,
  },
  {
    path: '/login',
    component: login,
  },
  {
    name: 'home',
    path: '/home',
    component: home,
    // component: (resolve) => require(['../views/home/main.vue'], resolve),
  },
  {
    name: 'projectdetail',
    path: '/projectdetail',
    component: proDetail,
  },
];
Vue.use(VueRouter);
const router = new VueRouter({
  baseUrl: '/',
  mode: 'hash',
  routes,
});
export default router;
