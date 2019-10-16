<template>
  <div class="albums"> 
      <albumVue  v-for="(album,index) in albums.data" :key="index"  :album=album  />
       
  </div>
</template>

<script>
import albumVue from '../components/album.vue'

export default {
components: {
        albumVue,
},
//数据
data() {
    return {
        albums: {
            data:null
        }
    }
},
//初始化
 created () {
       this.axios.get('top/playlist/highquality?limit=40').then(res=>{
           this.albums.data = res.data.playlists
       })
    },


//
}
</script>
