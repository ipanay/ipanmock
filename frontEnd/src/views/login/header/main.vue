<template>
<div style="height:100%">
    <Header></Header>
    <smock></smock>
</div>
</template>
<script>
import Header from './header.vue'
import smock from '../../ipanSvg/smock.vue'


export default {
    components: {
        Header,
        smock,
        alert
    },
    data () {
        return {
            
        }
    },
    created () {

    }
}
</script>
<style scoped>
</style>
