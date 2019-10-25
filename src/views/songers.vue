<template>
  <div class="songers-page">
     <div class="flex-box" style="margin:10px">

            <div class="songer-type-box" >
               <p class="title border-primary-bottom" style="margin-bottom:17px; padding: 10px; ">歌手类型：</p>
               <div style="margin-bottom:10px; border: 1px solid #ccc;padding: 5px"  >
                    <p style="color:#ccc;margin-bottom: 5px">按地区:</p>
                   <button @click="type.area=1" class="songer-type">华语</button>
                   <button @click="type.area=2" class="songer-type">欧美</button>
                   <button @click="type.area=6" class="songer-type">日本</button>
                   <button @click="type.area=7" class="songer-type">韩国</button>
                   <button @click="type.area=4" class="songer-type">其他</button>
                 </div>
                  <div style="border: 1px solid #ccc;padding: 5px " >
                    <p style="color:#ccc; margin-bottom: 5px">按性别:</p>
                   <button @click="type.sex=1" class="songer-type">男歌手</button>
                   <button @click="type.sex=2" class="songer-type">女歌手</button>
                   <button @click="type.sex=3" class="songer-type">组合</button>
 
                </div>
            </div>

          <songers :songers=songers />
      
     </div>
  </div>
</template>

<script>
import songers from '../components/songers.vue'

export default {
    components: {
        songers,
    },
    computed: {
        code() {
            return this.type.area+'00'+this.type.sex
        }
    },
    data() {
        return {
            type: {
                area:1,
                sex:1
            },
            songers:[]
        }
    },
    created () {
        this.search()
    },
    methods: {
        search() {
                this.axios.get('/artist/list?cat='+this.code).then(res=>{
                  this.songers = res.data.artists   
                })
        }
    },
    watch: {
        code(newValue, oldValue) {
             this.search()
        }
    },
}
</script>

<style lang="scss"  >
    @import '../assets/css/main';
    @import '../assets/css/utils';
.songer{
    &s-page{

    }
    &-type{
        margin: 3px 5px;
        border: 1px solid $secondary;
        color: $secondary-darken;
        background-color: $primary-light;
        border-radius: 3px;
        &:hover{
            background-color: $primary;
        }
        &-box{
            margin: 10px;
            padding: 10px;
            width: 30%;
        }
     
    }
}
@media screen and (max-width: 650px) {
   .songer{
    &s-page{

    }
    &-type{
        margin: 3px 5px;

        &-box{
            margin: 10px;
            padding: 10px;
            width: 100%;
        }
     
    }
}
    
}
</style>
