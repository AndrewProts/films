<template>
	<div class="film" v-if="film">
        <div class="film-header">
          <div class="left">
            <div :style="{'background-image':'url('+film.img+')'}"></div>
          </div>
          <div class="right">
            <h3>{{film.title}}</h3>
            <p>
              {{film.description}}
            </p>
            <div class="shedule">
              <div>
                <a href="#"></a>
                <a href="#" v-for="time in film.shedule" @click.prevent="setSession(time.begin)" :class="{active:time.begin == Session.session}">{{time.begin}}</a>
              </div>
            </div>
          </div>
        </div>

        <div class="ticket-container">
          <div class="left">
            <div class="hall">
              <span v-for="(row,i) in places">
                <div v-for="(coll,j) in row" :class="{'active':coll.status == 'active' , reserved:coll.status == 'reserved'}" @click="chosePlace(i,j)">{{coll.place}}</div>
              </span>
            </div>
          </div>
          <div class="right">
            <div class="tickets">
              <div class="all-tickets">{{tickets.length}} tickets</div>
              <div class="ticket" v-for="ticket in tickets">
                <div>
                  <span>row</span>
                  <span>{{ticket.r+1}}</span>
                </div>
                <div>
                  <span>place</span>
                  <span>{{ticket.c+1}}</span>
                </div>
                <div>
                  <span>price</span>
                  <span>{{film.price}}</span>
                </div>
                <div>
                  <span @click="removeTicket(ticket.id)">X</span>
                </div>
              </div>
              <div class="buy" v-if="tickets.length > 0" @click="buy">BUY</div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
  import films from '../controlers/filmsControler.js'
  import Session from '../controlers/session.js'
  export default {
    data: function(){
      return { 
        films:films.films,
        film:null,
        Session:Session,
        placesArr:[],
        initArr:true,
        tickets:[]
      }
    },
    methods:{
      buy(){
        var places = [];
        for(var i in this.tickets){
            this.placesArr[parseInt(this.tickets[i].id[0])][parseInt(this.tickets[i].id[1])].status = 'reserved';
            places.push({r:parseInt(this.tickets[i].id[0])+1,c:parseInt(this.tickets[i].id[1])+1});
        }
        this.tickets = [];
        for(var i in this.films){
          for(var j in this.films[i].shedule){
            if(this.films[i].shedule[j].begin == this.Session.session&& this.film.title == this.films[i].title){
              this.films[i].shedule[j].places = this.films[i].shedule[j].places.concat(places);
            }
          }
        }
      },
      removeTicket(id){
        for(var i in this.tickets){
          if(this.tickets[i].id == id){
            this.tickets.splice(i,1);
            this.placesArr[parseInt(id[0])][parseInt(id[1])].status = 'free';
          }
        }
      },
      addTicket({r,c,id}){
        this.tickets.push({r:r,c:c,id:id});
      },
      setSession(e){
        this.Session.session = e;
      },
      chosePlace(r,c){
        if(this.placesArr[r][c].status !== 'reserved'){
          if(this.placesArr[r][c].status == 'free'){
            this.$set(this.placesArr[r],c,{place:c,status:'active'});
            this.addTicket({r:r,c:c,id:r+''+c});
          }else{
            this.$set(this.placesArr[r],c,{place:c,status:'free'});
            this.removeTicket(r+''+c);
          }
        }
        

      }
    },
    computed:{
      places(){
        if(this.initArr){
          this.initArr = false;
          this.placesArr = [];
          for(var i=0;i<10;i++){
            var mass = [];
            for(var j=0;j<10;j++){
              mass.push({place:j+1,status:'free'});
            }
            this.placesArr.push(mass);
          }
        }
        if(this.Session.session){
          var places = [];
          for(i in this.film.shedule){
            if(this.film.shedule[i].begin == this.Session.session){
              places = this.film.shedule[i].places;
              break;
            }
          }
          for(i in places){
            this.placesArr[places[i].r-1][places[i].c-1].status = 'reserved';
          }
          return this.placesArr;
        }else{
          return this.placesArr=[];
        }
      }
    },
    watch:{
      'Session.session':function(){
        this.initArr = true;
      }
    },
    mounted: function(){
      var filmId = this.$route.params.id;
      for(var i in this.films){
        console.log(this.films[i].id);
        if(this.films[i].id == filmId){
          this.film = this.films[i];
        }
      }
      
    }
  }
</script>