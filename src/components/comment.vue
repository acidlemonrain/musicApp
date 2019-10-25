<template>
  <div>
      <div class="comment">
          <p>{{comment.content}}</p>
          <p class="comment-author"> -{{comment.user.nickname}} 
               <img :src="comment.user.avatarUrl" height="25px" width="25px" style="border-radius:50%"> 
                 </p>
            
      </div>
  </div>
</template>

<script>
export default {
props: ['comment']
}
</script>

<style>
.comment{
    border-bottom: 1px solid #ccc;
    padding: 5px;
}
.comment-author{
    text-align: right;
}
</style>
