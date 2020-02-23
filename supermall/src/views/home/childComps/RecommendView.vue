<template>
  <div class="recommendView">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" class="recommend-img">
        <div class="recommend-tit">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .recommendView{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex:1;
  }
  .recommend-img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>