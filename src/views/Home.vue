<template>
  <div class="home">
  <div class="home-block"  >
      <div>

        <p class="border-primary-bottom title" style="display: inline-block">最新MV</p>

      <div  style="display: flex;     flex-wrap: wrap;">
        <router-link :to="'/mv/'+mv.id" class="home-mv" v-for="mv in data" :key="mv.id">
          <div style="height: 170px;width: 170px;overflow: hidden">
            <img class="home-mv-img hover-img-mv"   :src="mv.cover" alt="mv.name">
          </div>
          <div   style="width:170px; margin-top: 10px">
            <p class="primary-darken">  {{mv.name}} </p>
              <p style="margin-top: 10px;color: #cccccc">  {{mv.briefDesc}}</p>
          </div>
        </router-link>
      </div>

      </div>
  </div>

    <div class="home-block"  >

      <div>
        <p class="border-primary-bottom title" style="display: inline-block">热门歌手</p>

        <div   style="display: flex;     flex-wrap: wrap;">
          <router-link :to="'/songer/'+songer.id" class="home-mv" v-for="songer in artists" :key="songer.id">
            <img  class="hover-img-songer"  style="width: 170px ;height: 170px;border-radius: 50%"  :src="songer.picUrl" alt="songer.name">
            <div   style="width:170px; margin-top: 10px">
              <p class="primary-darken" style="text-align: center">  {{songer.name}} </p>
              <p style="margin-top: 10px;color: #cccccc">

              </p>
            </div>
          </router-link>
        </div>
      </div>

    </div>



    <div class="home-block"  >

      <div>

        <p class="border-primary-bottom title" style="display: inline-block">热门歌单</p>

        <div   style="display: flex;     flex-wrap: wrap;">
          <router-link :to="'/album/'+album.id" class="home-mv" v-for="album in albums" :key="album.id">
            <img class="home-mv-img hover-img-album " style="border: none"  :src="album.coverImgUrl" alt="album.name">
            <div   style="width:170px; margin-top: 10px">
              <p class="primary-darken">  {{album.name}} </p>
              <p style="margin-top: 10px;color: #cccccc">
              <span class="secondary-darken" v-for="item in album.tags" :key="item">
                {{ item }}
              </span>
              </p>
            </div>
          </router-link>
        </div>

      </div>

    </div>




    </div>





</template>

<script>

  export default {
    components:{

    },
  data() {
    return {
      data: [ ],
      albums:[],
      artists:[]
    }
  },
  created() {
    this.axios.get('mv/first?limit=3').then(res=>{
      this.data = res.data.data
    })
    this.axios.get('top/playlist?limit=3').then(res=>{
      this.albums = res.data.playlists
    })
    this.axios.get('toplist/artist').then(res=>{
      this.artists = res.data.list.artists.slice(0,3)
    })
  }
}
</script>
<style lang="scss">
  @import '../assets/css/main';
  @import '../assets/css/utils';

  .hover-img{

    &-mv{
      transition: all .4s;
      transform: scale(1.1);
      &:hover{
        transform: scale(1);
      }
    }

    &-songer{
      transition: all .2s;
      -webkit-filter: grayscale(70%);
      filter: grayscale(70%) ;
      &:hover{
        -webkit-filter: grayscale(0%)  ;
        filter: grayscale(0%)  ;
      }
    }

    &-album{
      transition: all .2s;
      transition:  all .2s;
      &:hover{
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.52);
      }
    }



  }

  .home{
    width: 100%;
    &-albums{
      background-color: #eecad9;
    }
    &-mv{
      margin: 10px;
      border: 2px solid white;
      background-color: white;
      display: flex;
      flex-direction: column;
      padding: 10px;
      transition: all .2s;

      &-img{

        height: 170px;
        width: 170px;
        border: 2px solid $secondary ;
      }
    }
   &-block{
      width: 100%;
     padding: 10px;
     display: flex;
     background-size: cover;
     justify-content: center;

   }
  }

</style>
