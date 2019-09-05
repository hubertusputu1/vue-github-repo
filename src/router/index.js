import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import RepoList from '@/components/RepoList.vue'
import Repo from '@/components/Repo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:username',
      name: 'RepoList',
      component: RepoList,
      props: true
    },
    {
      path: '/:username/:repo',
      name: 'Repo',
      component: Repo,
      props: true
    }
  ]
})