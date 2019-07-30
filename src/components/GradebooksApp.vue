<template>
  <div>
    <div class="container">
      <table v-if="gradebooks" class="table table-stripped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Head Teacher</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="gradebook in gradebooks" :key="gradebook.id">
            <td><router-link :to="routeToSingleGradebook(gradebook.id)">{{ gradebook.name }}</router-link></td>
            <td><router-link :to="routeToSingleProffessor(gradebook.proffessor.id)">{{ gradebook.proffessor.first_name }} {{ gradebook.proffessor.last_name }}</router-link></td>
            <td>{{ gradebook.created_at }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else>No gradebooks created!</p>
    </div>
  </div>
</template>

<script>
import { gradebookService } from "./../services/GradebookService";

export default {
  data() {
    return {
      gradebooks: []
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      gradebookService.getAll().then(response => {
        vm.gradebooks = response.data;
      });
    });
  },

  methods: {
    routeToSingleGradebook(id) {
      return `/gradebooks/${id}`;
    },
    
    routeToSingleProffessor(id) {
      return `/proffessors/${id}`;
    }
  }
};
</script>

<style>
</style>
