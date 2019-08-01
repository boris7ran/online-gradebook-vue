<template>
  <div>
    <div class="container row">
      <input class="form-control col-sm-5" type="text" v-model="searchTerm" />
      <button class="btn btn-primary" @click="submitTerm">Filter</button>
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
