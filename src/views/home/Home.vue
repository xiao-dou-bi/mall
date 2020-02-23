<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 为了实现吸顶效果 -->
    <!-- 
      原本吸顶效果是用户滚动到指定位置后让tabControl和nav一样fixed置于顶层不随着页面滚动
      确实实现了 问题是代码执行是一瞬间的 一瞬间就到nav下面了 在用户看来就是滑动时tabControl闪现到上面了
      不可能让css的实现变慢吧...用动画或许可以?
      然后 决定复制一个tabControl 默认隐藏 滚动到tabControl需要置顶时就出现 这样在原本的tabControl闪现瞬间会有另一个出来挡住
      ps:nav的fixed已经没用了 因为设置fixed是为了不随着页面滚动 但是滚动插件已经实现了局部滚动 本来就不会影响nav的置顶
     -->
    <tab-control  :title="['流行','新款','精选']" 
                  @tabClick="tabClick"
                  ref="tabControl2" 
                  class="tabControl"
                  v-show="isTabFixed" />

    <Scroll class="content" ref="Scroll"
            :probe-type="3" 
            @scroll="contentScorll"
            :pull-up-load="true"
            @pullingUp="loadMore" >
    <home-swiper :banners="banners" 
                 @swiperImageLoad="swiperImageLoad" />
    <recommend-view :recommend="recommends"/>
    <Feature/>
    <tab-control  :title="['流行','新款','精选']" 
                  @tabClick="tabClick"
                  ref="tabControl1" />
    <goods-list :goods="showGoods" />
    </Scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    
  </div>
</template>

<script>
  
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import Feature from './childComps/FeatureView'

  import NavBar from '../../components/common/NavBar/NavBar'
  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/homegoods/GoodsList'
  import Scroll from '../../components/common/scroll/Scroll'
  import BackTop from '../../components/content/BackTop/BackTop'

  import { getHomeMultidata, getHomeGoods } from '../../network/home'
  import {debouce} from '../../common/utils'

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      Feature,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0, list:[] },
          'new':{page: 0, list:[] },
          'sell':{page: 0, list:[] }
        },
        currentType:'pop',//默认类型
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },

    created(){
      // created代表界面创建完后执行的部分
      // 请求轮播图和导航推荐数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
      this.getHomeGoods('new')
    },

    mounted() {
      // 防抖函数调用
      const refresh = debouce(this.$refs.Scroll.scroll.refresh,200)
      // 监听item们图片加载完成
      this.$bus.$on('itemImageLoad', () =>{
        refresh()
        // console.log(this.$refs.tabControl1.$el.offsetTop) 
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
      })

      
    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
      activated() {
        this.$refs.Scroll.scrollTo(0,saveY,0)
        this.$refs.Scroll.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.Scroll.scroll.y
        // console.log(this.saveY)
      },
    },

    methods: {
      // 事件监听
      tabClick(index){
        // console.log(index);
        switch(index){
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'sell'
            break;
          case 2: 
            this.currentType = 'new'
            break; 
        }
        this.$refs.tabControl2.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },
      backClick(){
        // console.log('backClick')
        this.$refs.Scroll.scrollTo(0, 0);
      },
      contentScorll(position){
        // console.log(position);
        // 2.判断tabControl吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        // 1.判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore(){
        // console.log('pullUp')
        this.getHomeGoods(this.currentType)
        // 重新计算页面可滚动区域的高度 因为图片请求后他不会重新计算页面高度 导致没法滚动的Bug
        this.$refs.Scroll.scroll.refresh()
      },

      swiperImageLoad(){
        // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop)
        // 打印不出来 连个undefined都没有 鬼知道他获取了什么值 估计是个null什么的 导致一滑动类名就改 索性把赋值放到监听图片加载完成时候 去他的代码规范
      },


      // 网络请求相关
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list; 
        })
      },
      getHomeGoods(type){
        // 不能把type和page写死 type可以用参数换 page不确定 那么请求
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.Scroll.scroll.finishPullUp()
        })
      }
    },
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
     background-color: var(--color-tint );
     color: #fff;
     font-weight: bold;

     position: fixed;
     left: 0;
     right: 0;
     top: 0;
     z-index:9;
  }
  .tab-control{
    position: relative;
    z-index: 10;
  }
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }
  /* scoped作用是限制作用域 项目里有很多类名content 但是设置后就只对这个文件的content */
</style>
