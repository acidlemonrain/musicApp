<template>
  <div>
    <router-link :to="'/mv/'+mv.id">
        <div class="album">
            <div class="album-info">
                <div class="album-img-container">
                    <p class="album-name-detail"> {{mv.name}} </p>
                    <img :src=mv.cover  class="album-img img" >
                </div>
                <p class="album-name"> {{mv.name|shorten}} </p>
            </div>
        </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["mv"],
    filters: {
        shorten: function(value) {
            return value.length>7? value.substring(0,7)+'..':value
        }
    }
};
</script>

<style scoped></style>
