import VueRouter from 'vue-router'
import home from './home.vue'
import discover from './discover.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: home },
    { path: '/discover', component: discover }
  ]
})

export default router
