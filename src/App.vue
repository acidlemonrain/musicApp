<template>
  <div id="app">
    <div class="app-box">
      <div class="nav">
        <sidenav :show="navkey" @switch="navkey = false" />

        <div class="player-ui">
          <span class="player-ui" style="margin-left: 0" @click="navkey = true">
            <font-awesome-icon :icon="['fas', 'arrow-circle-right']" />
          </span>
          <router-link class="player-ui" to="/">
            <font-awesome-icon :icon="['fas', 'music']" />
          </router-link>
        </div>

        <span class="search">
          <input
            type="text"
            class="search-input"
            v-model="searchkey"
            @focus="gosearch"
          />
          <span class="search-icon" @click="search">
            <font-awesome-icon :icon="['fas', 'search']" />
          </span>
        </span>
      </div>


      <div style="margin-top:40px" class="app-content">
        <router-view />
      </div>

        <div style="height: 70px; width: 1px; position: relative" v-if="(!playerHide) && song ">

        </div>
      <div class="toggle-player" @click="playerHide = !playerHide" v-if="song"  :class="{moveDonw:playerHide}"  ></div>
      <playerVue :playerHide="playerHide"  :pause="paused" @playorstop="playorstop" @volume="volume" />
    </div>
  </div>
</template>
<script>
import { EventBus } from "./main";
import { mapState } from "vuex";
import playerVue from "./components/player.vue";
import sidenav from "./components/sidenav.vue";
export default {
  computed: mapState({
    user: state => state.user,
    song: state => state.player.song,
    loop: state => state.player.loop,
    mode: state => state.player.mode
  }),
  components: {
    playerVue,
    sidenav
  },
  mounted() {
    this.player = new Audio();
    this.player.autoplay = true;
    this.player.onerror = e => {
      alert("错误");
      this.$store.commit("playNext", null);
    };
    this.player.addEventListener("timeupdate", () => {
      if (this.player.src) {
        this.$store.commit("setSec", this.player.currentTime);
        this.$store.commit("setDur", this.player.duration);
        this.paused = this.player.paused;
      }
    });
    this.player.onended = () => {
      this.$store.commit("playNext", null);
    };
  },
  data() {
    return {
      navkey: false,
      searchkey: "",
      player: null,
      paused: false,
        playerHide:false
    };
  },
  methods: {
    volume(event) {
      this.player.volume = Number(event);
    },
    playorstop() {
      if (this.player.paused) {
        this.player.play();
      } else {
        this.player.pause();
      }
    },
    search() {
      EventBus.$emit("search", this.searchkey);
      this.$router.push("/search");
    },
    gosearch() {
      this.$router.push("/search");
    },
    logout() {
      this.$store.commit("setUser", null);
    }
  },
  watch: {
    song(to, from) {
      this.axios("song/url?id=" + to.id).then(res => {
        this.player.src = res.data.data[0].url;
      });
      this.axios.get("song/detail?ids=" + this.song.id).then(res => {
        this.$store.commit("setSongImg", res.data.songs[0].al.picUrl);
      });
    },

    loop(to, from) {
      console.log("loop");
      this.player.currentTime = 0;
      this.player.play();
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/main";
@import "./assets/css/utils";
.moveDonw{
    transform: translate(0,70px) rotate(45deg) !important;
}
.toggle-player {
  height: 40px;
  width: 40px;
  position: fixed;
    transition: all .2s;
  bottom: 55px;
  right: 40px;
    cursor: pointer;
    background-color: $primary-light;
    transform: rotate(45deg);
    box-shadow: 0px 0px 5px #ccc;

}
.search {
  height: 26px;
  margin: 7px;
  position: relative;
  &-input {
    outline: none;
    height: 26px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
    padding-left: 6px;
    padding-right: 30px;
    &:focus {
      background-color: $primary-light;
    }
  }
  &-icon {
    position: absolute;
    right: 8px;
    font-size: 16px;
    top: 3px;
    color: $primary;
    cursor: pointer;
  }
}
.color {
  color: $primary-darken;
}
.nav {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 40px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 2px #ccc;
  background-color: $primary-lighter;
  z-index: 8;
  &-item {
    height: 40px;
    font-size: 20px;
    padding: 10px;
    border: none;
    display: inline-block;
    color: rgba(0, 0, 0, 0.554);
  }
}
.app-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
}
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.app {
  &-content {
    height: 10px;
    flex-grow: 1;
    position: relative;
    overflow-y: scroll;
  }
  &-container {
    height: 100vh;
    width: 100vw;
  }
}
.box {
  border: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
}
</style>
