<template>
  <div id="app">
    <img src="./assets/logo.png">
    <group>
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>

<script>
import 'vux/src/styles/reset.less';
import { Group, Cell } from 'vux'

export default {
  name: 'app',
    components: {
    Group,
    Cell
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
