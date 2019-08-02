<template>
  <div>
    <div class="container">
      <h2>Gradebook: {{ gradebook.name }}</h2>
      <h3>Head teacher: {{ gradebook.proffessor.first_name }} {{ gradebook.proffessor.last_name }}</h3>
    </div>

    <div v-for="(student, index) in newStudents" :key="index">
      <div class="container">
        <div class="form-group row">
          <label for="name" class="form-control col-sm-2">Name</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="name"
            name="name"
            v-model="student.name"
          />
        </div>
        <div v-if="errors">
          <error-message v-for="(error, indexError) in errors" :key="indexError" :message="parseError(errors, index)"></error-message>
        </div>

        <div class="form-group row">
          <label for="image_link" class="form-control col-sm-2">Image URL</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="image_link"
            name="image_link"
            v-model="student.image_link"
          />
        </div>
        <!-- <div v-if="errors">
          <error-message v-for="(error, index) in errors.index.image_link" :key="index" :message="error"></error-message>
        </div> -->
      </div>
    </div>

    <div class="container">
      <button @click="push" class="btn btn-secondary">Add new Student</button>
      <button v-if="newStudents.length" class="btn btn-primary" @click="submitStudent">Submit</button>
    </div>
  </div>
</template>

<script>
import { gradebookService } from "../../services/GradebookService";
import ErrorMessage from '../errors/ErrorMessage'

export default {
  data() {
    return {
      gradebook: {},
      newStudents: [],
      errors: [],
      from: {}
    };
  },

  components: ['ErrorMessage'],

  methods: {
    submitStudent() {
      gradebookService
        .gradebookStudentAdd(this.$route.params.id, this.newStudents)
        .then(response => {
          this.newStudent = {};
          this.$router.push(this.from);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },

    push() {
      this.newStudents.push({});
    },

    parseError(errors, index){
      let key = Object.keys(errors);
      key.forEach( k => {
         k = k.split('.');
        //  if (k[0] === index) {
        //     console.log(k[0]);
        //  }
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      gradebookService
        .get(vm.$route.params.id)
        .then(response => {
          vm.gradebook = response.data;
          vm.from = from.fullPath;
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    });
  }
};
</script>

<style>
</style>
