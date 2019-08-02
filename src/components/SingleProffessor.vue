<template>
  <div>
    <div class="container m-3">
      <div v-if="proffessor.image_link" class="container-fluid text-center">
        <img :src="proffessor.image_link[0]" alt="">
      </div>

      <div class="container ml-3">
        <h2 class="text-center">{{ proffessor.first_name }} {{ proffessor.last_name }}</h2>
      </div>

      <div class="container ml-3" v-if="proffessor.gradebook">
        <h2 class="text-center"><router-link :to="routeToSingleGradebook()">{{ proffessor.gradebook.name }}</router-link></h2>
      </div>

      <div class="container ml-3">
        <p class="text-center">Number of students: {{ proffessor.gradebook.students.length }} </p>
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
        vm.proffessor.image_link = vm.proffessor.image_link.split(",");
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
img {
  height: 300px;
  width: 300px;
}
</style>
