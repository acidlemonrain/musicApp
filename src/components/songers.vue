<template>
  <div class="songers-box">
      <div class="songers">
             <songer-vue :songer=songer v-for="songer in songers" :key="songer.id"/>
        </div>
  </div>
</template>

<script>
import songerVue from './songer.vue'
songerVue
export default {
components: {
     songerVue,
},
props: ['songers']
}
</script>

<style>
.songers{
    display: flex;
    flex-wrap: wrap;
   
    margin: 10px;
}
.songers-box{
    width: 70%;
}
@media screen and (max-width: 650px) {
.songers-box{
    width: 100%;
}
}
</style>