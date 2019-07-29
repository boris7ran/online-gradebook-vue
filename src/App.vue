<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Gradebooks</router-link>
      <router-link class="navbar-brand" v-if="!user" to="/login">Login</router-link>
      <router-link class="navbar-brand" v-if="!user" to="/register">Register</router-link>
      <router-link class="navbar-brand" v-if="user" to="/teachers">All Professors</router-link>
      <router-link class="navbar-brand" v-if="user" to="/my-gradebook">My Gradebook</router-link>
      <router-link class="navbar-brand" v-if="user" to="/gradebooks/create">Add Gradebook</router-link>
      <router-link class="navbar-brand" v-if="user" to="/professors/create">Add Professor</router-link>
      <button v-if="user" @click="logout">Logout</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { authService } from "./services/AuthService";

export default {
  name: "app",

  methods: {
    logout() {
      authService.logout();
      this.setUser(null);
      localStorage.removeItem('user');
      this.$router.push("/login");
    },

    ...mapMutations({
      setUser: 'LoginStoreModule/setUser'
    })
  },

  computed: {
    ...mapGetters({
      user: "LoginStoreModule/getUser"
    })
  }
};
</script>

<style>
</style>
