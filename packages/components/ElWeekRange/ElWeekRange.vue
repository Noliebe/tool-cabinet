<template>
  <ElFormItem label="食谱时间" prop="week_end_time" class="relative">
    <ElDatePicker
      class="!w-full"
      type="week"
      v-model="model"
      placeholder="请选择时间周期"
    />
    <!-- @change="handleWeekChange" -->
    <div class="dtate-picker-content-box">
      <span v-text="weekRangeFormat.start"></span>
      <span v-text="weekRangeFormat.join"></span>
      <span v-text="weekRangeFormat.end"></span>
    </div>
    <!-- :disabled-date="disabledDate" -->
  </ElFormItem>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ElFormItem, ElDatePicker } from "element-plus";
import { timeFormat } from "../utils";

const model = defineModel<Date>();

const props = withDefaults(
  defineProps<{
    /**
     * primary or secondary button
     */
    modelValue: Date | undefined;
  }>(),
  { modelValue: undefined }
);

const weekRangeFormat = computed(() => {
  const d = {
    start: "",
    join: "~",
    end: "",
  };
  if (model.value) {
    d.start = timeFormat(model.value.getTime(), "yyyy-mm-dd");
    // 1000 * 60 * 60 * 24 * 6 六天  = 518400000
    d.end = timeFormat(model.value.getTime() + 518400000, "yyyy-mm-dd");
  }
  return d;
});
</script>

<style scoped>
.relative {
  position: relative;
}
.dtate-picker-content-box {
  @apply pointer-events-none absolute left-8 top-[1px] flex justify-around bg-white;
  height: calc(100% - 2px);
  width: calc(100% - 64px);
}
</style>
