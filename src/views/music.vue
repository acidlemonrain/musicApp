<template>
  <div class="music-page">
    <div class="flex-box" style="margin:10px">
      <div class="music-info-img">
        <div class=" ">
          <img
            class="music-img"
            :src="song.img"
            alt=""
            srcset=""
            height="50%"
            width="50%"
            style="border-radius:50%"
          />
          <div class="title">
            {{ song.name }}
          </div>
        </div>
      </div>

      <div class="music-info-lrc">
      <div>
        <div
                v-for="(item, index) in after"
                :class="{ primary: iscurrent(item, after[index + 1]) }"
                :key="index"
                v-if="lrc"
        >
          {{ item.words }}
        </div>
      </div>
        <div v-if="!lrc">
          <p>纯音乐，无歌词</p>
        </div>
      </div>
    </div>

    <div class="flex-box" style="margin:10px">
      <div class="music-comments">
        <p class="title border-primary-bottom" style="margin:10px">
          热门评论
        </p>
        <commentVue
          v-for="comment in comments"
          :comment="comment"
          :key="comment.id"
        />
      </div>

      <div class="music-relates ">
        <p class="title border-primary-bottom" style="margin:10px  ">
          相似推荐
        </p>
        <div class="music-relates-content">
          <songsVue :songs="relates" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import { mapState } from "vuex";
import commentVue from "../components/comment.vue";
import songsVue from "../components/songs.vue";
export default {
  components: {
    commentVue,
    songsVue
  },
  computed: mapState({
    sec: state => moment.utc(state.player.sec * 1000).format("HH:mm:ss"),
    song: state => state.player.song,

    after() {

      let datas = [];
        if(this.lrc){
          let raw = this.lrc.match(/\[.*\s/g);
          raw.forEach(element => {
            let time = ("00:" + element.match(/\d.*\d/)).substr(0, 8);
            let words = ("" + element.match(/\].*/)).slice(1);
            datas.push({
              time: moment(time, "HH:mm:ss").format("HH:mm:ss"),
              words: words
            });
          });
        }
      return datas;
    }
  }),
  data() {
    return {
      lrc: false,
      current: 0,
      detail: { al: {} },
      comments: [],
      relates: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    iscurrent(time, ntime) {
      if (time && ntime && time.time && ntime.time) {
        time = moment(time.time, "HH:mm:ss");
        ntime = moment(ntime.time, "HH:mm:ss");
        let now = moment(this.sec, "HH:mm:ss");
        if (time.isBefore(now) && now.isBefore(ntime)) {
          return true;
        } else {

          return false;
        }
      } else {
        return false;
      }
    },
    init() {
      this.current = 0;
      this.axios.get("song/detail?ids=" + this.song.id).then(res => {
        this.detail = res.data.songs[0];
      });

      this.axios.get("lyric?id=" + this.song.id).then(res => {

        if(res.data.lrc.lyric){
          this.lrc = res.data.lrc.lyric;
        }

      });

      this.axios.get("comment/music?id=" + this.song.id).then(res => {
        this.comments = res.data.comments;
      });

      this.axios.get("simi/song?id=" + this.song.id).then(res => {
        this.relates = res.data.songs;
      });
    }
  },
  mounted() {

  },
  watch: {
    song(newValue, oldValue) {
      this.init();
    }
  }
};
</script>

<style lang="scss">
@media screen and (max-width: 650px) {
  .music {
    &-relates {
      width: 100% !important;
      position: relative;
      padding: 10px;
      &-content {
        width: 100%;
      }
    }
    &-comments {

      width: 100% !important;
    }
    &-img {
      animation: rotate 20s linear infinite;
      box-shadow: 0px 0px 10px #ccc;
    }
    &-info {
      &-lrc {
        width: 100% !important;
        height: 500px;
        text-align: center;
        overflow-y: scroll;
      }
      &-img {
        width: 100% !important;
        padding: 10px;
        text-align: center;
        position: relative;
      }
    }
    &-page {
      position: relative;
    }
  }
}

.music {
  &-relates {
    margin: 0px 10px;
    width: 50%;
    position: relative;
    padding: 0px;
    &-content {
      width: 100%;
    }
  }
  &-comments {
    margin: 0px 10px;
    width: 50%;
  }
  &-img {
    animation: rotate 20s linear infinite;
    box-shadow: 0px 0px 10px #ccc;
  }
  &-info {
    &-lrc {
      width: 50%;
      height: 500px;
      text-align: center;
      overflow-y: scroll;
    }
    &-img {
      width: 50%;
      padding: 10px;
      text-align: center;
      position: relative;
    }
  }
  &-page {
    position: relative;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
