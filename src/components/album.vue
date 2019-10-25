<template>
  <div>
       <router-link :to="'/album/'+album.id"  >
          <div class="album">
               <div class="album-info">
                    <div class="album-img-container">
                    <p class="album-name-detail"> {{album.name}} </p>
                    <img :src=album.coverImgUrl||album.picUrl  class="album-img img" >
                    </div>
                    <p class="album-name"> {{album.name|shorten}} </p>
                   <p v-if="album.playCount" class="album-name">播放量: <span class="secondary">{{album.playCount}}</span> </p>
               </div>   
          </div>
        </router-link  >
  </div>
</template>

<script>
export default {
props: ['album'],
 filters: {
        shorten: function(value) {
                return value.length>7? value.substring(0,7)+'..':value
        }
    }

}
</script>


<style lang='scss'>

</style>
