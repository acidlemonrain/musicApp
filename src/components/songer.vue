<template>
    <div class="songer-box">
         <router-link class="songer" :to="'/songer/'+songer.id">
             <img :src="songer.picUrl" alt="" srcset="" class="songer-img">
        </router-link>    
    </div>
</template>

<script>
export default {
props:  ['songer']
}
</script>

<style>
.songer-box{
    padding: 10px;
}
.songer-img{
    height: 100px;
    width: 100px;
}
</style>