import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import { ref } from 'vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AdminView from '../views/AdminView.vue'
import AddBookView from '../views/AddBookView.vue'


const isAuthenticated = ref(null)
const userRole = ref(null)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },          
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { isAuthenticated, userRole }
export default router