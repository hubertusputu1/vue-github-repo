import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		repos: [],
		selectedRepo: null,
		repoName: null,
		status: null,
		error: null
	},
	mutations: {
		setStatus(state, payload) {
			state.status = payload;
		},

		setError(state, payload) {
			state.error = payload;
		},

		setUser(state, payload) {
			state.user = payload;
		},

		setRepoName(state, payload) {
			state.repoName = payload;
		},

		removeUser(state) {
			state.user = null;
		},

		setRepos(state, payload) {
			state.repos = payload;
		},

		removeRepos(state) {
			state.repos = [];
		},

		setSelectedRepo(state, payload) {
			state.selectedRepo = payload;
		},

		removeSelectedRepo(state) {
			state.selectedRepo = null;
			state.repoName = null;
		},

		removeAll(state) {
			state.user = null;
			state.repos = [];
			state.selectedRepo = null;
			state.repoName = null;
		}
	},

	actions: {
		removeAllAction({ commit }) {
			commit('removeAll');
		},

		removeRepoAction({ commit }) {
			commit('removeSelectedRepo');
		},

		getReposGithubAction({ commit }, payload) {
			const username = payload.username;
			commit('setStatus', 'loading');
			commit('setUser', username);
			axios.get(`https://api.github.com/users/${username}/repos`)
				.then(response => {
					commit('setRepos', response.data);
					commit('setStatus', 'succeed');
				})
				.catch(error => {
					commit('setStatus', 'failure');
					commit('setError', error.message);
				});
		},

		getRepoDetailAction({ commit }, payload) {
			const username = payload.username;
			const repo = payload.repo;
			commit('setStatus', 'loading');
			commit('setUser', username);
			commit('setRepoName', repo);
			axios.get(
				`https://api.github.com/repos/${username}/${repo}/readme`
			)
				.then(response => {
					commit('setSelectedRepo', atob(response.data.content));
					commit('setStatus', 'succeed');
				})
				.catch(error => {
					commit('setStatus', 'failure');
					commit('setError', error.message);
				});
		}
	},

	getters: {
		status(state) {
			return state.status;
		},

		user(state) {
			return state.user;
		},

		repos(state) {
			return state.repos;
		},

		selectedRepo(state) {
			return state.selectedRepo;
		},

		repoName(state) {
			return state.repoName;
		},

		error(state) {
			return state.error;
		}
	}
});
