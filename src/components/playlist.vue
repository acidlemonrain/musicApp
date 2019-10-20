<template>
  <div class="playlist"    :class={hide:show} >
          <p style="border:1px solid #ccc ;margin-bottom:5px"  >
             
             <span class="player-ui"  v-if="mode == 'random'" @click="setmode('list')">
                  <font-awesome-icon :icon="['fas', 'random']" />随机循环
             </span>
              <span class="player-ui"  v-if="mode == 'list'"  @click="setmode('loop')">
                  <font-awesome-icon :icon="['fas', 'list-ol']" />列表循环
             </span>
              <span class="player-ui"  v-if="mode == 'loop'"  @click="setmode('random')">
                  <font-awesome-icon :icon="['fas', 'dice-one']" />单曲循环
             </span>
             </p>
           
         <div class="playlist-songs" >
            <songsVue :isbtn="false"  :songs=playlist />
         </div>
     
  </div>
</template>

<script>
 
import { mapState } from 'vuex'
import {EventBus} from '../main';
import songsVue from './songs.vue';
 

export default {
  props: ['show'],
  components: {
    songsVue,
  },
  computed: mapState({
    playlist: state => state.player.playlist,
    song : state => state.player.song,
    mode: state => state.player.mode,
  }),


    methods: {
      setmode(data) {
       
        this.$store.commit('setMode',data)
     }
    },
  
}
</script>

<style lang='scss'>
  @import '../assets/css/main';
  @import '../assets/css/utils';
.playlist{
    position: fixed;
    bottom: 40px;
    z-index: 999;
    right: 0px;
    height: 70vh;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0px 0px 10px #ccc;
    border: 1px solid #ccc;
    background-color: white;
    transition: all .3s;
    opacity: 1;
    width: 650px;
    &-songs{
      overflow-y: scroll;
      height: 10px;
      flex-grow: 1;
    }
}
.hide{
 transform: translate(650px);
  opacity: 0;
  z-index: 0;
}
  @media screen and (max-width: 650px) {
      .hide{
          transform: translate(100vw);
      }
      .playlist{
          width: 100vw;
      }

  }

</style>
