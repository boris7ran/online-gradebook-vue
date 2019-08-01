import { authService } from './../services/AuthService'

const user = JSON.parse(localStorage.getItem('user')) || null;

export const LoginStoreModule = {
  namespaced: true,

  state: {
    user,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setProffessor(state, payload) {
      state.proffessor = payload;
    }
  },

  actions: {
    login(context, { email, password }) {
      return authService.login(email, password)
        .then( (user) => {
          context.commit('setUser', user);
        }).catch ( error => {
          console.log(error);
        })
    }
  },

  getters: {
    getUser(state) {
      return state.user;
    }
  }
}