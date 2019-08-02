<template>
  <div>
    <div class="container">
      <form @submit.prevent="addProffessor">
        <div class="form-group row pt-5">
          <label style="background-color: green; color: white;" for="first_name" class="form-control col-sm-2">First Name</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="first_name"
            name="first_name"
            v-model="newProffessor.first_name"
            required
          />
          <div v-if="errors">
            <error-message
              v-for="(error, index) in errors.first_name"
              :key="index"
              :message="error"
            ></error-message>
          </div>
        </div>

        <div class="form-group row">
          <label style="background-color: green; color: white;" for="last_name" class="form-control col-sm-2">Last Name</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="last_name"
            name="last_name"
            v-model="newProffessor.last_name"
            required
          />
          <div v-if="errors">
            <error-message v-for="(error, index) in errors.last_name" :key="index" :message="error"></error-message>
          </div>
        </div>

        <div class="form-group row">
          <label style="background-color: green; color: white;" for="user_id" class="form-control col-sm-2">Select User</label>
          <select
            class="form-control col-sm-10"
            name="user_id"
            id="user_id"
            v-model="newProffessor.user_id"
          >
            <option :value="user.id" v-for="user in users" :key="user.id">{{ user.email }}</option>
          </select>
          <div v-if="errors">
            <error-message v-for="(error, index) in errors.user_id" :key="index" :message="error"></error-message>
          </div>
        </div>

        <div>
          <div v-for="(image, index) in images" :key="index" class="form-group row">
            <label style="background-color: green; color: white;" class="form-control col-sm-2">Image URL</label>
            <label class="form-control col-sm-10">{{ image }}</label>
          </div>

          <div class="form-group row">
            <input class="form-control col-sm-9" type="text" v-model="newImage" />
            <button
              class="btn btn-info form-control col-sm-3"
              type="button"
              @click="pushImage"
            >Add Image</button>
          </div>

          <div v-if="errors">
            <error-message
              v-for="(error, index) in errors.image_link"
              :key="index"
              :message="error"
            ></error-message>
          </div>
        </div>

        <div class="button-group">
          <button class="btn btn-primary" type="submit">Submit</button>
          <button class="btn btn-primary" type="button" @click="goToProffessorsPage">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { proffessorService } from "./../services/ProffessorService";
import { registerService } from "./../services/RegisterService";
import ErrorMessage from "./errors/ErrorMessage";

export default {
  data() {
    return {
      newProffessor: {},
      users: [],
      errors: {},
      images: [],
      newImage: ""
    };
  },

  components: {
    ErrorMessage
  },

  created() {
    registerService
      .getUsers()
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    addProffessor() {
      if (this.images) {
        this.newProffessor.image_link = this.images.toString();
        proffessorService
          .proffessorAdd(this.newProffessor)
          .then(success => {
            this.goToProffessorsPage();
          })
          .catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    },

    goToProffessorsPage() {
      this.$router.push("/teachers");
    },

    pushImage() {
      if (this.newImage) {
        this.images.push(this.newImage);
      }
      this.newImage = "";
    }
  }
};
</script>

<style>
</style>
