<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand pr-1" to="/">Gradebooks</router-link>
      <router-link class="navbar-brand pr-1" v-if="user" to="/teachers">All Professors</router-link>
      <router-link class="navbar-brand pr-1" v-if="user" to="/my-gradebook">My Gradebook</router-link>
      <router-link class="navbar-brand pr-1" v-if="user" to="/gradebooks/create">Add Gradebook</router-link>
      <router-link class="navbar-brand pr-1" v-if="user" to="/professors/create">Add Professor</router-link>
      <div class="form-inline mt-2 mt-md-0 offset-3">
        <router-link class="navbar-brand pr-1" v-if="!user" to="/login">Login</router-link>
        <router-link class="navbar-brand pr-1" v-if="!user" to="/register">Register</router-link>
        <div>
          <button
            class="nav-link btn btn-outline-success my-2 my-sm-0"
            v-if="user"
            @click="logout"
          >Logout</button>
        </div>
      </div>
    </nav>
    <router-view />
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
      localStorage.removeItem("user");
      this.$router.push("/login");
    },

    ...mapMutations({
      setUser: "LoginStoreModule/setUser"
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
