import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      player:{
        searchKey:null,
        data:{
          song:{}
        },
     
      },
      user:null
  },
  mutations: {


      setPlayer(state,info){
        state.player.data= info;
      },
      setUser(state,info){
        state.user = info;
      },


  },
  actions: {
    
  }
})
