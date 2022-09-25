<template>
  <div class="ipan_header">
    <!-- <div id="serachInfo">sdfsf</div> -->
    <router-link class='headerlink' to='/login'>登陆 / 注册</router-link>
    <a class='headerlink' href="http://tonystark.love" target="_blank"> 托尼 </a>
    <a class='headerlink' href="http://ipanmock.cn/weChat" target="_blank"> 聊天室 </a>
  </div>
</template>
<script>
import smock from '../../ipanSvg/smock.vue';
export default {
  components: {
    smock
  },
  data () {
    return {
      currentComponent: ''
    }
  },
  created () {
    setTimeout(() => {
      console.log(9)
    }, 0);
  },
  mounted () {
    for (let i = 0; i < 1000; i++) {

    }
    console.log('over')
  },
  methods: {
  }
}
</script>
<style scoped>

</style>