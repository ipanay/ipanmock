<template>
  <div class="ipan-home">
    <Header></Header>
    <div class="ipan-home-container">
      <component
        :userId="userId"
        :is="currentComponent"></component>
    </div>
  </div>
</template>
<script>
import Header from './header.vue'
import project from '../projectlist/main.vue'
export default {
  components: {
    Header,
    project
  },
  data () {
    return {
      currentComponent: '',
      polylineArr: [],
      userId:''
    }
  },
  created () {
    const storage = window.localStorage
    if (this.$route.params && this.$route.params.userId) {
      this.userId = this.$route.params.userId
    } else if (storage.getItem('user') && JSON.parse(storage.getItem('user')).id) {
      this.userId = JSON.parse(storage.getItem('user')).id
    }
    this.currentComponent = 'project'
  },
  methods: {
  }
}
</script>
<style scoped>

</style>