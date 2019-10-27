<template>
  <div>
    <div class="comment">
      <p>{{ comment.content }}</p>
      <p class="comment-author">
        -{{ comment.user.nickname }}
        <img
          :src="comment.user.avatarUrl"
          height="25px"
          width="25px"
          style="border-radius:50%"
        />
      </p>
      <div style="text-align: end">


        <font-awesome-icon class="comment-like" @click="like(comment.commentId)" :icon="['fas', 'thumbs-up']" />
        <span
                style="color: gray;font-size: 10px;width: 200px;margin-left: 4px"
        >{{ comment.likedCount | shorten }}</span
        >


      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
export default {
  props: ["comment"],
    computed: mapState({
        user: state => state.user,
        song: state => state.player.song,
    }),
    methods: {
        like(cid) {
            this.axios.get('comment/like?id='+this.song.id+'&cid='+cid+'&t=1&type=0').then(res=>{
                console.log(res.data)
            })
        }
    },
  filters: {
    shorten(value) {
      value = value + "";
      if (value.length > 3) return value.slice(0, -3) + "k";
      else {
        return value;
      }
    }
  }
};
</script>

<style>
.comment {
  border-bottom: 1px solid #ccc;
  padding: 5px;
}
.comment-like {
  color: gray;
    cursor: pointer;
}
.comment-like:hover {
  color: red;
}
.comment-author {
  text-align: right;
}
</style>
