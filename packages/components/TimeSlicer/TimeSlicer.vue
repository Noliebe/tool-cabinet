<template>
  <div class="TimeSlicer" style="width: 720px;">
    <div class="time-slicer-header">
      <div class="time-slicer-title">00:00 ~ 24:00</div>
      <div class="time-slicer-moment">
        <div
          class="time-slicer-moment-item"
          v-for="(item, index) in 24"
          :key="index"
          v-text="index"
        ></div>
      </div>
    </div>
    <div class="time-slicer-item-wrap">
      <div
        v-for="(item, index) in rowUnit"
        :key="index"
        class="time-slicer-item"
        @mousedown.prevent="handleMouseDown(index, 3)"
        @mouseup.prevent="handleMouseUp(index, 3)"
        :class="item.class"
      >&nbsp;</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TimeSlicer">
import type { PropType } from "vue";
import { ref, reactive, computed } from "vue";

const popup = defineProps({
  type: {
    type: String as PropType<"time" | "day">,
    default: "time",
  },
});

const modeData = reactive({
  title: "",
});

let beginDay = ref(0);
let beginTime = ref(0);
let downEvent = ref(false);
const handleMouseDown = (i, day) => {
  downEvent.value = true; //鼠标滑动不在范围内的不算
  beginDay.value = day;
  beginTime.value = i;

  console.log("modeData");
};

type timeItemType = { class: null | string; timeData: number };

const rowUnit = ref<timeItemType[]>([]); //每一个单元格
const init = () => {
  for (let i = 0; i < 96; i++) {
    rowUnit.value.push({ class: null, timeData: i });
  }
};

init();

const timeContent = ref([]); //选中的时间段原始数据
const handleMouseUp = (i, day) => {
  let _this = this;
  let begin = beginTime.value;
  let start = begin <= i ? begin : i; //x轴起点
  let length = Math.abs(begin - i);
  let end = start + length; //x轴终点
  let dayStart = beginDay.value <= day ? beginDay.value : day; //y轴 起点
  let dayLength = Math.abs(beginDay.value - day);
  let dayEnd = dayStart + dayLength; //y轴终点

  const isAdd = () => {
    //当框选范围内所有块都是选中状态时,执行反选
    for (let y = start; y < end + 1; y++) {
      if (rowUnit.value[y].class === null) return true;
    }
    return false;
  };

  if (downEvent.value) {
    //当点击事件是在table内才触发选取数据操作
    if (isAdd()) {
      for (let y = start; y < end + 1; y++) {
        if (rowUnit.value[y].class === null) {
          rowUnit.value[y].class = "ui-selected";
          timeContent.value.push(rowUnit.value[y].timeData);
        }
      }
    } else {
      for (let y = start; y < end + 1; y++) {
        if (rowUnit.value[y].class === "ui-selected") {
          rowUnit.value[y].class = null;
          let c = rowUnit.value[y].timeData;
          let kong = "";
          for (let i = 0; i < timeContent.value.length; i++) {
            if (c === timeContent.value[i]) {
              kong = i;
            }
          }
          console.log(kong);
          timeContent.value.splice(kong, 1);
        }
      }
    }
    //过滤时间段,将临近的时间段合并
    filterTime(dayStart, dayEnd);
  }
  downEvent.value = false;
};

const filterTime = (start, end) => {
  const sortCut = (arr) => {
    //提取连续的数字
    let result = [];
    arr.forEach((v, i) => {
      let temp = result[result.length - 1];
      if (!i) {
        result.push([v]);
      } else if (v % 1 === 0 && v - temp[temp.length - 1] === 1) {
        temp.push(v);
      } else {
        result.push([v]);
      }
    });
    return result;
  };

  const toStr = (num) => {
    //字符串时间段return
    if (Number.isInteger(num)) {
      let str = num < 10 ? "0" + num : num.toString();
      return str + ":00";
    } else {
      let str =
        Math.floor(num) < 10
          ? "0" + Math.floor(num)
          : Math.floor(num).toString();
      return str + ":30";
    }
  };

  const timeToStr = (arr) => {
    //把数组转成字符串
    let str = "";
    arr.forEach((arr, index) => {
      let str1 = "";
      if (index === 0) {
        str1 = toStr(arr[0]) + "~" + toStr(arr[1]);
      } else {
        str1 = " , " + toStr(arr[0]) + "~" + toStr(arr[1]);
      }
      str += str1;
    });
    return str;
  };

  // for (let i = start; i < end + 1; i++) {
  // let arr1 = sortCut(timeContent.value[i].arr.sort((a, b) => a - b));
  // let arr2 = [];
  // arr1.forEach((arr) => {
  //   let arr3 = [];
  //   arr3.push(arr[0] / 2);
  //   arr3.push(arr[arr.length - 1] / 2 + 0.5);
  //   arr2.push(arr3);
  // });
  // timeStr.value[i] = timeToStr(arr2);
  // timeSection.value[i] = arr2;
  // }
};
</script>

<style scoped>
.time-slicer-header {
  /* display: flex; */
}
.time-slicer-title {
  text-align: center;
}
.time-slicer-moment {
  display: flex;
}
.time-slicer-moment > div {
  flex: 1;
  text-align: center;
}
.time-slicer-item-wrap {
  display: flex;
}
.time-slicer-item-wrap > div {
  flex: 1;
}
.time-slicer-item.ui-selected {
  /* background: #eee; */
  background: red;
}

.time-slicer-title,
.time-slicer-moment-item,
.time-slicer-item {
  border: 1px solid #000;
}
</style>
