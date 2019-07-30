<template>
  <div>
    <div class="container">
      <div class="container row">
        <img :src="proffessor.image_link" alt="">
      </div>

      <div class="container row">
        <h2>{{ proffessor.first_name }} {{ proffessor.last_name }}</h2>
      </div>

      <div class="container row" v-if="proffessor.gradebook">
        <h3 class="offset-3 col-sm-3"><router-link :to="routeToSingleGradebook()">{{ proffessor.gradebook.name }}</router-link></h3>
        <p>Number of students: </p>
      </div>
    </div>
  </div>
</template>

<script>
import { proffessorService } from '../services/ProffessorService'

export default {
  data() {
    return {
      proffessor: {}
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      proffessorService.get(vm.$route.params.id).then(response => {
        vm.proffessor = response.data;
      }).catch(error => {console.log(error)});
    });
  },

  methods: {
    routeToSingleGradebook() {
      return `/gradebooks/${this.proffessor.gradebook.id}`;
    }
  }
}
</script>

<style>

</style>
