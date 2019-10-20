<template>
  <div class="album-page">
    <div class="album-info">
      <div class="box loader" v-if="!info">
        <p>
          <span><font-awesome-icon :icon="['fas', 'spinner']"/></span>
          <span>加载中</span>
        </p>
      </div>
      <div v-if="info != false">
        <div class="album-info-basic">
          <img :src="info.coverImgUrl" height="100px" width="100px" />
          <div class="info-basic-txt">
            <p class="album-title">{{ info.name }}</p>
            <p>
              <span class="secondary">
                标签:
              </span>
              <span v-for="tag in info.tags" :key="tag">
                {{ tag }}
              </span>
            </p>
          </div>
        </div>
        <div class="box" ref='des' id="des">
          <span class="secondary-darken">简介:</span>
          <div v-if="!info.description||info.description.length < 200">
            {{ info.description||'空空如也...'}}
          </div>
          <div v-if="info.description && info.description.length >= 200">
            <p v-show="!more">{{ info.description.substr(0, 200) }}...</p>
            <p v-show="more">{{ info.description }}</p>
            <p style="text-align: right" class="primary-darken">
              <span style="cursor: pointer" v-show="!more" @click="more = !more">
                <font-awesome-icon   :icon="['fas', 'caret-down']" />
                加载更多</span
              >
                <span style="cursor: pointer" v-show="more" @click="more = !more">
                <font-awesome-icon  :icon="['fas', 'caret-up']" />
                收起</span
                >
            </p>
          </div>
        </div>
        <div class="box">
          <songsVue :songs="info.tracks" />
        </div>
      </div>
    </div>

    <div class="album-relates">
      <p class="album-relates-title">相关推荐</p>
      <div class="album-relates-box">
        <albumVue
          v-for="(album, index) in relates"
          :key="index"
          :album="album"
        />
      </div>
      <p class="title" style="margin-bottom:10px">评论</p>
      <commentVue
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
      />
    </div>
  </div>
</template>

<script>
import albumVue from "../components/album.vue";
import songsVue from "../components/songs.vue";
import commentVue from "../components/comment.vue";
export default {
  components: {
    songsVue,
    albumVue,
    commentVue
  },
  data() {
    return {
      info: false,
      relates: [],
      comments: [],
      more: false
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    init() {
      this.info = false
      this.relates = []
      this.comments =[]
      this.more =false
      this.axios
        .get("playlist/detail?id=" + this.$route.params.id)
        .then(res => {
          this.info = res.data.playlist;
        }).then(res=>{
          this.$refs.des.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.90)) , url('+this.info.coverImgUrl+')'
      })
      this.axios
        .get("/related/playlist?id=" + this.$route.params.id)
        .then(res => {
          this.relates = res.data.playlists;
          console.log("推荐歌单");
          console.log(this.relates);
        });
      this.axios
        .get("/comment/playlist?id=" + this.$route.params.id)
        .then(res => {
          this.comments = res.data.comments;
          console.log(res.data);
        });
    },
    sub() {
      this.axios
        .get("playlist/subscribe?t=1&id=" + this.$route.params.id)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log("playlist/subscribe?t=1&id=" + this.$route.params.id);
        });
    }
  },
  created() {
    this.init();
  },
  watch: {
    id(to, oldValue) {
      this.init();
    }
  }
};
</script>

<style lang="scss">
@media screen and (max-width: 650px) {
  .album {
    &-relates {
      width: 100% !important;

      &-box {
        display: flex;
        flex-wrap: wrap;
      }
      &-title {
        border-bottom: 1px dotted #ccc;
        font-size: 18px !important;
      }
    }
    &-title {
      font-size: 20px !important;
    }
    &-page {
      display: block !important;
    }
    &-info {
      width: 100% !important;
      padding: 2px !important;
      &-basic {
        padding: 10px;
        border: 1px solid #ccc;
        display: flex;
      }
    }
  }
  .info-basic-txt {
    margin-left: 20px;
  }
}

.album {
  &-relates {
    width: 50%;
    padding: 10px;

    &-box {
      display: flex;
      flex-wrap: wrap;
    }
    &-title {
      border-bottom: 1px dotted #ccc;
      font-size: 24px;
    }
  }
  &-title {
    font-size: 26px;
  }
  &-page {
    display: flex;
  }
  &-info {
    width: 50%;
    padding: 10px;
    &-basic {
      padding: 10px;
      border: 1px solid #ccc;
      display: flex;
    }
  }
}
.info-basic-txt {
  margin-left: 20px;
}
    #des{
        background-position: top;
        background-size: cover;

    }
</style>
