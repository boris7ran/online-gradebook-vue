<template>
  <div>
    <div class="container">
      <form @submit.prevent="addProffessor">
        <div class="form-group row">
          <label for="first_name" class="form-control col-sm-2">First Name</label>
          <input type="text" class="form-control col-sm-10" id="first_name" name="first_name" v-model="newProffessor.first_name" required>
        </div>

        <div class="form-group row">
          <label for="last_name" class="form-control col-sm-2">Last Name</label>
          <input type="text" class="form-control col-sm-10" id="last_name" name="last_name" v-model="newProffessor.last_name" required>
        </div>

        <div class="form-group row">
          <label for="image_link" class="form-control col-sm-2">Image URL</label>
          <input type="text" class="form-control col-sm-10" id="image_link" name="image_link" v-model="newProffessor.image_link" required>
        </div>

        <div class="form-group row">
          <label for="image_link" class="form-control col-sm-2">Select Gradebook</label>
          <select class="form-control col-sm-10" name="gradebook" id="gradebook" v-model="newProffessor.gradebook">
            <option value="1">1</option>
          </select>
        </div>

        <div class="button-group">
          <button class="btn btn-primary" type="submit">Submit</button>
          <button class="btn btn-primary" type="button" @click="goToProffessorsPage">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { proffessorService } from './../services/ProffessorService'

export default {
  data() {
    return {
      newProffessor: {}
    }
  },

  methods: {
    addProffessor() {
      proffessorService.proffessorAdd( this.newProffessor )
        .then( success => {
          this.goToProffessorsPage();
        }).catch( error => {
          alert(error);
        })
    },

    goToProffessorsPage() {
      this.$router.push('/teachers');
    }
  }
}
</script>

<style>

</style>
