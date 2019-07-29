import Vue from 'vue'
import Router from 'vue-router'
import GradebooksApp from './components/GradebooksApp.vue'
import LoginUser from './components/LoginUser.vue'
import RegisterUser from './components/RegisterUser.vue'
import ProffesorsApp from './components/ProffesorsApp.vue'
import MyGradebook from './components/MyGradebook.vue'
import AddGradebook from './components/AddGradebook.vue'
import AddProffesor from './components/AddProffesor.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'gradebooks',
      component: GradebooksApp
    },
    {
      path: '/login',
      name: 'login-user',
      component: LoginUser
    },
    {
      path: '/register',
      name: 'register-user',
      component: RegisterUser
    },
    {
      path: '/teachers',
      name: 'all-teacher',
      component: ProffesorsApp
    },
    {
      path: '/my-gradebook',
      name: 'my-gradebook',
      component: MyGradebook
    },
    {
      path: '/gradebooks/create',
      name: 'create-gradebooks',
      component: AddGradebook
    },
    {
      path: '/professors/create',
      name: 'create-proffesor',
      component: AddProffesor
    }
  ]
})
