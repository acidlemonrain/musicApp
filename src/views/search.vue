<template>
  <div>
    
    <div class="hot-keys"  >
        <span style="color:red">热门搜索:</span>  <span @click="search(item)" class="hot-key"  v-for="item in hotKeys.data" :key="item">
        {{ item }}
    </span>
    </div>

    
          <div  v-show="data">
              <div>
                    <p> 
                      
                        <span class="search-type" @click="type=1">单曲</span>
                        <!-- <span class="search-type" @click="type=10">专辑</span> -->
                        <span class="search-type" @click="type=100">歌手</span>
                        <span class="search-type" @click="type=1000">歌单</span>
                        <span class="search-type" @click="type=1004">MV</span>
                    </p>
              </div>

               <songs-vue v-if="type == 1" :songs=data.result.songs />
               <songers-vue v-if="type == 100" :songers=data.result.artists />
               <mvs v-if="type == 1004" :mvs=data.result.mvs />
              <albums-vue v-if="type == 1000" :albums=data.result.playlists />
          </div>
  


  </div>
</template>

<script>
import songsVue from '../components/songs.vue';
import songersVue from '../components/songers.vue';
import albumsVue from '../components/albums.vue';
import mvs from "../components/mv/mvs";
import {EventBus} from '../main';
export default {
components: {
    songsVue,songersVue,albumsVue,mvs
},
    data() {
        return {
            hotKeys: {
                data:null
            },
            key:'',
           data:{
                 result:{}
            },
            type:1
        }
    },
    //init
    created () {
        this.searchhot();
          EventBus.$on('search',data=>this.search(data));
    },

 
    methods: {
    search(data) {
         this.axios.get('search?keywords='+data+'&limit=100&type='+this.type).then(res=>{
            this.key = data
            this.data = (res.data)
            console.log(this.data);
            
         }
         )
    },
    //热门搜索
       searchhot() {
        this.axios.get('search/hot').then(res=>{
          this.hotKeys.data = (res.data.result.hots.map(ele => ele.first))
        }
      )
     },
  
    },

    watch: {
        type(newValue, oldValue) {
            this.search(this.key)
        }
    },

   
}
</script>

<style>
.search-type{
    margin: 7px;
    border: 1px solid #ccc
}
.search-type:hover{
    border: 1px solid lightcoral
}
.hot-key{
        margin: 10px;
        font-size: 16px;
        color: rgb(73, 71, 71);
}
.hot-keys{
    margin: 10px;
    padding: 6px;
    border: 1px dotted #ccc;
}
</style>
