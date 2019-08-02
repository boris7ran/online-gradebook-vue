<template>
  <div>
    <div class="container row">
      <input class="form-control col-sm-10" type="text" v-model="searchTerm" />
      <button class="btn btn-primary col-sm-2" @click="submitTerm">Filter</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { searchTerm: "" };
  },

  methods: {
    submitTerm() {
      this.$emit('term-submitted', this.searchTerm);
    }
  }
};
</script>

<style>
</style>
