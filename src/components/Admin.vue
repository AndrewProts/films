<template>
	<div class="add-container">
        <div>
          <span>Name</span>
          <input type="text" v-model="title">
        </div>
        <div>
          <span>unique id for rout the path</span>
          <input type="text" v-model="id">
        </div>
        <div>
          <span>Description</span>
          <textarea v-model="description"></textarea>
        </div>
        <div>
          <span>Img (URL)</span>
          <input type="text" v-model="img">
        </div>
        <div>
          <span>Ticket price</span>
          <input type="text" id="mask-price" v-model="price">
        </div>
        <div>
          <span>Duration</span>
          <input type="text" id="mask-duration" v-model="duration">
        </div>
        <div>
          <span>Shedule</span>
          <input type="text" id="mask-begin" v-model="shedule">
          <ul>
            <li v-for="time in sheduleList">{{time}}</li>
          </ul>
        </div>
        <button class="buy" @click="addFilm()">ADD</button>
      </div>
</template>
<script>
  import films from '../controlers/filmsControler.js'
  export default{
    data:function(){
      return {
        films:films.films,
        title:'',
        img:'',
        description:'',
        price:'',
        duration:'',
        shedule:'',
        id:''
      }
    },
    methods:{
      addFilm(){
        var shedule = [];
        for(var i in this.sheduleList){
          shedule.push({begin:this.sheduleList[i],places:[]});
        }
        this.films.push({title:this.title,id:this.id,img:this.img,description:this.description,price:this.price,duration:this.duration,shedule:shedule});
      }
    },
    computed:{
      sheduleList(){
        return this.shedule.split(', ');
      }
    },
    mounted:function(){
      setTimeout(function(){
        $('#mask-price').mask('$00,00');
        $('#mask-duration').mask('00:00');
        $('#mask-begin').mask('00:00, 00:00, 00:00, 00:00, 00:00, 00:00, 00:00, 00:00, 00:00, 00:00, 00:00, 00:00, 00:00, 00:00');
      },50);
      
    }
  }
</script>