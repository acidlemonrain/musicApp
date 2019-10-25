<template>
    <div>
        <div class="mvs">
            <mv :mv="mv"  v-for="mv in mvs " :key="mv.id"  />
        </div>
    </div>
</template>

<script>
    import mv from "./mv";
    export default {
        name:'mvs',
        props:['mvs'],
        components:{
            mv
        },
    }
</script>

<style scoped>
    .mvs{
        display: flex;
        flex-wrap: wrap;
    }
</style>
