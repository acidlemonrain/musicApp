<template>
  <div class="bg-primary playlist"  :class={hide:show} >
          <p style="border:1px solid black">播放列表</p>
          <div @click="play(item)" v-for="(item,index) in playlist" :class="{current:item.id == current}" :key="index"    >
          {{ item.name }}
          </div>
     
  </div>
</template>

<script>
import {player} from '../player';
import { mapState } from 'vuex'
import {EventBus} from '../main';
export default {
  props: ['show'],
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
 
.playlist{
    position: fixed;
    bottom: 40px;
    z-index: 999;
    width: 500px;
    right: 0px;
    height: 70vh;
    overflow-y: scroll;
    
    transition: all .3s;
    opacity: 1;
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