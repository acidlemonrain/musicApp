<template>
  <div class="song" >
    <p>
      <span>
        {{ song.name }}
      </span>

      <span class="text-gray" v-for="alia in song.alia" :key="alia">
        {{ alia }}
      </span>

      <router-link  :to="'/songer/'+artist.id" class="text-gray" v-for="artist in song.ar" :key="artist.id">
        {{ artist.name }}
      </router-link>

      <router-link  class="text-gray"  :to="'/songer/'+artist.id" v-for="artist in song.artists" :key="artist.id">
        {{ artist.name }}
      </router-link >
    </p>
    <p>
      <span class="text-orange" v-for="alia in song.alias" :key="alia">
        {{ alia }}
      </span>
    </p>
      <p class="play-btn" v-if="isUi">
          <span @click="play(true)"><font-awesome-icon :icon="['fas', 'play-circle']" class="song-icon" title="播放该歌曲"   /></span>
          <span @click="play(false)"><font-awesome-icon :icon="['fas', 'plus']" class="song-icon" title="添加到播放列表" /></span>
      </p>
  </div>
</template>

<script>
import { EventBus } from "../main";
export default {
    props: {
        song: {
            type: Object,
            default: ()=>{
                return {}
            }
        },
        isUi:{
            type: Boolean,
            default:true
        }
    },

  methods: {
    play(x) {
      this.axios("song/url?id=" + this.song.id).then(res => {
        console.log(res.data.data[0]);

        let data = res.data.data[0];
        if (data.url != null) {
          data.name = this.song.name;
          data.artists = this.song.artists;
          data.ar = this.song.ar;
          if(x == true){

              this.$store.commit("playSong", data);
          }else{
              this.$store.commit("addSong", data);
          }

        } else {
          alert("该歌曲无法播放");
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/main";
.song {
  padding: 5px 5px;
    &-icon{
        margin: 0 4px;
         color: $secondary;
        &:hover{
            color: $secondary-darken;
        }
    }
}
.song:hover {
  background-color: $primary-light;

}

.text {
  &-gray {
    color: gray;
  }
  &-orange {
    color: rgb(231, 170, 129);
  }
}
    .play-btn{
        text-align: right;

        color: $secondary;
        transition: all .2s;
    }
</style>
