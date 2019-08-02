<template>
  <div>
    <div class="container" v-if="gradebook">
      <div class="button-group mt-4" v-if="user">
          <button class="btn btn-primary">
            <router-link style="color: white;" :to="routeToEdit()">Edit Gradebook</router-link>
          </button>
          <button
            class="btn btn-primary"
            v-if="gradebook && gradebook.students && gradebook.students.length < 35"
          >
            <router-link style="color: white;" :to="routeToAddStudent()">Add Student</router-link>
          </button>
          <button class="btn btn-primary" @click="deleteGradebook()">Delete</button>
        </div>

      <div class="container row m-3">
        <h2>{{ gradebook.name }}</h2>
      </div>

      <div class="container" v-if="gradebook && gradebook.students">
        <p>
          Head Teacher:
          <router-link
            :to="routeToSingleProffessor()"
          >{{ gradebook.proffessor.first_name }} {{ gradebook.proffessor.last_name }}</router-link>
        </p>
      </div>

      <div class="container" v-if="gradebook && gradebook.students">
        <table class="table table-stripped table-bordered text-center m-3 table-hover" style="width:500px">
          <thead class="thead-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="student in gradebook.students" :key="student.id">
              <td width="75px">
                <img :src="student.image_link" alt="Italian Trulli" />
              </td>
              <td><p class="text-center">{{ student.name }}</p></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="container">
        <div class="container" v-if="gradebook.comments">
          <table class="table table-stripped table-bordered table-hover">
            <thead class="thead-dark">
              <tr>
                <th>Author</th>
                <th>Content</th>
                <th>Posted at</th>
                <th v-if="user">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="comment in gradebook.comments" :key="comment.id">
                <td>{{ comment.user_id }}</td>
                <td>{{ comment.text }}</td>
                <td>{{ formatDate(comment.created_at, 'DD.MM.YYYY. HH:mm' ) }}</td>
                <td v-if="user">
                  <button
                    v-if="(comment.user_id === user.id)"
                    @click="deleteComment(comment)"
                  >Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="container row mt-5" v-if="user">
          <label style="background-color: green; color: white;" class="form-control col-sm-2">Add a Comment</label>
          <input type="text" v-model="newComment.text" class="form-control col-sm-8"/>
          <button class="btn btn-primary form-control col-sm-2" @click="submitComment">Submit Comment</button>
        </div>
      </div>
    </div>

    <div class="container" v-else>
      <h2>You aren't currently a head teacher</h2>
      <button>Go To Home Page</button>
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
      errors: []
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
          .catch(error => {
            console.log(error);
            // vm.errors = error.response.data.errors;
          });
      }
    });
  },

  methods: {
    routeToSingleProffessor() {
      if (this.gradebook && this.gradebook.proffessor) {
        return `/proffessors/${this.gradebook.proffessor.id}`;
      }
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
img {
  height: 75px;
  width: 75px;
}
</style>
