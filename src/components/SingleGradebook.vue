<template>
  <div>
    <div class="container">
      <div class="container row">
        <h2>{{ gradebook.name }}</h2>

        <div class="button-group">
          <button class="btn btn-primary offset-2">
            <router-link style="color: white;" :to="routeToEdit()">Edit Gradebook</router-link>
          </button>
          <button class="btn btn-primary" v-if="gradebook.students.length < 35">
            <router-link style="color: white;" :to="routeToAddStudent()">Add Student</router-link>
          </button>
          <button class="btn btn-primary" @click="deleteGradebook()">Delete</button>
        </div>
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
              <td width="150">
                <img :src="student.image_link" alt="Italian Trulli" />
              </td>
              <td>{{ student.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
              <td>{{ formatDate(comment.created_at, 'DD.MM.YYYY. HH:mm' ) }}</td>
              <td>
                <button v-if="(comment.user_id === user.id)" @click="deleteComment(comment)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="container">
        <label>Add a Comment</label>
        <input type="text" v-model="newComment.text" cols="30" rows="10" />
        <button class="btn btn-primary" @click="submitComment">Submit Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import { gradebookService } from "../services/GradebookService";
import { proffessorService } from "../services/ProffessorService";
import { commentService } from "../services/CommentService";
import { mapGetters } from "vuex";
import { dateMixin } from "./../mixins/DateMixin";

export default {
  data() {
    return {
      gradebook: {},
      newComment: {},
    };
  },

  mixins: [dateMixin],

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name === "single-gradebook") {
        gradebookService
          .get(vm.$route.params.id)
          .then(response => {
            vm.gradebook = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        proffessorService
          .getByUserId(vm.user.id)
          .then(response => {
            vm.gradebook = response.data.gradebook;
            vm.gradebook.proffessor = {
              id: response.data.id,
              first_name: response.data.first_name,
              last_name: response.data.last_name
            };
          })
          .catch(() => {
            vm.$router.push({ name: from.name });
          });
      }
    });
  },

  methods: {
    routeToSingleProffessor() {
      return `/proffessors/${this.gradebook.proffessor.id}`;
    },

    updateGradebook() {
      gradebookService
        .get(this.gradebook.id)
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
      return `/gradebooks/${this.gradebook.id}/edit`;
    },

    routeToAddStudent() {
      return `/gradebooks/${this.gradebook.id}/add_student`;
    },

    deleteComment(comment) {
      let confirmed = confirm("Are you sure?");
      if (confirmed) {
        commentService.delete(comment.id).then(() => {
          this.updateGradebook();
        });
      }
    },

    deleteGradebook() {
      if (confirm("Are you sure?")) {
        gradebookService.delete(this.gradebook.id).then(() => {
          this.$router.push("/");
        });
      }
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
