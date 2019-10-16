<template>
  <div>      
      <button class="btn" @click="playAll">播放全部</button>
    
      <div class="songs " >
          <song-vue v-for="(song,index) in songs" :song=song :key=song.id  :class="{space:index % 2 == 0}" />
      </div>
  </div>
</template>


<script>
import songVue from './song.vue'
import {player} from '../player';
export default {
    props:['songs'],
    components: {
        songVue,
    },
    methods: {
        playAll() {

            this.songs.forEach((song,index) => {
                this.axios('song/url?id='+song.id).then(res=>{

                let data = (res.data.data[0]);
                if(data && data.url != null){
                    data.name = song.name
                    data.artists = song.artists
                    data.ar = song.ar
                    player.data.srcs.push(data)
                }
                if(index == this.songs.length-1){                    
                    player.playNext();
                  this.$store.commit('setPlayer',player.data)
                console.log( this.$store.state);
                }
                
                
           
                
                
               
            })
            });
  
         

        }
    },
}
</script>


<style>
.space{
    background-color:rgba(228, 215, 195, 0.342);
}
</style>