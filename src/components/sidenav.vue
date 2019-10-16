<template>
  <div class="nav-page" @click.self='close' :class="{hidenav:!show}">
      <div class="nav-box"  :class="{hidenavui:!show}">
          <div class="nav-ui-title">
            列表
          </div>
          <div class="nav-ui" @click="goto('songers')">
             <font-awesome-icon :icon="['fas', 'fire']" /> 热门歌手
          </div>
           <div class="nav-ui" @click="goto('albums')">
           <font-awesome-icon :icon="['fas', 'drum']" /> 热门歌单
          </div>
            <div class="nav-ui" @click="goto('music')">
           <font-awesome-icon :icon="['fas', 'music']" /> 音乐
          </div>
            <div class="nav-ui" @click="goto('login')" v-show="user == null">
           <font-awesome-icon :icon="['fas', 'user']" /> 登录
          </div>
            <div class="nav-ui" @click="goto('user')" v-show="user != null">
           <font-awesome-icon :icon="['fas', 'user-circle']" /> 我的信息
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
props:[
  'show'
],
computed: mapState({
    user: state => state.user
  }),
methods: {
  close() {
     this.$emit('switch')
  },
  goto(x){
    this.$router.push('/'+x);
    this.close();
  }
},
}
</script>

<style lang='scss'>
 @import '../assets/css/main';
  @import '../assets/css/utils';
.hidenav{
  opacity: 0;
  visibility: hidden;
  transition:  all .2s;
  &ui{
  opacity: 0;
  transform: translate(-100%);
  }
}

.nav{
  &-ui{
    height: 35px;
    padding: 10px;
    font-size: 14px;
    color:$secondary-darken;
    transition:  all .2s;
    &:hover{
      background-color: $primary;
    }
    &-title{
      height: 40px;
      padding: 10px;
      font-size: 18px;
      border-bottom: 2px solid $secondary-darken;
    }
  }
  &-box{
    transition: all .2s;
    height: 100vh;
    width: 150px;
    position: absolute;
    background-color: $primary-light;
    box-shadow: 0px 0px 10px black;
  }
 &-page{
        
     height: 100vh;
     width: 100vw;
     position: fixed;
     z-index: 999;
     background-color: rgba(0, 0, 0, 0.308);
 }
}
</style>