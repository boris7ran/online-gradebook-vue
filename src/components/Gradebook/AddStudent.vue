<template>
  <div>
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
  props: ['gradebookId'],

  data() {
    return {
      newStudent: {}
    }
  },

  methods: {
    submitStudent() {
      gradebookService
        .gradebookStudentAdd(this.gradebookId, this.newStudent)
        .then( response => {
          this.newStudent = {};
          this.$emit('studentAdded');
        }).catch( error => {
          console.log(error);
        });
    }
  }
}
</script>

<style>

</style>
