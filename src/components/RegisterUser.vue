<template>
  <div>
    <div class="container p-5">
      <form @submit.prevent="registerUser">
        <div class="form-group row">
          <label for="email" class="form-control col-sm-2">Email</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="email"
            name="email"
            v-model="newUser.email"
            required
          />
          <div v-if="errors" >
            <error-message v-for="(error, index) in errors.email" :key="index" :message="error"></error-message>
          </div>
        </div>

        <div class="form-group row">
          <label for="password" class="form-control col-sm-2">Password</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="password"
            name="password"
            v-model="newUser.password"
            required
          />
          <div v-if="errors">
            <error-message v-for="(error, index) in errors.password" :key="index" :message="error"></error-message>
          </div>
        </div>

        <div class="form-group row">
          <label for="password_confirmation" class="form-control col-sm-2">Confrim Password</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="password_confirmation"
            name="password_confirmation"
            v-model="newUser.password_confirmation"
            required
          />
        </div>

        <div class="form-group row">
          <input
            type="checkbox"
            class="form-control col-sm-2"
            id="terms_accepted"
            name="terms_accepted"
            required
          />
          <label for="terms_accepted" class="form-control col-sm-10">I accept terms and conditions</label>
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { registerService } from "./../services/RegisterService";
import { mapActions } from "vuex";
import ErrorMessage from './errors/ErrorMessage'

export default {
  data() {
    return {
      newUser: {},
      errors: {}
    };
  },

  components: {
    ErrorMessage
  },

  methods: {
    registerUser() {
      registerService
        .registerUser(this.newUser)
        .then(() => {
          this.login({ email: this.newUser.email, password: this.newUser.password }).then(
            () => {
              this.$router.push("/");
            }
          );
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },

    ...mapActions({
      login: "LoginStoreModule/login"
    })
  }
};
</script>

<style>
</style>
