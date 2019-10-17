<template>
  <div class="albums">
       
     <albumVue  v-for="(album,index) in albums" :key="index"  :album=album  />
  </div>
</template>

<script>
import albumVue from './album.vue'
 
export default {
props:  ['albums'],
 components: {
      albumVue
 },
 
}
</script>

<style>
.albums{
    display: flex;
    flex-wrap: wrap;
}
</style>