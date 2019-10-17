<template>
  <div class="  playlist"  :class={hide:show} >
          <p style="border:1px solid #ccc " class="bg-primary">播放列表</p>
         
         <div class="playlist-songs" >
            <songsVue  :songs=playlist />
         </div>
     
  </div>
</template>

<script>
import {player} from '../player';
import { mapState } from 'vuex'
import {EventBus} from '../main';
import songsVue from './songs.vue';

export default {
  props: ['show'],
  components: {
    songsVue,
  },
  computed: mapState({
    // arrow functions can make the code very succinct!
    playlist: state => state.player.data.srcs,
    current: state => state.player.data.song.id
    
  }),


    methods: {
      play(data) {
                  EventBus.$emit('play',data);
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
    width: 500px;
    right: 0px;
    height: 70vh;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0px 0px 10px #ccc;
    border: 1px solid #ccc;
    background-color: $primary-light;
    transition: all .3s;
    opacity: 1;
    &-songs{
      overflow-y: scroll;
      height: 10px;
      flex-grow: 1;
    }
}
.hide{
 transform: translate(520px,70vh);
  opacity: 0;
  z-index: 0;
}
.current{
    color: #ccc;
    background-color: black;
}
</style>