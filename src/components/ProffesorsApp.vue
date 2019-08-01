<template>
  <div>
    <div class="container">
      <search-filter @term-submitted="updateSearchTerm"></search-filter>
    </div>

    <div class="container">
      <table class="table table-stripped table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gradebook</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="proffessor in filteredProffessors" :key="proffessor.id">
            <td><router-link :to="routeToSingleProffessor(proffessor.id)"><img :src="proffessor.image_link" alt="Italian Trulli"></router-link></td>
            <td><router-link :to="routeToSingleProffessor(proffessor.id)">{{ proffessor.first_name }}</router-link></td>
            <td><router-link :to="routeToSingleProffessor(proffessor.id)">{{ proffessor.last_name }}</router-link></td>
            <td v-if="proffessor.gradebook"><router-link :to="routeToSingleGradebook(proffessor.gradebook.id)">{{ proffessor.gradebook.name }}</router-link></td>
            <td v-else>Currently not a Headteacher</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { proffessorService } from "./../services/ProffessorService";
import SearchFilter from "./Filter/SearchFilter"

export default {
  data() {
    return {
      proffessors: [],
      searchTerm: ""
    };
  },

  components: {
    SearchFilter
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      proffessorService.getAll().then(response => {
        vm.proffessors = response.data;
      });
    });
  },

  methods: {
    routeToSingleProffessor(id) {
      return `/proffessors/${id}`;
    },

    routeToSingleGradebook(id) {
      return `/gradebooks/${id}`;
    },

    updateSearchTerm(searchTerm) {
      this.searchTerm = searchTerm;
    },

    fullName(firstName, lastName) {
      return firstName + ' ' + lastName;
    }
  },

  computed: {
    filteredProffessors() {
      return this.proffessors.filter(proff => this.fullName(proff.first_name, proff.last_name).toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }
};
</script>

<style>
</style>
