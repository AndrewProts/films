<template>
	<div class="films">
        <router-link  v-for="(film,index) in films" :key="'film'" :to="{name:'film', params:{id: film.id}}" :style="{'background-image':'url('+film.img+')'}">
          <div>{{film.title}}</div>
        </router-link>
      </div>
</template>
<script>
  import films from '../controlers/filmsControler.js'
  import Session from '../controlers/session.js'

  export default{
    data:function(){
      return {
        films:films.films,
        Session:Session
      }
    },
    mounted:function(){
      this.Session.session = null;
    }
  }
</script>