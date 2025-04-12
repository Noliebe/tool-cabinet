<template>
  <!-- ...$attrs v-bind is missing expression -->
  <el-select
      v-bind="$attrs"
      v-model="modelVal"
      filterable
      :remote="props.remote"
      reserve-keyword
      :remote-method="fetchOptions"
      :loading="loading"
  >
      <!-- @focus="handleFocus" -->
      <el-option
          v-for="item in options"
          :key="item[props.optionsProps.key]"
          :label="item[props.optionsProps.label]"
          :value="item[props.optionsProps.value]"
      />
  </el-select>
</template>
<script lang="ts" setup name="FormTangram">
import { elSelectRemoteProps } from './el-select-remote'
import { defineProps, ref, computed, onMounted } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-select.css'

const props = defineProps(elSelectRemoteProps)
const model = defineModel()

const options: Record<string, any> = ref([])
const loading = ref(true)

// 记录上次搜索字段
let searchWorld: string | undefined = undefined

// TODO:modelVal的类型声明不应该是 any
// modelVal解决name回显时option没加载出来导致id一闪而过的问题
const modelVal: any = computed({
  get() {
      return loading.value ? undefined : model.value
  },
  set(value) {
      return (model.value = value)
  }
})

/**
* 模拟触发远程搜索
* @param query
*/
const fetchOptions = async (query = '') => {
  // 节流用
  if (searchWorld === query) {
      return
  }
  searchWorld = query

  loading.value = true
  try {
      const list = await props.remoteMethod({ searchWorld: query })
      options.value = list
  } catch (error) {
      console.error('Error fetching options:', error)
  } finally {
      loading.value = false
  }
}

// /**
//  * 监听搜索框的 focus 事件
//  */
// const handleFocus = () => {
//     // 如果当前没有选项，则加载默认选项
//     if (options.value.length === 0) {
//         fetchOptions()
//     }
// }

// 初始化时加载默认选项
onMounted(() => {
  fetchOptions()
})
</script>
