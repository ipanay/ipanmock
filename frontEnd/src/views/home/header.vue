<template>
  <div class="ipan_home-header-box">
      <span class="ipan-logo">
          <smock></smock>
      </span>
      <div class="personpart">
          <span class="personport">个人中心</span>
          <ul class="person-item-box">
              <li>
                <router-link class='headerlink dayfont-color' to='/login'>个人设置</router-link>
              </li>
              <li>
                <router-link class='headerlink dayfont-color' to='/'>退出登陆</router-link>
              </li>
              <li>
                <a class='headerlink dayfont-color' href="http://tonystark.love" target="_blank"> 托尼 </a>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import smock from '../ipanSvg/smock.vue';
export default {
  components: {
      smock
  },
  data () {
    return {
      currentComponent: ''
    }
  },
  mounted () {
      const polyline = document.querySelector('.ipan-mock')
      polyline.setAttribute('style','transform: scale(0.1)')
    //   polyline.setAttribute('stroke-width','140px')
  },
  methods: {
  }
}
</script>
<style scoped>

</style>