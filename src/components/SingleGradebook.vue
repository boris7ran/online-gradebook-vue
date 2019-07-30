<template>
  <div>
    <div class="container">
      <div class="container row">
        <h2>{{ gradebook.name }}</h2>
      </div>

      <div class="container">
        <p>
          Head Teacher:
          <router-link
            :to="routeToSingleProffessor()"
          >{{ gradebook.proffessor.first_name }} {{ gradebook.proffessor.last_name }}</router-link>
        </p>
      </div>

      <div class="container" v-if="gradebook.students">
        <ul></ul>
      </div>

      <div class="container" v-if="gradebook.comments">
        <table class="table table-stripped table-bordered">
          <thead>
            <tr>
              <th>Author</th>
              <th>Content</th>
              <th>Posted at</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="comment in comments" :key="comment.id">
              <td>{{ comment.user }}</td>
              <td>{{ comment.text }}</td>
              <td>{{ comment.created_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="container">
        <label>Add a Comment</label>
        <textarea v-model="newComment.text" cols="30" rows="10"></textarea>
        <button class="btn btn-primary" @click="submitComment">Submit Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import { gradebookService } from "../services/GradebookService";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      gradebook: {},
      newComment: {},
    };
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
      return `/proffessors/${this.comments[0].proffessor.id}`;
    },

    submitComment() {
      this.newComment.user_id = this.user.id;
      gradebookService
        .gradebookCommentAdd(this.gradebook.id, this.newComment)
        .then(() => {
          this.newComment = {};
          gradebookService
            .get(this.$route.params.id)
            .then(response => {
              this.gradebook = response.data;
            })
            .catch(error => {
              console.log(error);
            });
        });
    }
  },

  computed: {
    ...mapGetters({
      user: "LoginStoreModule/getUser"
    }),
  }
};
</script>

<style>
</style>
