import VueRouter from 'vue-router'
import home from './home.vue'
import discover from './discover.vue'
import gif from './gif.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: home },
    { path: '/gif/:templateName', component: gif },
    { path: '/discover', component: discover }
  ]
})

export default router