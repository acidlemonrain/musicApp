<template>
  <div class="home">
    <img src="@/assets/music.svg"  class="music-svg" >
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss">

  .home{
    width: 100%;

    text-align: center;

  }
  .music-svg{

    position: relative;
    height: 70vh;
    width: 80vw;


  }
</style>
