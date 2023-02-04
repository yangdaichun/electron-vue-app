<template>
  <div class="control-button">
    <el-button
      v-if="aboutVisible"
      class="control-el-button"
      link
      @click="aboutHandle"
    >
      关于
    </el-button>
    <el-divider v-if="aboutVisible" direction="vertical" />
    <el-button
      v-if="minVisible"
      class="control-el-button"
      link
      @click="minHandle"
    >
      <i class="iconfont icon-window-minimize2"></i>
    </el-button>
    <el-button
      v-if="maxVisible"
      class="control-el-button"
      link
      @click="maxHandle"
    >
      <i v-if="isMaximized" class="iconfont icon-window-restore"></i>
      <i v-else class="iconfont icon-window-maximize"></i>
    </el-button>
    <el-button class="control-el-button close" link @click="closeHandle">
      <i class="iconfont icon-window-close"></i>
    </el-button>
  </div>
</template>
<script setup>
  import { onMounted, ref } from 'vue'
  import { dialog, getCurrentWindow } from '@electron/remote'
  import packageFile from '../../../package.json'
  import config from '../../../vue.config'

  defineProps({
    minVisible: {
      type: Boolean,
      default: () => true,
    },
    maxVisible: {
      type: Boolean,
      default: () => true,
    },
    aboutVisible: {
      type: Boolean,
      default: () => false,
    },
  })

  const isMaximized = ref(false)
  const minHandle = () => {
    getCurrentWindow().minimize()
  }
  const maxHandle = () => {
    const browserWindow = getCurrentWindow()
    if (browserWindow.isMaximized()) {
      browserWindow.unmaximize()
    } else {
      browserWindow.maximize()
    }
  }
  const closeHandle = () => {
    getCurrentWindow().close()
  }

  const aboutHandle = () => {
    // console.log(process.versions)
    const message =
      `版本：${packageFile.version}\r\n` +
      `构建：${config.pluginOptions.electronBuilder.builderOptions.buildVersion}\r\n` +
      `环境：${process.versions.electron}\r\n` +
      `内核：${process.versions.chrome}\r\n` +
      `公司：${packageFile.author}\r\n`
    dialog.showMessageBox(getCurrentWindow(), {
      type: 'info',
      title: ' ',
      message: `${config.pluginOptions.electronBuilder.builderOptions.productName}`,
      detail: message,
    })
  }

  onMounted(() => {
    const browserWindow = getCurrentWindow()
    browserWindow.on('maximize', () => {
      isMaximized.value = browserWindow.isMaximized()
    })
    browserWindow.on('unmaximize', () => {
      isMaximized.value = browserWindow.isMaximized()
    })
  })
</script>
<style lang="scss" scoped>
  .control-button {
    position: absolute;
    right: 1px;
    top: 5px;
    color: #909399;
    -webkit-app-region: no-drag;
    .el-button {
      background-color: unset;
    }

    .control-el-button {
      color: #909399;
      padding: 5px;
      &:hover {
        background-color: rgba(129, 127, 127, 0.5);
        color: #ffffff;
      }
      &.close:hover {
        background-color: #f56c6c;
        color: #ffffff;
      }
    }
  }
</style>
