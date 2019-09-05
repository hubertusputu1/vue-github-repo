<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="username" :rules="usernameRules" label="Github Username" required></v-text-field>
          <v-btn :disabled="!valid" color="success" @click="validate">Find User</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    valid: false,
    username: "",
    usernameRules: [v => !!v || "Username is required"]
  }),
  methods: {
    ...mapActions(["removeAllAction"]),
    ...mapState([]),
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        window.location.href = `${this.username}`;
      }
    }
  },
  mounted() {
    this.removeAllAction()
  }
};
</script>