<template>
  <div>
    <Alert :alertArr="alertArr"></Alert>
    <input class="toCircle" type="checkbox">
    <form class="ipan_modal-form">
        <span @click="close" class="close">X</span>

      <h1 class="ipan_login-title">登陆</h1>
      <input type="text" v-model="username" placeholder="username">
      <input type="password" v-model="password" placeholder="password">
      <a @click="save">submit</a>
      <span @click="gotoRegister">register?</span>
    </form>
  </div>
</template>
<script>
import AlertTop from '../../alert/alerttop.vue'
import{ login } from '../../../api/login'
import Alert from '../../alert/main.vue'
import{ getprolist } from '../../../api/home.js'

export default {
  components: {
    AlertTop,
    Alert
  },
  data () {
    return {
      username: '',
      password: '',
      alertArr: []
    }
  },
  methods: {
    gotoRegister () {
      this.$emit('register')
    },
    save () {
      if (!this.username) {
        this.alertArr.push({ msg: '用户名不填写还想登陆', tag: this.alertArr.length })
        return false
      }
      if (!this.password) {
        this.alertArr.push({ msg: '密码不填写还想登陆', tag: this.alertArr.length })
        return false
      }
      login({ name: this.username, pwd: this.password }).then(res => {
        const data = res.data
        if (data.result === 'success') {
          const user = data.user
          // document.querySelector('.toCircle').checked = true
          // this.$emit('polylinedraw')
          const storage = window.localStorage
          storage.setItem('user', JSON.stringify(user))
          this.$router.push({name:'home',params:{userId:user.id}});
          // this.$router.push({path:'/home'});
        } else {
          this.alertArr.push({ msg: data.info, tag: this.alertArr.length })
        }
      })
      // getprolist()

    },
    close () {
      this.$router.push({path: '/'})
    }
  }
}
</script>
<style scoped>
.close {
  position: absolute;
    top: 10px;
    right: 20px;
    font-size: 20px;
    color: #aaa;
}
</style>