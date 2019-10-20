<template>
  <div class="login-page">
      <div class="login-card">
      <p class="login-title">登录</p>
      <input type="text" v-model="phone" class="border-primary block" style="margin:20px 0px">
 
      <input type="password" v-model="password" class="border-primary block">

      <button class="btn" @click="login">登录</button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            phone: '13876370375',
            password: '992273994'
        }
    },
    methods: {
        login() {
               this.axios('/login/cellphone?phone='+this.phone+'&password='+this.password).then(res=>{
                this.$store.commit('setUser',res.data)

                this.$router.push('/user')
                
            })
        }
    },
}
</script>

<style lang='scss'>
.login{
    &-page{
        height: 100%;
        width: 100%;
 
        position: relative;
    }
    &-title{
        font-size: 30px;
        
    }
    &-card{
        top: 30%;
        left: 50%;
        display: inline-block;
        transform: translate(-50%,-50%);
        position: relative;
      
    }
}
</style>
