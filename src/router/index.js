import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '番茄鐘'
    }
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import(/* webpackChunkName: "todo" */ '../views/Todo.vue'),
    meta: {
      title: '番茄鐘 | 清單'
    }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import(/* webpackChunkName: "analytics" */ '../views/Analytics.vue'),
    meta: {
      title: '番茄鐘 | 統計'
    }
  },
  {
    path: '/ringtone',
    name: 'Ringtone',
    component: () => import(/* webpackChunkName: "ringtone" */ '../views/Ringtone.vue'),
    meta: {
      title: '番茄鐘 | 鈴聲設定'
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
