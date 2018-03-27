<template>
  <div id="app">
    <x-header :left-options="header.lefeOption">sorry gif</x-header>
    <router-view class="main"></router-view>
    <tabbar>
      <tabbar-item link="./">
        <img slot="icon" src="./assets/icon-home.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="./discover">
        <img slot="icon" src="./assets/icon-discover.png">
        <span slot="label">发现</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import 'vux/src/styles/reset.less';
import { Tabbar, TabbarItem, XHeader } from 'vux'

export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem,
    XHeader
  },
  data () {
    return {
      header: {
        lefeOption: {showBack: false}
      }
    }

  }
}
</script>

<style lang="less">
html,body{
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
}
p{
  margin: 0
  }

a{
  text-decoration-line: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
}
.main{
  position: relative;
  height: calc(100% - 99px);
}


</style>
