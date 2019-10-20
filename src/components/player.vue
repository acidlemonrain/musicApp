<template>
  <div class="player" v-if="song">
      <playlistVue  :show=!show    />
      <div class="player-box" >
            <router-link   class="song-img" to="/music">
                <img :src="song.img" alt="" height="40px"  width="40px" >
            </router-link>
          <div class="player-ui" @click=playorstop >

              <span v-show="pause">
                  <font-awesome-icon :icon="['fas', 'pause-circle']" />
              </span>
              <span v-show="!pause">
                    <font-awesome-icon :icon="['fas', 'play-circle']" />
                 
              </span>
            
          </div>
          <div class="player-ui" @click="next">
                <span >
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                 
              </span>
          </div>
          <div class="player-progress">



              <div class="player-song  "  style=" overflow-x: hidden" v-if="song">

                  <p class="song-txt  " style=" display: inline-block; width: 1000px" ref="txt">

                      <span> {{ song.name}}</span>
                      <span style='color:#ccc'>
                  <span v-for="item in  song.artists" :key="item.id">
                      {{ item.name }}
                  </span>
                    <span v-for="item in   song.ar" :key="item.id">
                      {{ item.name }}
                  </span>
                  </span>
                  </p>
                  
              </div>
              <div class="player-progress-line-mask">
                   <div class="player-progress-line" :style="{width:progress +'%'}">
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

                <div v-if="ispop">
                    <span class="popui" > {{playlistLen}} </span>
                </div>

            </div>
      </div>
  </div>
</template>

<script>
 
import playlistVue from './playlist';
import { mapState } from 'vuex'

export default {
    props: {
        pause: {
            type: Boolean,
            default: false
        },
    },
   computed: mapState({
    sec: state => state.player.sec,
    dur:state => state.player.dur,
    song:state => state.player.song,
    playlistLen :state => state.player.playlist.length,
    progress(){
        return this.sec*100/this.dur
    },
     infotxtlength(){
        let len = 0
         if(Array.isArray(this.song.ar))
        this.song.ar.forEach(ele=>{
            len+=ele.name.length
        })
         if (Array.isArray(this.song.artists)){
             this.song.artists.forEach(ele=>{
                 len+=ele.name.length
             })
         }
        return this.song.name.length+len
     }
  }),
    components: {
        playlistVue,
    },

    data() {
        return {
            show: false,
            volume:1,
            ispop:false,
        }
    },
    methods: {
        playorstop() {
           
           this.$emit('playorstop')
        },
        next(){
            this.$store.commit('playNext',null)
        },

    },
    watch: {
        song(to){
            setTimeout(()=>{
                this.$refs.txt.style.width = this.infotxtlength*10+70 +'px';
            },500)
        },
        volume(to, from) {
              this.$emit('volume',to)
        },
        playlistLen(to,from){
          if(this.ispop){

          }else {
              this.ispop = true
              setTimeout(()=>{
                  this.ispop = false
              },1000)
          }

        }
    },
  
}
</script>

<style lang='scss'>
  @import '../assets/css/main';
.popui{
    position: absolute;
    animation: popui 1s ease-in-out ;
}
@keyframes popui {
    0%{
        color: $primary-darken;
  }

    60%{
        color: $primary;
    }

    100%{
        color: $primary-light;
        transform: translate(0,-100px);
    }
}

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
        width: 400px;
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
        cursor: pointer;
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
  @media screen and (max-width: 650px) {
      .player-song{
          font-size: 10px;
          width: 100px;
      }

  }
    .song-txt{

        animation: move 40s infinite linear

    }
    @keyframes move  {
        0%{
            transform: translate(-60%,0);
        }
        25%{
            transform: translate(0%,0);
        }
        75%{
            transform: translate(60%,0);
        }
        100%{
            transform: translate(0%,0);
        }
    }

</style>
