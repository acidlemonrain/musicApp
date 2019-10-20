<template>
    <div class="songer-box">
         <router-link class="songer" :to="'/songer/'+songer.id">
             <img :src="songer.picUrl" alt="" srcset="" class="songer-img">
             <p class="songer-name"> {{songer.name|shorten}} </p>
        </router-link>    
    </div>
</template>

<script>
export default {
props:  ['songer'],
 filters: {
        shorten: function(value) {
                return value.length>7? value.substring(0,7)+'..':value
        }
    }
}
</script>

<style lang='scss'>

.songer-box{
    padding: 10px;
}
.songer-img{
    height: 120px;
    width: 120px;
}

@media screen and (max-width: 650px) {
  .songer-box{
    padding: 5px;
}
    .songer-name{
        font-size: 10px;
    }
.songer-img{
    height: 100px;
    width: 100px;
}
}

</style>
