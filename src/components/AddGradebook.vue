<template>
  <div>
    <div class="container">
      <form @submit.prevent="addGradebook">
        <div class="form-group row mt-5">
          <label style="background-color: green; color: white;" for="name" class="form-control col-sm-2">Gradebook Name</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="name"
            name="name"
            v-model="newGradebook.name"
            required
          />
          <div v-if="errors">
            <error-message v-for="(error, index) in errors.name" :key="index" :message="error"></error-message>
          </div>
        </div>

        <div class="form-group row">
          <label style="background-color: green; color: white;" for="image_link" class="form-control col-sm-2">Select Head Teacher</label>
          <select
            class="form-control col-sm-10"
            name="gradebook"
            id="gradebook"
            v-model="newGradebook.proffessor_id"
          >
            <option
              :value="proffessor.id"
              v-for="proffessor in availableProffessors"
              :key="proffessor.id"
            >{{ proffessor.first_name }} {{ proffessor.last_name }}</option>
          </select>
          <div v-if="errors">
            <error-message v-for="(error, index) in errors.proffessor_id" :key="index" :message="error"></error-message>
          </div>
        </div>

        <div class="container" v-if="newGradebook.students">
          <div class="form-group row" v-for="student in newGradebook.students" :key="student.id">
            <label style="background-color: blue; color: white;" class="form-control col-sm-2" for="student">Student</label>
            <label class="form-control col-sm-3" for="student">{{ student.name }}</label>
            <label class="form-control col-sm-5" for="student">{{ student.image_link }}</label>
            <button class="btn btn-danger form-control col-sm-1" type="button" @click="removeStudentFromList(student)">-</button>
          </div>

          <div class="form-group row" vif="newGradebook.students.length < 35">
            <label style="background-color: blue; color: white;" for="student" class="form-control col-sm-2">Add new student</label>
            <input type="text" class="form-control col-sm-3" v-model="newStudent.name" placeholder="Student Name"/>
            <input type="text" class="form-control col-sm-5" v-model="newStudent.image_link" placeholder="Image Link"/>
            <button class="btn btn-success form-control col-sm-1" type="button" @click="addStudentToList()" v-if="newStudent.name && newStudent.image_link">+</button>
          </div>
        </div>

        <div class="button-group">
          <button v-if="editable" class="btn btn-primary" type="submit">Edit</button>
          <button v-else class="btn btn-primary" type="submit">Submit</button>
          <button class="btn btn-primary" type="button" @click="goToGradebooksPage">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { proffessorService } from "./../services/ProffessorService";
import { gradebookService } from "./../services/GradebookService";
import ErrorMessage from './errors/ErrorMessage';

export default {
  data() {
    return {
      newGradebook: {},
      availableProffessors: [],
      newStudent: {},
      editable: false,
      errors: {}
    };
  },

  components: {
    ErrorMessage
  },

  created() {
    if (this.$route.params.id) {
      this.editable = true;
      gradebookService
        .get(this.$route.params.id)
        .then(response => {
          this.newGradebook = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
    proffessorService
      .getAll()
      .then(response => {
        this.availableProffessors = response.data.filter(
          proff => !proff.gradebook
        );
      })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
  },

  methods: {
    addGradebook() {
      if (this.editable) {
        gradebookService.gradebookEdit(this.newGradebook.id, this.newGradebook)
          .then( () => {
            this.goToGradebooksPage();
          }).catch( error => {
            this.errors = error.response.data.errors;
          });
      } else {
        gradebookService
          .gradebookAdd(this.newGradebook)
          .then(response => {
            this.goToGradebooksPage();
          })
          .catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    },

    removeStudentFromList({id}) {
      this.newGradebook.students = this.newGradebook.students.filter( student => student.id !== id);
    },

    addStudentToList(student) {
      this.newGradebook.students.push(this.newStudent);
      this.newStudent = {};
    },

    goToGradebooksPage() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
