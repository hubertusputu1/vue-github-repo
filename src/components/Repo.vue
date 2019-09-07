<template>
  <v-container>
    <v-layout wrap>
      <v-text-field color="success" loading disabled v-if="status === 'loading'"></v-text-field>
      <v-card min-width="70%" max-width="70%" class="mx-auto" v-else-if="status === 'succeed'">
        <v-card-title>{{repoName}} Readme:</v-card-title>
        <div v-bind:style="readmeContent" v-html="selectedRepo"></div>
      </v-card>
      <v-card min-width="50%" max-width="50%" class="mx-auto" v-else>
        <v-card-title>Hmmmmmmm</v-card-title>
        <v-card-text>This repo doesn't exist</v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  created() {
    this.username = this.$route.params.username;
    this.repo = this.$route.params.repo;
  },
  methods: {
    ...mapActions(["getRepoDetailAction"]),
    ...mapState([])
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    selectedRepo() {
      return this.$store.getters.selectedRepo;
    },

    repoName() {
      return this.$store.getters.repoName;
    },

    status() {
      return this.$store.getters.status;
    }
  },
  mounted() {
    this.getRepoDetailAction({ username: this.username, repo: this.repo });
  },
  data: () => ({
    readmeContent: {
      padding: "5%",
      displax: "flex",
    }
  })
};
</script>