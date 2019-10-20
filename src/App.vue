<template>
  <div id="app">
     <div class="app-box">

   
      
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
     
        <router-view/>
    
    </div>

<playerVue :pause=paused @playorstop=playorstop @volume=volume  />
 

 
  
 
  </div>
  </div>
</template>
<script>
 
import {EventBus} from './main';
import { mapState } from 'vuex'
import playerVue from './components/player.vue';
import sidenav from './components/sidenav.vue';
export default {
    computed: mapState({
    user: state => state.user,
    song:state => state.player.song ,
    loop:state => state.player.loop ,
  }),
  components: {
     playerVue,sidenav
  },
  mounted () {

      this.player = new Audio()
      this.player.autoplay = true
      this.player.onerror = (e)=>{
          alert('错误')
         this.$store.commit('playNext',null)
      }
      this.player.addEventListener('timeupdate',()=>{
           if(this.player.src){
            this.$store.commit('setSec',this.player.currentTime)
            this.$store.commit('setDur',this.player.duration)
            this.paused = this.player.paused
          }
      })
      this.player.onended=()=>{
         this.$store.commit('playNext',null)
      }
  },
  data() {
    return {
      navkey: false,
      searchkey:'',
      player:null,
      paused :false
    }
  },
    methods: {
      volume(event){
       this.player.volume = Number(event)
        
      },
      playorstop(){
      if(this.player.paused){
          this.player.play()
      }else{
          this.player.pause()
      }
      },
      search(){
          EventBus.$emit('search',this.searchkey)
          this.$router.push('/search');
         
      },
      gosearch() {
          this.$router.push('/search');
      },
      logout(){
       this.$store.commit('setUser',null);
      },
 

    },
    watch: {
      song(to, from) {
          this.player.src = to.url;
          this.axios.get("song/detail?ids=" + this.song.id).then(res => {
               this.$store.commit('setSongImg',res.data.songs[0].al.picUrl)
          });
      },

      loop(to, from) {
          this.player.currentTime = 0
      }
    },
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
    color: $primary;
    cursor: pointer;
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
.app-box{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100vw;

}
#app{
  height: 100vh;
  width: 100vw;
    overflow: hidden;
}
.app{
  &-content{
  height: 10px;
  flex-grow: 1;
  position: relative;
  overflow-y: scroll;
 
  }
  &-container{
    height: 100vh;
    width: 100vw;

  }
}
.box{
    border: 1px solid #ccc;
    padding: 5px;
    margin: 5px;
}
</style>
