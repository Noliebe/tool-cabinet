<template>
  <ElFormItem label="食谱时间" prop="week_end_time">
    <ElDatePicker
      v-bind="$attrs"
      class="!w-full relative"
      type="week"
      v-model="model"
      clearable
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
import { timeFormat } from "../utils";

// const model = defineModel<Date>();

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
  defineProps<{
    /**
     * primary or secondary button
     */
    modelValue: Date | undefined;
  }>(),
  { modelValue: undefined }
);

const model = computed({
    get: () => props.modelValue,
    set: (nV) => emit('update:modelValue', nV)
})

const weekRangeFormat = computed(() => {
  const d = {
    start: "开始时间",
    join: "~",
    end: "结束时间",
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
@reference "tailwindcss/theme";
@config "../../../tailwind.config.js";

.relative {
  position: relative;
}
.dtate-picker-content-box {
  @apply pointer-events-none absolute left-8 top-[1px] flex justify-around bg-white;
  height: calc(100% - 2px);
  width: calc(100% - 64px);
}
</style>
