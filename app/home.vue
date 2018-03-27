<style lang="less" scoped>

</style>
<template>
  <div class="page-home">
    <panel :list="templates" header="点击进入创作gif" type="1" ></panel>
  </div>
</template>
<script>

import { Panel } from 'vux'
import config from '../config.js'

export default {
 name: 'home',
  components: {
    Panel
  },
  data () {
    return{
      templates: config.templates
    }
  },
  methods:{
    enterGifPage(){
      this.$router.push('/')
    }
  }
}
</script>

