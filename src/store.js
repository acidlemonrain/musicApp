import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      player:{
        sec:0,
        playlist:[],
        song:null,
        dur:0,
        index:-1,
        mode:'list',
        loop:1,
      },
      user:null,
    
  },
  mutations: {

       
      setUser(state,info){
        state.user = info;
      },
      //
      setSec(state,info){
        state.player.sec = info;
      },
      setDur(state,info){
        state.player.dur = info;
      },
      //
      setMode(state,info){
        state.player.mode = info;
      },
      //
      addSong(state,info){
        if(state.player.playlist.map(ele=>ele.id).includes(info.id)){

        }else{
          state.player.playlist.push(info);
        }
    
      },
      //
      playSong(state,info){
        let index = state.player.playlist.map(ele=>ele.id).indexOf(info.id)
        //不在列表
        if(index == -1){
          state.player.playlist.push(info);
          state.player.song = info
        }else{
          state.player.song = state.player.playlist[index]
        }
      },
      //
      playNext(state,info){
        if(state.player.mode == 'random'){
            let random = Math.round((Math.random()*(state.player.playlist.length)))
            state.player.index = random
            state.player.song = state.player.playlist[random];
        }else if(state.player.mode == 'list'){
          state.player.index ++;
          if(state.player.index >= state.player.playlist.length){
            state.player.index = 0
          }
          state.player.song = state.player.playlist[state.player.index];
        }else{
          state.player.loop = -state.player.loop
        }
      }
 

  },
  actions: {

  }
})
