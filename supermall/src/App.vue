<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    
    <MainTabBar/>
  </div>
</template>

<script>
  import MainTabBar from './components/content/mainTabbar/MainTabBar'
  export default {
    name:'App',
    components: {
      MainTabBar
    }
  }
</script>
<style>
  @import "./assets/css/base.css";
</style>

// git clone 仓库地址 /与仓库建立连接/
// git remote add origin 仓库地址   
//直接把现有的代码克隆到仓库中 然后 git push -u origin 仓库地址 克隆完毕