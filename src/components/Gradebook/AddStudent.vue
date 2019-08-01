<template>
  <div>
    <div class="container">
      <h2>Gradebook: {{ gradebook.name }}</h2>
      <h3>Head teacher: {{ gradebook.proffessor.first_name }} {{ gradebook.proffessor.last_name }}</h3>
    </div>

    <div class="container">
      <div class="form-group row">
        <label for="name" class="form-control col-sm-2">Name</label>
        <input
          type="text"
          class="form-control col-sm-10"
          id="name"
          name="name"
          v-model="newStudent.name"
        />
      </div>

      <div class="form-group row">
        <label for="image_link" class="form-control col-sm-2">Image URL</label>
        <input
          type="text"
          class="form-control col-sm-10"
          id="image_link"
          name="image_link"
          v-model="newStudent.image_link"
        />
      </div>

      <button class="btn btn-primary" @click="submitStudent">Submit</button>
    </div>
  </div>
</template>

<script>
import { gradebookService } from '../../services/GradebookService'

export default {

  data() {
    return {
      newStudent: {},
      gradebook: {}
    }
  },

  methods: {
    submitStudent() {
      gradebookService
        .gradebookStudentAdd(this.$route.params.id, this.newStudent)
        .then( response => {
          this.newStudent = {};
          this.$router.push('/');
        }).catch( error => {
          console.log(error);
        });
    }
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
    })
  }
}
</script>

<style>
</style>
