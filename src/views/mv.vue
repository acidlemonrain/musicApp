<template>
    <div>
        <div class="mp4 box flex-box" ref="mp4"  >

                <video v-if="movie" class="flex-item-long" :src="movie.url"   controls></video>
                <div  class="flex-item-short box"   v-if="detail">
                    <p class="title">
                        {{detail.name}}
                    </p>
                    <p>
                        发布时间: {{detail.publishTime}}


                    </p>
                    <p>
                        歌手: {{detail.artistName}}
                    </p>
                    <p>
                        简介:{{detail.desc||'无'}}
                    </p>
                </div>

        </div>
        <div class="flex-box">
            <div class="flex-item box">
                <p class="title">
                    热门评论:

                </p>
                <comment v-for="comment in comments.hotComments" :comment="comment" :key="comment.id" />
            </div>
            <div class="flex-item box">
                <p class="title">
                    相似MV:
                </p>
                <div class="mvs">
                    <mvs :mvs=relates.mvs  />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mvs from "../components/mv/mvs";
    import comment from "../components/comment";
    export default {
        components:{
            comment,mvs
        },
        computed:{
          id(){
              return this.$route.params.id
          }
        },
        data() {
            return {
                movie: null,
                detail:null,
                comments:[],
                relates:[]
            }
        },
        methods: {
            init() {
                this.axios.get('mv/url?id='+this.id).then(res=>{
                    this.movie = res.data.data
                })
                this.axios.get('mv/detail?mvid='+this.id).then(res=>{
                    this.detail = res.data.data
                }).then(res=>{
                    this.$refs.mp4.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.90)) , url('+this.detail.cover+')'
                })

                this.axios.get('comment/mv?id='+this.id).then(res=>{
                    this.comments = res.data
                    console.log(this.comments)
                })

                this.axios.get('simi/mv?mvid='+this.id).then(res=>{
                    this.relates = res.data
                    console.log(this.relates)
                })
            }
        },
        created() {
            this.init()
        },

        watch: {
           id(newValue, oldValue) {
             this.init()
            }
        },

    }
</script>

<style scoped>
.mp4{
background-size: cover;
background-position: center;
}
</style>
