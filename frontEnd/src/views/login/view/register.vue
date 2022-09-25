<template>
  <div>
    <Alert :alertArr="alertArr"></Alert>
    <form ref="form" class="ipan_modal-form">
        <span class="close" @click="close">X</span>
      <h1 class="ipan_login-title">注册</h1>
      <input type="text" v-model="username" placeholder="username"/>
      <input type="email" v-model="email" placeholder="email" @blur="onBlur" :pattern="emailVerify"/>
      <input type="password" v-model="password" placeholder="password"/>
      <a @click="save">register</a>
      <span @click="gotoLogin">login</span>
    </form>
  </div>
</template>
<script>
import{ register } from '../../../api/register'
import Alert from '../../alert/main.vue'
const requiredArr = {
  username: "用户名",
  password: "密码",
  email: "邮箱"
}
export default {
  components: {
    Alert
  },
  data () {
    return {
      username: '',
      password: '',
      email: '',
      emailVerify: /^([a-zA-Z]|\d)+@((qq)|(163))\.com$/,
      alertArr: [],
      bool: false
    }
  },
  methods: {
    onBlur (e) {
      const reg = this.emailVerify
      this.bool = reg.test(e.target.value)
    },
    gotoLogin () {
      this.$emit('login')
    },
    save () {
      if (!this.username || !this.password || !this.email) {
        let msg = ''
        for (let key in requiredArr) {
          if (!this[key]) {
            msg += requiredArr[key]
          }
        }
        this.alertArr.push({ msg: msg + '填写完整', index: this.alertArr.length })
        return false
      }
      if (!this.bool) {
        this.alertArr.push({ msg: '注意邮箱格式', index: this.alertArr.length })
        return false
      }
      register({ name: this.username, pwd: this.password, email: this.email }).then(res => {
        const data = res.data
        if (data.result === 'success') {
          this.alertArr.push({ msg: data.info + ' 即将跳转到登陆页', index: this.alertArr.length })
          setTimeout(() => {
            this.$emit('login')
          }, 3000);
        }
        this.alertArr.push({ msg: data.info, index: this.alertArr.length })
      })
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