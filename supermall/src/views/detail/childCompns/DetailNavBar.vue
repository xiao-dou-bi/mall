<template>
  <div id="DetailNavBar">
    <nav-bar>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" 
             class="title-items"
             :class="{active: index === currentIndex}" 
             @click="titleClick(index)">
        {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '../../../components/common/NavBar/NavBar'

  export default {
    name:'DetailNavBar',
    components:{
      NavBar
    },
    data() {
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index){
        this.currentIndex = index; 
      }
    },
  }
</script>

<style>
  .title{
    display: flex;
  }
  .title-items{
    flex: 1;
    font-size: 13px;
  }
  .active{
    color: var(--color-high-text)
  }
</style>