<template>
  <el-cascader
    :style="{
      width: elWidth
    }"
    :size="elSize"
    :debounce="500"
    :props="cascaderProps"
    :key="elKey"
    v-model="userConfigInfo.selectedDirList"
    filterable
    placeholder="请选择一个目录..."
    :clearable="elClearable"
    @change="cascaderChange"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getDirInfoList } from '@/common/api'
import { useStore } from '@/store'
import { ElementPlusSizeEnum, NEW_DIR_COUNT_MAX } from '@/common/model'

const store = useStore()
const userConfigInfo = computed(() => store.getters.getUserConfigInfo).value

defineProps({
  elKey: {
    type: String,
    default: ''
  },
  elSize: {
    type: String,
    default: ElementPlusSizeEnum.default
  },
  elWidth: {
    type: String,
    default: '100%'
  },
  elClearable: {
    type: Boolean,
    default: true
  }
})

const cascaderProps = {
  lazy: true,
  checkStrictly: true,
  async lazyLoad(node: any, resolve: any) {
    const { level, pathLabels } = node
    let dirs: any
    if (level === 0) {
      dirs = userConfigInfo.dirList
    } else {
      dirs = await getDirInfoList(userConfigInfo, pathLabels.join('/'))
    }
    if (dirs) {
      resolve(
        dirs.map((x: any) => ({
          value: x.value,
          label: x.label,
          leaf: level >= NEW_DIR_COUNT_MAX - 1
        }))
      )
    } else {
      resolve([])
    }
  }
}

const cascaderChange = (e: string[]) => {
  userConfigInfo.selectedDirList = e
  userConfigInfo.selectedDir = e.join('/')
  store.dispatch('USER_CONFIG_INFO_PERSIST')
}
</script>
