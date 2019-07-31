import Vue from 'vue'
import Router from 'vue-router'
import GradebooksApp from './components/GradebooksApp'
import LoginUser from './components/LoginUser'
import RegisterUser from './components/RegisterUser'
import ProffesorsApp from './components/ProffesorsApp'
import MyGradebook from './components/MyGradebook'
import AddGradebook from './components/AddGradebook'
import AddProffesor from './components/AddProffesor'
import SingleProffessor from './components/SingleProffessor'
import SingleGradebook from './components/SingleGradebook'

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
    },
    {
      path: '/proffessors/:id',
      name: 'single-proffessor',
      component: SingleProffessor
    },
    {
      path: '/gradebooks/:id',
      name: 'single-gradebook',
      component: SingleGradebook
    },
    {
      path: '/gradebooks/:id/edit',
      name: 'edit-gradebook',
      component: AddGradebook
    }
  ]
})
