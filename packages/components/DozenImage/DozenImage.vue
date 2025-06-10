<template>
  <!-- <el-radio-group v-model="model" @change="changeCT"> -->
  <div class="dozen-beer">
    <el-image
      v-for="(item, index) in props.list"
      :preview-src-list="props.list"
      :preview-teleported="true"
      :initial-index="index"
      :src="item"
      :style="`transform: rotate(${
        props.list.length > 2 ? index * 17 - 17 : index * 17
      }deg);transform-origin: 50% 120%;box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`"
      show-progress
      class="!absolute left-8 top-4 block h-20 w-20 bg-white"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    list: Array<string>;
  }>(),
  { list: () => [] }
  // 不能将类型 never[] 分配给类型 (props: LooseRequired<__VLS_Props>) => string []
);
</script>

<style scoped lang="scss">
.dozen-beer {
}
</style>
