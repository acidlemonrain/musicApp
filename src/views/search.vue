<template>
  <div>
    
    <div class="hot-keys"  >
        <span style="color:red">热门搜索:</span>  <span @click="search(item)" class="hot-key"  v-for="item in hotKeys.data" :key="item">
        {{ item }}
    </span>
    </div>

    
           <songsVue v-show="songs.data" :songs=songs.data />
  


  </div>
</template>

<script>
import songsVue from '../components/songs.vue';
import {EventBus} from '../main';
export default {
components: {
    songsVue,
},
    data() {
        return {
            hotKeys: {
                data:null
            },
            songs:{
                data:null
            }
        }
    },
    //init
    created () {
        this.searchhot();
          EventBus.$on('search',data=>this.search(data));
    },

 
    methods: {
    search(data) {
         this.axios.get('search?keywords='+data+'&limit=100&type=1').then(res=>
            this.songs.data = (res.data.result.songs)
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


   
}
</script>

<style>
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