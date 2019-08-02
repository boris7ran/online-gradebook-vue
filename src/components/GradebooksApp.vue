<template>
  <div>
    <div class="container pt-5">
      <search-filter @term-submitted="updateSearchTerm"></search-filter>
    </div>

    <div class="container pt-5">
      <table v-if="gradebooks" class="table table-stripped table-bordered table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Head Teacher</th>
            <th width="250px">Created At</th>
          </tr>
        </thead>

        <paginate name="pagGradebooks" :list="filteredGradebooks" :per="displaying" tag="tbody">
          <tr v-for="gradebook in paginated('pagGradebooks')" :key="gradebook.id">
            <td>
              <router-link :to="routeToSingleGradebook(gradebook.id)">{{ gradebook.name }}</router-link>
            </td>
            <td>
              <router-link :to="routeToSingleProffessor(gradebook.proffessor.id)">
                <p
                  class="text-center m-0"
                >{{ gradebook.proffessor.first_name }} {{ gradebook.proffessor.last_name }}</p>
              </router-link>
            </td>
            <td width="250px">
              <p
                class="text-center m-0"
              >{{ formatDate(gradebook.created_at, 'DD.MM.YYYY. HH:mm' ) }}</p>
            </td>
          </tr>
        </paginate>
      </table>

      <p v-else>No gradebooks created!</p>

      <button v-if="displaying < filteredGradebooks.length" @click="increaseDisplaying">Load More</button>
    </div>
  </div>
</template>

<script>
import { gradebookService } from "./../services/GradebookService";
import SearchFilter from "./Filter/SearchFilter";
import { dateMixin } from "./../mixins/DateMixin";

export default {
  data() {
    return {
      gradebooks: [],
      searchTerm: "",
      paginate: ["pagGradebooks"],
      displaying: 10
    };
  },

  components: {
    SearchFilter
  },

  mixins: [dateMixin],

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
    },

    updateSearchTerm(searchTerm) {
      this.searchTerm = searchTerm;
    },

    increaseDisplaying() {
      this.displaying += 10;
    }
  },

  computed: {
    filteredGradebooks() {
      return this.gradebooks.filter(gradebook =>
        gradebook.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
};
</script>

<style>
</style>
