<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-card max-width="500" class="mx-auto">
          <v-card-title>
            <v-row align="center" justify="center">
              <v-img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="200"
                max-height="200"
              ></v-img>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row align="center" justify="center">
              <h3>Search Github Repos Here!</h3>
            </v-row>
            <v-row align="center" justify="center">
              <v-form
                ref="form"
                v-model="valid"
                v-on:submit.prevent="doNothing"
                v-bind:style="form"
                lazy-validation
              >
                <v-text-field
                  v-on:keyup="onEnterSubmit"
                  v-model="username"
                  :rules="usernameRules"
                  label="Username"
                  required
                />
                <v-btn :disabled="!valid" color="success" @click="validate">
                  <v-icon>mdi-magnify</v-icon>Find Profile
                </v-btn>
              </v-form>
            </v-row>
          </v-card-text>
        </v-card>
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
    usernameRules: [v => !!v || "Username is required"],
    form: {
      width: "40%",
      display: "flex",
      flexDirection: "column"
    }
  }),
  methods: {
    ...mapActions(["removeAllAction"]),
    ...mapState([]),
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        window.location.href = `${this.username}`;
      }
    },
    doNothing() {},
    onEnterSubmit(e) {
      if (e.keyCode === 13) {
        this.validate();
      }
    }
  },
  mounted() {
    this.removeAllAction();
  }
};
</script>