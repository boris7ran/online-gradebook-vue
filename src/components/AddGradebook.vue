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
          <label for="image_link" class="form-control col-sm-2">Select Head Teacher</label>
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

        <div class="button-group">
          <button class="btn btn-primary" type="submit">Submit</button>
          <button class="btn btn-primary" type="button" @click="goToGradebooksPage">Cancel</button>
        </div>
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
        this.availableProffessors = response.data.filter( proff => !proff.gradebook);
      })
      .catch(error => {
        alert(error);
      });
  },

  methods: {
    addGradebook() {
      gradebookService.gradebookAdd(this.newGradebook)
        .then( response => {
          this.goToGradebooksPage();
        }).catch(error => {
          alert(error);
        })
    },

    goToGradebooksPage() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
</style>
