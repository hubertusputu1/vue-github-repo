<template>
  <v-container>
    <v-layout text-center wrap v-if="status === 'loading'">
      <v-text-field color="success" loading disabled></v-text-field>
    </v-layout>
    <v-layout v-bind:style="repoList" wrap v-else-if="status === 'succeed' && repos.length > 0">
      <v-card v-bind:style="card" width="45%" class="mx-auto" v-for="repo in repos" :key="repo.id">
        <v-card-title>{{ repo.name }}</v-card-title>
        <v-card-text>{{ repo.description }}</v-card-text>
        <v-card-text>{{ repo.language }}</v-card-text>
        <v-card-actions>
          <router-link :to="{ path: repo.name}" v-bind:style="linkCard" append>
            <v-btn color="success">View</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-layout>
    <v-layout text-center wrap v-else-if="status === 'succeed' && repos.length === 0">
      <v-card min-width="45%" max-width="45%" class="mx-auto">
        <v-card-title>Wow</v-card-title>
        <v-card-text>We can't seem to list the repo of this user</v-card-text>
      </v-card>
    </v-layout>
    <v-layout text-center wrap v-else>
      <v-card min-width="45%" max-width="45%" class="mx-auto">
        <v-card-title>Ooppppsss Sorry!</v-card-title>
        <v-card-text>This username doesn't exist</v-card-text>
      </v-card>
    </v-layout>
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
    },
    status() {
      return this.$store.getters.status;
    }
  },
  mounted() {
    this.getReposGithubAction({ username: this.username });
    this.removeRepoAction();
  },
  data: () => ({
    repoList: {
      display: 'flex',
      flexDirection: 'row',
    },
    card: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    linkCard: {
      textDecoration: 'none'
    }
  })
};
</script>
