<template>
<div>
  <div class="alert-container" v-for="(item,i) in alertArr" :key="i">
    <alertitem @deleteAlert="deleteAlert" :alertMessage="item"></alertitem>
  </div>
</div>
</template>
<script>
import alertitem from './alerttop.vue'
export default {
  props: {
    alertArr: {
      type: Array,
      default: () => []
    }
  },
  components: {
    alertitem
  },
  data () {
    return {
        alertLogo: ''
    }
  },
  mounted () {
  },
  methods: {
    deleteAlert (tag) {
      this.$nextTick(() => {
        console.log('delete')
        this.alertArr.filter((item, i, arr) => {
          if (item.tag === tag) {
            arr.splice(tag, 1)
          }
        })
      })
      // this.alertArr.splice(index, 1, '')
    }
  },
  // watch: {
  //   alertArr (val) {
  //     if (val.length >= 5) {
  //       const timer = setTimeout(() => {
  //         val.length = 0
  //         clearTimeout(timer)
  //       }, 500);
  //     } else {
  //       return false
  //     }
  //   }
  // }
}
</script>
<style scoped>


</style>