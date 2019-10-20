<template>
  <div class="user-page">
      <div class="user-profile">
       
        <div class="card-box">





            <p class="user-title"> 基本信息 </p>
               <div class="user-basic">
               <img :src=user.profile.avatarUrl class="user-avatar" >
               <p class="primary-darken"> 昵称: {{user.profile.nickname}} </p>  
          </div>
        </div>

       <div class="card-box"  >
           <p class="user-title"> 我的收集 </p>
            <div class="user-collections">
                  <albumVue  v-for="(album,index) in collection" :key="index"  :album=album  />
            </div>
       </div>
       <div class="card-box">
             <p class="user-title"> 每日推荐 </p>
         <songsVue :songs=dailySongs />
       </div>
      </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import albumVue from '../components/album.vue';
import songsVue from '../components/songs.vue';
 
export default {
  components: {
        albumVue,songsVue
    },
  computed: mapState({
    user: state => state.user
  }),
  data() {
      return {
          collection: [ ],
          dailySongs:[]
      }
  },

  created () {

      this.axios.get('user/playlist?uid='+this.user.profile.userId).then(res=>{
          this.collection = (res.data.playlist);
      })
      this.axios.get('login/status').then(res=>{
  
          
      })
      this.axios.get('recommend/songs').then(res=>{
               this.dailySongs = res.data.recommend
      })
  },
}
</script>

<style lang='scss'>
.user{
    &-page{
        margin-top: 30px;
    }
    &-title{
        font-size: 30px;
        margin: 10px;
    }   
    &-avatar{
        border-radius: 50%;
        margin-right: 30px;
    }
    &-collections{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
    }
    &-profile{
        width: 90%;
        margin: auto;
    }
    &-basic{
        display: flex;
        align-items: center;
    }
}
.card-box{
    margin: 10px 0px;
    border:1px solid #ccc;

    padding: 10px;
}
</style>
