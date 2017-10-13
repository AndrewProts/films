import Vue from 'vue'
import VueRouter from 'vue-router'

import Films from './components/Films.vue'
import Shedule from './components/Shedule.vue'
import Admin from './components/Admin.vue'
import Film from './components/film.vue'
import Header from './components/Header.vue'

Vue.use(VueRouter)

var router = new VueRouter({
	routes:[
		{path:'/', component:Films},
		{path:'/shedule', component:Shedule},
		{path:'/admin', component:Admin},
		{path:'/film/:id', name:'film', component:Film},
	]
})

new Vue({
  el: '#app',
  router: router,
  components:{
  	'component-header':Header
  }
})
