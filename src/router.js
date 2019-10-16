import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/albums',
      component: () => import( './views/albums.vue')
    },
    {
      path: '/search',
      component: () => import( './views/search.vue')
    },
    {
      path: '/album/:id',
      component: () => import('./views/album.vue'),
    },
    {
      path: '/login',
      component: () => import('./views/login.vue'),
    },
    {
      path: '/user',
      component: () => import('./views/user.vue'),
    },
    {
      path: '/music',
      component: () => import('./views/music.vue'),
    },
    {
      path: '/songers',
      component: () => import('./views/songers.vue'),
    },
    {
      path: '/songer/:id',
      component: () => import('./views/songer.vue'),
    },
  ]
})
