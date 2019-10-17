<template>
  <div class="player"  >
      <playlistVue  :show=!show  :class="{listshow:show}" />
      <div class="player-box" >
        
          <div class="player-ui" @click="play()" v-if="player.sound">
              
              <span v-show="player.sound.playing()">
                  <font-awesome-icon :icon="['fas', 'pause-circle']" />
              </span>
              <span v-show="!player.sound.playing()">
                    <font-awesome-icon :icon="['fas', 'play-circle']" />
                 
              </span>
          </div>
          <div class="player-progress">
              <div class="player-song">
                  {{player.song.name}} 
                  
                  <span style='color:#ccc'>
                      -
                  <span v-for="item in  player.song.artists" :key="item.id">
                      {{ item.name }}
                  </span>
                    <span v-for="item in  player.song.ar" :key="item.id">
                      {{ item.name }}
                  </span>
                  </span>
                  
              </div>
              <div class="player-progress-line-mask">
                   <div class="player-progress-line" :style="{width:player.progress+'%'}">
                  <div class="player-progress-line-ball"></div>
              </div>
              </div>
             
          </div>
          <div class="player-ui" >
              <input type="range" style="width:40px"  min="0" max="1" step="0.01" v-model="volume">  
          </div>
            <div class="player-ui"  @click="show =!show">
                <span>
              <font-awesome-icon :icon="['fas', 'bars']" />
                </span>
            </div>
      </div>
  </div>
</template>

<script>
 
import playlistVue from './playlist';
import { mapState } from 'vuex'
import {player}  from '../player';
export default {
   computed: mapState({
    player: state => state.player.data
  }),
    components: {
        playlistVue,
    },

    data() {
        return {
            show: false,
            volume:1
        }
    },
    methods: {
        play() {
            if(player.data.sound.playing()){
                        player.data.sound.pause();
            }else{
                    player.data.sound.play();
            }
    
        }
    },
    watch: {
        volume(to, oldValue) {
            this.player.sound.volume(to)
        }
    },
  
}
</script>

<style lang='scss'>
  @import '../assets/css/main';
.player{
    height: 40px;
    width: 100%;
    box-shadow: 0px 0px 1px #ccc;
    position: relative;
    &-song{
        position: absolute;
        margin-top: 5px;
        font-size: 16px;
        color: black;
    }
    &-box{
        height: 100%;
        width: 100%;
        display: flex;
    }
    &-ui{
        height: 20px;
        font-size: 17px;
        margin: 10px;
        color:$primary;
        outline: none;
        border: none;
        &:hover{
             color: $primary-darken
        }
    }
    &-progress{
        height: 40px;
        width: 10px;
        padding: 0px 10px;
        flex-grow: 1;
  

        &-line{
            &-mask{
                width: 100%;
                background-color: #ccc;
            }
            margin-top: 30px;
            height: 1px;
            background-color: black;
            &-ball{
                margin-left: auto;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: $secondary;
                transform: translate(0,-50%);
            }
        }
    }
}
.listshow{
    width: 200px;
}
</style>