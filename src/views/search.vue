<template>
  <div>
      {{searchKey}}
    <div @click="hotkey(item)" v-for="item in hotKeys.data" :key="item">
        {{ item }}
    </div>

    <div class="songs">
        <div v-for="item in songs.data" :key="item.id">
           <songVue :song=item />
        </div>
    </div>


  </div>
</template>

<script>
import songVue from '../components/song.vue';
songVue
export default {
components: {
    songVue,
},



    data() {
        return {
            hotKeys: {
                data:null
            },
            myKey:{
                data:null
            },
            songs:{
                data:null
            }
        }
    },
    computed: {
        searchKey() {
            return this.$store.state.player.searchKey 
        }
    },

    //init
    created () {
        this.searchhot();
    },

 
    methods: {
    //热门搜索
       searchhot() {
        this.axios.get('search/hot').then(res=>{
          this.hotKeys.data = (res.data.result.hots.map(ele => ele.first))
        }
      )
     },
    //点击热门搜索
      hotkey(item){
          let temp = this.$store.state.player;
          temp.searchKey = item
          this.$store.commit('setPlayer',temp);
      }
    },


    watch: {
        //搜索关键词
        searchKey(newValue, oldValue) {
            this.axios.get('search?keywords='+newValue+'&limit=100&type=1').then(res=>
            this.songs.data = (res.data.result.songs)
         )
        }   
    },
}
</script>

<style>

</style>