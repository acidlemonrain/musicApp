<template>
  <div class="flex-box">
    <div class="flex-item">
      <div class="box">
          <div class="switch">
              <button @click="songmode=true" class="btn btn-second" style="margin-right:10px">热门歌曲</button>
              <button @click="songmode=false" class="btn btn-second" >歌手信息</button>
          </div>
          <songerInfoVue v-show="!songmode" :info=info />
          <songsVue v-show="songmode" :songs=songs />
      </div>
    </div>
      <div class="flex-item  " >
        <div >
            <p class="title" style="text-align: center">相似歌手</p>
            <songers :songers = relates />
        </div>
      </div>
  </div>

</template>

<script>
import songsVue from '../components/songs.vue'
import songerInfoVue from '../components/songerInfo.vue'
import songers from "../components/songers";
export default {
    components: {
        songsVue,songerInfoVue,songers
    },
    computed: {
        id() {
            return this.$route.params.id
        }
    },
   data() {
        return {
            info: {},
            songs:[],
            songmode:true,
            relates:[]
        }
    },
    created () {
       this.init()
    },
    methods: {
        init() {
             this.axios.get('artist/desc?id='+this.$route.params.id).then(res=>{
            this.info = res.data
            console.log(this.info);
            
        })
        this.axios.get('artists?id='+this.$route.params.id).then(res=>{
            this.songs = res.data.hotSongs
         })
           this.axios.get('simi/artist?id='+this.$route.params.id).then(res=>{
               this.relates = res.data.artists
           })
        }
    },
    watch: {
        id(newValue, oldValue) {
            this.init()    
        }
    },
}
</script>

<style lang="scss"  >
 @import '../assets/css/main';
  @import '../assets/css/utils';
.switch{
    margin: 10px;
    padding: 10px;
    border-bottom: 1px solid $primary;
}
</style>
