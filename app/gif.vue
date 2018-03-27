
<style lang="less">
    
</style>
<template>
    <div>
        {{templateName}}
    </div>  
</template>
<script>
import config from '../config.js'

export default {
 name: 'gif',
  components: {
  },
  data () {
    return{
        templateName: this.$route.params.templateName
    }
  }
}
    
</script>