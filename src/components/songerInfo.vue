<template>
  <div>
      <div class="introduction">
          
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

<style>
.introduction{
    margin: 10px;
    border: 1px solid #ccc;
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