import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/home/components/CGIHome.vue'

// Snackbar
import CGISnackbarInfosComponentProps from '@/components/snackbar/CGISnackbarInfosComponentProps.vue';
import CGISnackbar from '@/components/snackbar/CGISnackbar.vue';

const routes = [
  {
    path: '/cids',
    name: 'home',
    component: Home
  },
  {
    path: '/snackbar',
    name: 'snackbar',
    components: {
      default: CGISnackbarInfosComponentProps,
      componenteA: CGISnackbar
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
