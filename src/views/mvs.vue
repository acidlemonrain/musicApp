<template>
    <div>
       <mvs :mvs="mvs" ></mvs>
    </div>
</template>

<script>
    import mvs from "../components/mv/mvs";
    export default {
        components:{
            mvs
        },
        data() {
            return {
                mvs: [

                ]
            }
        },
        created() {
            this.axios('mv/all').then(res=>{
                this.mvs = res.data.data
                console.log(res.data)
            })
        },

    }
</script>

<style scoped>
.mvs{
    display: flex;
    flex-wrap: wrap;
}
</style>
