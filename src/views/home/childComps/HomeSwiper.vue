<template>
  <swiper>
      <swiper-item v-for="item in banners" @load="imgLoad" >
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
 import {Swiper,SwiperItem} from '../../../components/common/swiper/'
export default {
  name:'HomeSwpiper',
  data() {
    return {
      isLoad:false
    }
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
      Swiper,
      SwiperItem
    },
  methods: {
    imgLoad(){
      // if(!this.isLoad){
        this.$emit('swiperImageLoad')
      // }
      // this.isLoad = true
    }
  },  
}
</script>

<style>

</style>