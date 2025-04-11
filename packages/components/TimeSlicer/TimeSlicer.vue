
<template>
  <div class="TimeSlicer">
     Hello World
    <div v-for="(item,index) in headerData" :key="index" class="time-slicer-item" v-text="index"></div>
  </div>
</template>

<script setup lang="ts" name="TimeSlicer">
import type { PropType } from 'vue'
import { ref, reactive, computed } from 'vue'

const popup = defineProps({
  type: {
    type: String as PropType<'time' | 'day'>,
    default: 'time'
  }
})

const headerData = computed(()=>{
  // if(popup.type === 'time'){

  // for (let i = 0; i < 7; i++) {
  //   let arr = [];
  //   for (let j = 0; j < 48; j++) {
  //     arr.push({ class: null, timeData: j });
  //   }
  //   rowUnit.value.push(arr);
  //   timeContent.value.push({ arr: [] });
  //   timeSection.value.push([]);
  //   timeStr.value.push("");
  // }
    const TimerBox = []
    for (let i = 0; i < 48; i++) {
      TimerBox.push({class: null, timeData: i})
    }
    return TimerBox
  // }
})

const modeData = reactive({
  title: ''
})
</script>

<style scoped>
.time-slicer-item {
  border: 1px solid #000;
}

</style>
