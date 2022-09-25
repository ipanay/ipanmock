<template>
<div>
  <input :class="'alert-checkbox' + ' index' + alertMessage.tag" type="checkbox">
  <div class="ipan_alert">
    <div class="alert-box">
      <i class="alert-logo" :class="alertLogo"></i>
      <span class="alert-message"><span class="ipan-fly">～&nbsp;</span>{{ alertMessage.msg }}<span class="ipan-fly">&nbsp;～</span></span>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    alertMessage: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
        alertLogo: ''
    }
  },
  mounted () {
    console.log('mounted')
    this.alertInit()
  },
  methods: {
    alertInit () {
      const checkNode = document.querySelector(`.alert-checkbox.index${this.alertMessage.tag}`)
      const timer1 = setTimeout(() => {
        checkNode && (checkNode.checked = true)
        clearTimeout(timer1)
      }, 0);
      const timer2 = setTimeout(() => {
        checkNode && (checkNode.checked = false)
        setTimeout(() => {
          console.log('emit', this.alertMessage.tag)
          this.$emit('deleteAlert', this.alertMessage.tag)
        }, 500);
        clearTimeout(timer2)
      }, 3000);
    }
  }
}
</script>
<style scoped>

</style>