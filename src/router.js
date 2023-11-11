import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/pages/Home.vue'
import Contact from './views/pages/Contact.vue'
import Projects from './views/pages/Projects.vue'
import Institutional from './views/pages/Institutional.vue'
import Partners from './views/pages/Partners.vue'
import Login from './views/pages/Login.vue'
import ComingSoon from './views/pages/ComingSoon.vue'
import Event from './views/pages/Events.vue'
import PrivateClasses from './views/product-pages/PrivateClasses.vue'

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
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/partners',
      name: 'partners',
      component: Partners
    },
    {
      path: '/institutional',
      name: 'institutional',
      component: Institutional
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/comingsoon',
      name: 'under-construction',
      component: ComingSoon
    },
    {
      path: '/events',
      name: 'event',
      component: Event
    },
    {
      path: '/products/private-classes',
      name: 'private-classes',
      component: PrivateClasses
    }
  ],
  // Vue-router documentation
  scrollBehavior (to) {
    if (to) { 
      window.scroll(0, 0)
      // return { x: 0, y: 140 } 
    }
    // if(from){
    //   return { x: 0, y: 140 }
    // } else {
    //   return { x: 0, y: 0 }
    // }
  }
})