<template>
  <div>
      <span  id="top"></span>
      <div class="introduction">
          <a href="#top" class="totop"> 
               <font-awesome-icon   :icon="['fas', 'arrow-circle-up']" />
          </a>
            <div class="info-block">
            <div class="title">
              简介
          </div>
          <p>
              {{info.briefDesc}}}
          </p>
            </div>

          <div v-for="item in info.introduction" :key="item.id">
              <div class="info-block">
                   <div class="title">
                 {{item.ti}}
             </div>
             <p>
                 {{item.txt}}
             </p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
props:['info']
}
</script>

<style lang='scss'>
  @import '../assets/css/main';
.totop{
    position: fixed;
    right: 30px;
    bottom: 70px;
    color:$primary-light;
   font-size: 20px;
}
.introduction{
    margin: 10px;

    padding: 10px;
}
.info-block{
    max-width: 500px;

    margin:  auto;
    margin-bottom: 40px;
    line-height: 25px;
    letter-spacing: 2px
}
</style>
