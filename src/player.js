import {Howl, Howler} from 'howler';


export var  player = {
    data:{
        sound : null,
        srcs : [],
        mode :'random',
        index:0,
        song:{},
        progress : 0,
        sec:0
    },

    getNext:()=>{
        if(player.data.mode == 'random'){
            player.data.index = Math.floor(Math.random()*player.data.srcs.length);
        }else{
        player.data.index++;
        player.data.index = (player.data.index + player.data.srcs.length) % player.data.srcs.length;  
        }
        player.data.song = player.data.srcs[player.data.index];
      
        
        return player.data.srcs[player.data.index].url;
    },


    playNext:()=>{
        console.log('音乐开始');
        
        if(player.data.sound){
            player.data.sound.unload()
        }
        //play
        player.data.sound =  new Howl({
            src: player.getNext(),
            autoplay: true,
            onend:()=>{
                player.playNext()
            },
            onplay:()=>{
                player.updateProgress()
            },
         }) 
    },

    updateProgress:()=>{
        player.data.progress = player.data.sound.seek()*100/player.data.sound.duration()
        requestAnimationFrame(player.updateProgress);
        (player.data.sec = player.data.sound.seek());
        
    },




    play : (song)=>{
        if(player.data.sound){
            player.data.sound.unload()
        }
         
        if( player.data.srcs.map(song=>song.id).indexOf(song.id) != -1){
              

        }else{
        player.data.srcs.push(song);       
        }
        //play
          player.data.song = song;
          player.data.sound =  new Howl({
              src: song.url,
              autoplay: true,
              onend:()=>{
                  player.playNext()
              },
              onplay:()=>{
                  player.updateProgress(); 
              },
           }) 
       
              




       
    }
}