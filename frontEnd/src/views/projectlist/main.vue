<template>
  <div class="project-box">
    <h2 class="bigtitle">我的项目</h2>
    <!-- <a href="http://192.168.7.209:3000/api/getprolist?userId=ipan-ipanmock">下载</a> -->
    <div class="projectlists">
      <template v-for="item in projectlist">
        <div class="projectitem" :key="item.id" @click="toprodetail(item.id)">
          <span class="spanitem">{{ item.name }}</span>
        </div>
      </template>
      <div class="projectitem" @click="toprodetail">
        <span class="addplus"></span>
      </div>
    </div>
  </div>
</template>
<script>
import{ getprolist } from '../../api/home.js'
import 'ant-design-vue/dist/antd.css';
import{ login } from '../../api/login'

export default {
  components: {
  },
  props: {
      userId: {
          type: String,
          default: () => ''
      }
  },
  data () {
    return {
      currentComponent: '',
      projectlist: []
    }
  },
  created () {
    // window.open('http://localhost:3000/api/getprolist?userId=ipan-ipanmock');
    this.currentComponent = ''
    getprolist({ userId: this.userId }).then(res => {
      const data = res.data
      if (data.result === 'success') {
        this.projectlist = [...data.projectlist]
      }
    })
    login({ name: 'ipan', pwd: 1 }).then(() => {
      console.log(9)
    })
  },
  methods: {
      toprodetail (id) {
        this.$router.push({ name: 'projectdetail', params:{ projectId: id } });
      }
  }
}
</script>
<style scoped>

</style>