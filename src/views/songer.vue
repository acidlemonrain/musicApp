<template>
  <div>
      <div class="switch">
            <span @click="songmode=false" class="btn" style="margin-right:10px">歌手信息</span>
           <span @click="songmode=true" class="btn">热门歌曲</span>
      </div>
      <songerInfoVue v-show="!songmode" :info=info />
      <songsVue v-show="songmode" :songs=songs />
  </div>
</template>

<script>
import songsVue from '../components/songs.vue'
import songerInfoVue from '../components/songerInfo.vue'

export default {
    components: {
        songsVue,songerInfoVue
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
            songmode:true
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