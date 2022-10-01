<template>
  <div id="app">
    <!-- <Header></Header> -->
    <!-- <img @click="musicGo" class="music" title="撸猫聆听音乐" src="music.gif" alt="这里是一只猫"> -->
    <router-view></router-view>
    <!-- <audio ref="jarvisCall" src="ifyouasong.mp3"></audio> -->
  </div>
</template>
<script>
// import Header from './header/header.vue'
export default {
  components: {
    // Header
  },
  data () {
    return {
      currentComponent: ''
    }
  },
  created () {
    },
  mounted () {
    setTimeout(() => {
      this.$refs.jarvisCall && this.$refs.jarvisCall.play()
    }, 10000);
  },
  methods: {
    musicGo () {
      this.$refs.jarvisCall && this.$refs.jarvisCall.play()
    }
  }
}
</script>
<style scoped>

</style>