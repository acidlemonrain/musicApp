<template>
  <div id="app">

  
 
    <div class="nav">

      <!-- <router-link to="/" class="nav-item bg-primary ">热门歌手</router-link>
      <router-link to="/albums" class="nav-item bg-primary-darken">热门歌单</router-link>
      <router-link to="/about" class="nav-item bg-primary">测试页面</router-link>
       <router-link to="/music" class="nav-item bg-primary">音乐</router-link>
      <router-link to="/login" class="nav-item bg-secondary" v-show="user == null">登录</router-link>
      <router-link to="/user" class="nav-item bg-secondary" v-show="user != null">用户中心</router-link>
      <button  @click="logout" class="nav-item bg-secondary" v-show="user != null">注销</button>
      <input type="text" @focus="gosearch"> -->
      <sidenav  :show=navkey @switch="navkey=false"  />
      <span class="player-ui" @click="navkey=true">    <font-awesome-icon :icon="['fas', 'arrow-circle-right']" />     </span>
      <span class="search">
         <input type="text" class="search-input" v-model="searchkey" @focus="gosearch"> 
         <span class="search-icon" @click="search">
           <font-awesome-icon :icon="['fas', 'search']" />
         </span>
       </span>
    </div>

    <div style="margin-top:40px" class="app-content">
     <keep-alive>
        <router-view/>
     </keep-alive>
    </div>

<playerVue/>
 


  </div>
</template>
<script>

import {player}  from './player';
import {EventBus} from './main';
import { mapState } from 'vuex'
import playerVue from './components/player.vue';
import sidenav from './components/sidenav.vue';
export default {
    computed: mapState({
    user: state => state.user
  }),
  components: {
     playerVue,sidenav
  },
  mounted () {
    this.progressAnimation();
    EventBus.$on('play', song => {
   player.play(song);
      this.$store.commit('setPlayer',player.data);
    })
  },
  data() {
    return {
      navkey: false,
      searchkey:''
    }
  },

    methods: {
      search(){
          EventBus.$emit('search',this.searchkey)
      },
      gosearch() {
          this.$router.push('/search');
      },
      logout(){
       this.$store.commit('setUser',null);
      
      },
      progressAnimation(){
          requestAnimationFrame(this.progressAnimation);
         this.$store.commit('setPlayer',player.data);
      },

    }
    
    }
 
</script>
 
<style lang="scss">
 @import './assets/css/main';
  @import './assets/css/utils';
.search{
  height: 26px;
  margin:7px;
  position: relative;
  &-input{
  outline: none;
  height: 26px;
  border: 1px solid #ccc;
  border-radius:10px;
  font-size: 16px;
  padding-left:   6px;
  padding-right:   30px;
  &:focus{
    background-color: $primary-light
  }
  }
  &-icon{
    position: absolute;
    right: 8px;
    font-size: 16px;
    top: 3px;
    color: $primary
  }
}
.color{
  color: $primary-darken;
}
.nav{
  position: fixed;
  top: 0;
  width: 100vw;
  height: 40px;
  display: flex;
  justify-content: space-between;
  z-index: 8;
 box-shadow: 0px 0px 1px #ccc;
  &-item{
    height: 40px;
    font-size: 20px;
    padding: 10px;
    border: none;
    display: inline-block;
    color:rgba(0, 0, 0, 0.554);
  }
}
#app{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100vw;

}
.app{
  &-content{
  height: 10px;
  flex-grow: 1;
  position: relative;
  overflow-y: scroll;
 
  }
}

</style>
