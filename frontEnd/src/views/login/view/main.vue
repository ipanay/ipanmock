<template>
  <div class="ipan_modal-form-cover">
    <Header></Header>
    <div class="ipan_modal-form-container">
      <component
        @register="register"
        @polylinedraw="polylinedraw"
        @login="login"
        :is="currentComponent">
        </component>
    </div>
    <input class="triggerDraw" type="checkbox">
    <svg class="ipan-svg">
      <polyline v-for="(item,index) in polylineArr" :key="index" class="ipan-mock" 
        :points="`${item.fir.width},${item.fir.height} ${item.sec.width},${item.sec.height}`"
          ></polyline>
    </svg>
  </div>
</template>
<script>
import Login from './login.vue'
import Register from './register.vue'
import Header from '../header/header.vue'
export default {
  components: {
    Login,
    Register,
    Header
  },
  data () {
    return {
      currentComponent: '',
      polylineArr: []
    }
  },
  created () {
    this.currentComponent = 'Login'
  },
  methods: {
    register () {
      this.currentComponent = 'Register'
    },
    login () {
      this.currentComponent = 'Login'
    },
    polylinedraw () {
      const arr = []
      const baseNode = {
        width: 10,
        height: 10
      }
      const baseSpace = 20;
      const width = parseInt(document.body.clientWidth)
      const height = parseInt(document.body.clientHeight)
      const widthCount = Number((width / baseSpace).toFixed(0))
      const heightCount = Number((height / baseSpace).toFixed(0))
      for (let i = 0; i < widthCount; i++) {
        for (let j = 0; j < heightCount; j++) {
          const polyline = {}
          const fir = {
            width: baseNode.width + baseSpace * i,
            height: baseNode.height + baseSpace * j
          }
          const sec = {
            width: baseNode.width + baseSpace * i + baseSpace / 2,
            height: baseNode.height + baseSpace * j+ baseSpace / 2
          }
          polyline.fir = fir
          polyline.sec = sec
          arr.push(polyline)
        }
      }
      this.polylineArr = [...arr]
      document.querySelector('.triggerDraw').checked = true
    }
  }
}
</script>
<style scoped>
.ipan_modal-form-cover .ipan-svg {
    width: 100%;
    height: 100%;
}
.ipan_modal-form-cover .ipan-mock {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 5px 
}
@keyframes logn-ipan-mock {
 from {
  stroke-dashoffset:50
 }
 to {
  stroke-width: 25px; 
  stroke-dashoffset:0
 }
}
.ipan_modal-form-cover .ipan-mock{
 stroke-dasharray:50;
 stroke-dashoffset:50
}
.ipan_modal-form-cover .triggerDraw {
  display: none;
}
.ipan_modal-form-cover .triggerDraw:checked + svg .ipan-mock {
 animation: logn-ipan-mock 3s ease-out;
 animation-fill-mode:forwards;
}
</style>