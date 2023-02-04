<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script setup>
  import { ref } from 'vue'
  import zhCN from 'element-plus/dist/locale/zh-cn'
  const locale = ref(zhCN)
</script>
<style lang="scss">
  html,
  body,
  #app {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow: hidden;
  }
</style>
