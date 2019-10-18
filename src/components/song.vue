<template>
 
    <div class="song" @click="play">
      <p> 
          <span>
              {{song.name}}
         </span> 

          <span class="text-gray" v-for="alia in song.alia" :key=alia>
               {{alia}}
           </span>


          <span class="text-gray" v-for="artist in song.ar" :key=artist.id>
               {{artist.name}}
           </span>

           <span class="text-gray" v-for="artist in song.artists" :key=artist.id>
               {{artist.name}}
           </span>
    </p>
    <p>
        <span class="text-orange" v-for="alia in song.alias" :key="alia">
                {{alia}}
        </span>
    </p>
          
  </div>
  
</template>

<script>
import {EventBus} from '../main';
export default {
    props: ['song'],
    
    methods: {
      play() {
            this.axios('song/url?id='+this.song.id).then(res=>{
                
                console.log(res.data.data[0]);

                let data = (res.data.data[0]);
                if(data.url != null){
                    data.name = this.song.name;
                    data.artists = this.song.artists
                    data.ar = this.song.ar
                         this.$store.commit('playSong',data)
                }else{
                    alert('该歌曲无法播放')
                }
              
   
            })
     }
    },
}
</script>

<style lang='scss'>
@import '../assets/css/main';
.song{
    padding: 5px 5px;
   
}
 .song:hover{
     background-color: $primary-light;
 }
 .text{
     &-gray{
         color: gray;
     }
     &-orange{
         color: rgb(231, 170, 129);
         }
 }
</style>