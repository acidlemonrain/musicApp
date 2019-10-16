<template>
  <div>
       <router-link :to="'/album/'+album.id"  >
          <div class="album">
               <div class="album-info">
                    <div class="album-img-container">
                    <p class="album-name-detail"> {{album.name}} </p>
                    <img :src=album.coverImgUrl  class="album-img img" >
                    </div>
                    <p class="album-name"> {{album.name|shorten}} </p>
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
@media screen and (max-width: 650px) {
    .album{
        padding: 0px;
        &-name{
            font-size: 10px;
        }
          &-img{
               height: 100px !important;
               width: 100px  !important;
               &-container{
                       height: 100px !important;
                       width: 100px  !important;
               }
          }
    }
}
.album{
    padding: 10px;
    &s{
    display: flex;
    flex-wrap: wrap;
    position: relative;

    }
    &-img{
         height: 150px;
         width: 150px;
        background-color: #ccc;
    }
    &-info{
        display: flex;
        flex-direction: column;
    }
    &-name-detail{
        position: absolute;
        background-color: rgba(31, 24, 24, 0.808);
        height: 100%;
        width: 100%;
        opacity: 0;
        display: inline-block;
        transition: all .3s;
        color: whitesmoke;
        font-weight: bold
    }
    &-img-container{
         height: 150px;
         width: 150px;
         position: relative;
        &:hover .album-name-detail{
        opacity: 1;
        display: inline-block;
    }
    }
   
}
</style>