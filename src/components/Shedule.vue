<template>
	<div class="shedule">
        <div v-for="(film,index) in Films">
          <span>{{film.title}}</span>
          <router-link :to="{name:'film', params:{id: film.id}}" :key="'time'" v-for="time in film.shedule" @click.native="setSession(time.begin)">{{time.begin}}</router-link>
        </div>
  </div>
</template>
<script>
  import Films from '../controlers/filmsControler.js'
  import Session from '../controlers/session.js'
  export default{
    data:function(){
      return {
        Films:Films.films,
        Session:Session
      }
    },
    methods:{
      setSession(e){
        this.Session.session = e;
      }
    }
  }
</script>