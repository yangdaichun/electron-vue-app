<template>
  <el-header>
    <el-row>
      <el-col :span="14">
        <label class="title">&nbsp;&nbsp;&nbsp;&nbsp;Electron Vue App</label>
      </el-col>
      <el-col :span="6" />
      <el-col :span="4">
        <system about-visible />
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup>
  import system from '../../system/index.vue'
</script>

<style lang="scss" scoped>
  .title {
    color: #909399;
    font-size: 16px;
    line-height: 40px;
  }
  .el-header {
    line-height: unset;
    height: 40px;
    padding: 0;
    border-bottom: 1px solid var(--el-border-color);
    -webkit-app-region: drag;
  }
</style>
