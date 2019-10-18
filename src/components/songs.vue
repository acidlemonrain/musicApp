<template>
  <div>      
      <button class="btn" @click="playAll">播放全部</button>
    
      <div class="songs " >
          <song-vue v-for="(item,index) in songs" :song=item :key=item.id      :class="{space:index % 2 == 0,current:(song && item.id == song.id) }" />
      </div>
  </div>
</template>


<script>
import songVue from './song.vue'
import { mapState } from 'vuex'
import {player} from '../player';
export default {
    props:['songs'],
    components: {
        songVue,
    },
   computed: mapState({
 
    song : state => state.player.song,
  }),
    methods: {
        playAll() {

            this.songs.forEach((song,index) => {
                this.axios('song/url?id='+song.id).then(res=>{

                let data = (res.data.data[0]);
                if(data && data.url != null){
                    data.name = song.name
                    data.artists = song.artists
                    data.ar = song.ar
                   this.$store.commit('addSong',data)
                }
                if(index == this.songs.length-1){                    
                    this.$store.commit('playNext',null)
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
.current{
 
    background-color: rgba(235, 184, 119, 0.781);
}
</style>