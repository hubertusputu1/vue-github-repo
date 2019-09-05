<template>
  <div>
    <v-app-bar color="blue accent-4" dark>
      <v-btn icon v-if="user" @click="goBack">
        <v-icon>mdi-arrow-left-thick</v-icon>
      </v-btn>

      <v-toolbar-title vi>Github Repo {{user}}</v-toolbar-title>

      <div class="flex-grow-1"></div>
    </v-app-bar>
  </div>
</template>


<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>