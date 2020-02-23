<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    // 为了明确的拿到Scroll.vue中的wrapper 用ref获取 
    // better-scroll中button不用设置click属性为true也能监听点击 但div等必须设置
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
// 监听滚动
    this.scroll.on('scroll',(position) =>{
      // console.log(position);
      this.$emit('scroll',position)
    })
// 监听上拉加载
      this.scroll.on('pullingUp',() =>{
        this.$emit('pullingUp')
      })
  },
  methods: {
    scrollTo(x, y, time=300){
     this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // 重新计算滚动高度
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    // 封装成这样少一次调用(感觉没啥用)
    refresh(){
      console.log('-----');
     this.scroll && this.scroll.refresh()
    },
    // getScrollY(){
    //   return this.scroll ? this.scroll.y : 0
    // }
  },
}
</script>

<style>

</style>