<template>
  <v-container>
    <v-layout text-center wrap v-if="repos.length > 0">
      <v-card min-width="100%" class="mx-auto" v-for="repo in repos" :key="repo.id">
        <v-card-title>{{ repo.name }}</v-card-title>
        <v-card-text>{{ repo.description }}</v-card-text>
        <v-card-text>{{ repo.language }}</v-card-text>
        <v-card-actions>
          <router-link :to="{ path: repo.name}" append>
            <v-btn color="success">View</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-layout>
    <v-layout text-center wrap v-else>
      <v-card min-width="100%" class="mx-auto">
        <v-card-title>Ooppppsss Sorry!</v-card-title>
        <v-card-text>This username doesn't exist</v-card-text>
      </v-card>
    </v-layout>
    <!-- <div class="text-center">
      <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
    </div>-->
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  created() {
    this.username = this.$route.params.username;
  },
  methods: {
    ...mapActions(["getReposGithubAction", "removeRepoAction"]),
    ...mapState([])
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    repos() {
      return this.$store.getters.repos;
    }
  },
  mounted() {
    this.getReposGithubAction({ username: this.username });
    this.removeRepoAction();
  },
  data: () => ({})
};
</script>
