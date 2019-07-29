import Vue from 'vue'
import Vuex from 'vuex'
import { LoginStoreModule } from './LoginStoreModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    LoginStoreModule
  }
})