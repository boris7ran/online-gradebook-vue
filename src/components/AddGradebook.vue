<template>
  <div>
    <div class="container">
      <form @submit.prevent="addGradebook">
        <div class="form-group row">
          <label for="name" class="form-control col-sm-2">Gradebook Name</label>
          <input
            type="text"
            class="form-control col-sm-10"
            id="name"
            name="name"
            v-model="newGradebook.name"
            required
          />
        </div>

        <div class="form-group row">
          <label for="image_link" class="form-control col-sm-2">Select Gradebook</label>
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
        </div>

        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>


<script>
import { proffessorService } from "./../services/ProffessorService";
import { gradebookService } from "./../services/GradebookService";

export default {
  data() {
    return {
      newGradebook: {},
      availableProffessors: []
    };
  },

  created() {
    proffessorService
      .getAll()
      .then(response => {
        this.availableProffessors = response.data;
      })
      .catch(error => {
        alert(error);
      });
  },

  methods: {
    addGradebook() {
      gradebookService.gradebookAdd(this.newGradebook)
        .then( response => {
          console.log(response);
        }).catch(error => {
          alert(error);
        })
    }
  }
};
</script>

<style>
</style>
