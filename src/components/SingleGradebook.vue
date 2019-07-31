<template>
  <div>
    <div class="container">
      <div class="container row">
        <h2>{{ gradebook.name }}</h2>
        <button class="btn btn-primary offset-2"><router-link style="color: white;" :to="routeToEdit()">Edit Gradebook</router-link></button>
      </div>

      <div class="container">
        <p>
          Head Teacher:
          <router-link
            :to="routeToSingleProffessor()"
          >{{ gradebook.proffessor.first_name }} {{ gradebook.proffessor.last_name }}</router-link>
        </p>
      </div>

      <div class="contai">
        <table class="table table-stripped table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="student in gradebook.students" :key="student.id" height="100">
              <td width="150"><img :src="student.image_link" alt="Italian Trulli"></td>
              <td>{{ student.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <add-student :gradebookId="gradebook.id" @studentAdded="updateGradebook"></add-student>

    <div class="container">
      <div class="container" v-if="gradebook.comments">
        <table class="table table-stripped table-bordered">
          <thead>
            <tr>
              <th>Author</th>
              <th>Content</th>
              <th>Posted at</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="comment in gradebook.comments" :key="comment.id">
              <td>{{ comment.user_id }}</td>
              <td>{{ comment.text }}</td>
              <td>{{ comment.created_at }}</td>
              <td><button v-if=" comment.user_id === user.id ">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <label>Add a Comment</label>
      <input type="text" v-model="newComment.text" cols="30" rows="10" />
      <button class="btn btn-primary" @click="submitComment">Submit Comment</button>
    </div>
  </div>
</template>

<script>
import { gradebookService } from "../services/GradebookService";
import { mapGetters } from "vuex";
import AddStudent from "./Gradebook/AddStudent";

export default {
  data() {
    return {
      gradebook: {},
      newComment: {},
      newStudent: {}
    };
  },

  components: {
    AddStudent
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      gradebookService
        .get(vm.$route.params.id)
        .then(response => {
          vm.gradebook = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    });
  },

  methods: {
    routeToSingleProffessor() {
      return `/proffessors/${this.gradebook.proffessor.id}`;
    },

    updateGradebook() {
      gradebookService
        .get(this.$route.params.id)
        .then(response => {
          this.gradebook = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    submitComment() {
      this.newComment.user_id = this.user.id;
      gradebookService
        .gradebookCommentAdd(this.gradebook.id, this.newComment)
        .then(() => {
          this.newComment = {};
          this.updateGradebook();
        });
    },

    routeToEdit() {
      return `/gradebooks/${this.gradebook.id}/edit`
    }
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
