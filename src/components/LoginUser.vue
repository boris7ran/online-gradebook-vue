<template>
  <div>
    <div class="container">
      <form @submit.prevent="loginUser">
        <div class="form-group row">
          <label for="email" class="form-control col-sm-2">Email</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="email"
            name="email"
            v-model="email"
            required
          />
        </div>

        <div class="form-group row">
          <label for="password" class="form-control col-sm-2">Password</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="password"
            name="password"
            v-model="password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">Log in</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    ...mapActions({
      login: "LoginStoreModule/login"
    }),

    loginUser() {
      this.login({
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
