<template>
  <div>
    <div class="container">
      <div class="container row">
        <h2>{{ gradebook.name }}</h2>
      </div>

      <div class="container">
        <p>Head Teacher: <router-link :to="routeToSingleProffessor()">{{ gradebook.proffessor.first_name }} {{ gradebook.proffessor.last_name }}</router-link></p>
      </div>
      
      <div class="container" v-if="gradebook.students">
        <ul>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { gradebookService } from "../services/GradebookService";

export default {
  data() {
    return {
      gradebook: {}
    };
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
    });
  },

  methods: {
    routeToSingleProffessor() {
      return `/proffessors/${this.gradebook.proffessor.id}`;
    }
  }
};
</script>

<style>
</style>
