<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" 
      class="tab-control-item" 
      :class="{active: index === currentIndex}" 
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    title:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }, 
}
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    color: #706f72;
    height: 40px;
    line-height: 40px;
     background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-high-text);
    padding: 3px;
  }
</style>