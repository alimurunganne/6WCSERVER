import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import Student from '../pages/student.vue'
import Admin from '../pages/admin.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/student', component: Student },
  { path: '/admin', component: Admin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
