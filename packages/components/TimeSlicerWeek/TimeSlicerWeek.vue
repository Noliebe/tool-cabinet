<template>
  <div class="TimeSlicer">
    <div class="byted-weektime" @mousedown="dian" @mousemove="yi" @mouseup="li">
      <div class="calendar">
        <div class="closestyle" @click="clear">
          <!-- <el-icon>
            <img
              class="closeicon"
              src="@/assets/icon/close-circle-fill.png"
              alt="Close Icon"
          /></el-icon> -->
          清空
        </div>
        <table class="calendar-table" style="width: 610px">
          <thead class="calendar-head">
            <tr>
              <th rowspan="6" class="week-td">星期/时间</th>
              <th colspan="24">00:00 - 12:00</th>
              <th colspan="24">12:00 - 24:00</th>
            </tr>
            <tr>
              <td colspan="2" v-for="(item, index) in tableHeader" :key="index">
                {{ item }}
              </td>
            </tr>
          </thead>
          <tbody id="tableBody">
            <div
              id="kuang"
              :style="{
                width: kuangObj.width + 'px',
                height: kuangObj.height + 'px',
                top: kuangObj.top + 'px',
                left: kuangObj.left + 'px',
                bottom: kuangObj.bottom + 'px',
                right: kuangObj.right + 'px',
              }"
            ></div>
            <tr>
              <td>星期一</td>
              <td
                @mousedown.prevent="handleMouseDown(i, 0)"
                @mouseup.prevent="handleMouseUp(i, 0)"
                class="calendar-atom-time"
                :class="item.class"
                v-for="(item, i) in rowUnit[0]"
                :key="i"
              ></td>
            </tr>
            <tr>
              <td>星期二</td>
              <td
                @mousedown.prevent="handleMouseDown(i, 1)"
                @mouseup.prevent="handleMouseUp(i, 1)"
                class="calendar-atom-time"
                :class="item.class"
                v-for="(item, i) in rowUnit[1]"
                :key="i"
              ></td>
            </tr>
            <tr>
              <td>星期三</td>
              <td
                @mousedown.prevent="handleMouseDown(i, 2)"
                @mouseup.prevent="handleMouseUp(i, 2)"
                class="calendar-atom-time"
                :class="item.class"
                v-for="(item, i) in rowUnit[2]"
                :key="i"
              ></td>
            </tr>
            <tr>
              <td>星期四</td>
              <td
                @mousedown.prevent="handleMouseDown(i, 3)"
                @mouseup.prevent="handleMouseUp(i, 3)"
                class="calendar-atom-time"
                :class="item.class"
                v-for="(item, i) in rowUnit[3]"
                :key="i"
              ></td>
            </tr>
            <tr>
              <td>星期五</td>
              <td
                @mousedown.prevent="handleMouseDown(i, 4)"
                @mouseup.prevent="handleMouseUp(i, 4)"
                class="calendar-atom-time"
                :class="item.class"
                v-for="(item, i) in rowUnit[4]"
                :key="i"
              ></td>
            </tr>
            <tr>
              <td>星期六</td>
              <td
                @mousedown.prevent="handleMouseDown(i, 5)"
                @mouseup.prevent="handleMouseUp(i, 5)"
                class="calendar-atom-time"
                :class="item.class"
                v-for="(item, i) in rowUnit[5]"
                :key="i"
              ></td>
            </tr>
            <tr>
              <td>星期日</td>
              <td
                @mousedown.prevent="handleMouseDown(i, 6)"
                @mouseup.prevent="handleMouseUp(i, 6)"
                class="calendar-atom-time"
                :class="item.class"
                v-for="(item, i) in rowUnit[6]"
                :key="i"
              ></td>
            </tr>

            <tr>
              <td colspan="49" class="td-table-tip">
                <div class="clearfix">
                  <span class="pull-left tip-text">请用鼠标点选时间段</span>
                  <a @click="clear" class="pull-right">清空</a>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="49" class="timeContent">
                <div
                  v-for="(item, index) in timeStr"
                  :key="index"
                  v-show="item.length"
                >
                  <span>{{ weekDate[index + 1] }}:</span>
                  <strong>
                    <span>{{ item }}</span>
                  </strong>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 鼠标的画框的效果 -->
      <div
        id="container"
        :style="{
          backgroundColor: back,
          height: h + 'px',
          width: w + 'px',
          position: 'absolute',
          left: left + 'px',
          top: top + 'px',
          opacity: 0.2,
          border: len + 'px dashed #000',
          //   zIndex: 1,
          pointerEvents: 'none', //vue3版本没这个会影响时间选择
        }"
      ></div>
    </div>
  </div>
</template>

<!-- <script setup lang="ts" name="TimeSlicer">
</script> -->

<script setup name="TimeSlicerWeek">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  reactive,
  nextTick,
} from "vue";

const tableHeader = ref([
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
]);

const weekDate = ref({
  1: "星期一",
  2: "星期二",
  3: "星期三",
  4: "星期四",
  5: "星期五",
  6: "星期六",
  7: "星期日",
});

const rowUnit = ref([]); //每一个单元格
const timeContent = ref([]); //选中的时间段原始数据
const timeSection = ref([]); //时间段，可以返回给后台的数据
const timeStr = ref([]); //时间段，前端显示的数据

let beginDay = ref(0);
let beginTime = ref(0);
let downEvent = ref(false);
const kuangObj = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  oldLeft: 0,
  oldTop: 0,
  flag: false,
});
let py = ref("");
let px = ref("");
let back = ref("#31676f");
let h = ref("");
let w = ref("");
let top = ref("");
let left = ref("");
let len = ref(0);

const init = () => {
  for (let i = 0; i < 7; i++) {
    let arr = [];
    for (let j = 0; j < 48; j++) {
      arr.push({ class: null, timeData: j });
    }
    rowUnit.value.push(arr);
    timeContent.value.push({ arr: [] });
    timeSection.value.push([]);
    timeStr.value.push("");
  }
};

const handleMouseDown = (i, day) => {
  downEvent.value = true; //鼠标滑动不在范围内的不算
  beginDay.value = day;
  beginTime.value = i;
};

const dian = (event) => {
  px.value = event.pageX; //获取x坐标
  py.value = event.pageY; //获取y坐标
};

const yi = (event) => {
  if (px.value === "" || py.value === "") {
    return;
  }
  let px1 = px.value;
  let px2 = py.value;
  left.value = event.pageX;
  top.value = event.pageY;
  h.value = top.value - py.value;
  w.value = left.value - px.value;
  let hc = -h.value;
  let wc = -w.value;
  len.value = 1;
  back.value = "#31676f";
  if (h.value < 0 && w.value >= 0) {
    h.value = hc;
    left.value = px1;
  } else if (h.value >= 0 && w.value < 0) {
    w.value = wc;
    top.value = px2;
  } else if (h.value < 0 && w.value < 0) {
    h.value = hc;
    w.value = wc;
  } else {
    left.value = px.value;
    top.value = py.value;
  }
  if (w.value < 0) {
    w.value = 0 - w.value;
  }
  if (h.value < 0) {
    h.value = 0 - h.value;
  }
};

const li = () => {
  px.value = "";
  py.value = "";
  h.value = "";
  w.value = "";
  top.value = "";
  left.value = "";
  len.value = 0;
  back.value = "";
};

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
    for (let x = dayStart; x < dayEnd + 1; x++) {
      for (let y = start; y < end + 1; y++) {
        if (rowUnit.value[x][y].class === null) return true;
      }
    }
    return false;
  };

  if (downEvent.value) {
    //当点击事件是在table内才触发选取数据操作
    if (isAdd()) {
      for (let x = dayStart; x < dayEnd + 1; x++) {
        for (let y = start; y < end + 1; y++) {
          if (rowUnit.value[x][y].class === null) {
            rowUnit.value[x][y].class = "ui-selected";
            timeContent.value[x].arr.push(rowUnit.value[x][y].timeData);
          }
        }
      }
    } else {
      for (let x = dayStart; x < dayEnd + 1; x++) {
        for (let y = start; y < end + 1; y++) {
          if (rowUnit.value[x][y].class === "ui-selected") {
            rowUnit.value[x][y].class = null;
            let c = rowUnit.value[x][y].timeData;
            let kong = "";
            for (let i = 0; i < timeContent.value[x].arr.length; i++) {
              if (c === timeContent.value[x].arr[i]) {
                kong = i;
              }
            }
            console.log(kong);
            timeContent.value[x].arr.splice(kong, 1);
          }
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

  for (let i = start; i < end + 1; i++) {
    let arr1 = sortCut(timeContent.value[i].arr.sort((a, b) => a - b));
    let arr2 = [];
    arr1.forEach((arr) => {
      let arr3 = [];
      arr3.push(arr[0] / 2);
      arr3.push(arr[arr.length - 1] / 2 + 0.5);
      arr2.push(arr3);
    });
    timeStr.value[i] = timeToStr(arr2);
    timeSection.value[i] = arr2;
  }
};

const clear = () => {
  rowUnit.value.forEach((item) => {
    item.forEach((item1) => {
      item1.class = null;
    });
  });

  timeContent.value.forEach((item) => {
    item.arr = [];
  });

  timeSection.value.forEach((item) => {
    item.length = 0;
  });

  timeStr.value.length = 0;
  for (let i = 0; i < 7; i++) {
    timeStr.value.push("");
  }
};


// 定义 setEcho 函数
const setEcho = (day, start, end) => {
  for (let y = start; y < end + 1; y++) {
    if (rowUnit.value[day][y].class == null) {
      rowUnit.value[day][y].class = "ui-selected";
      timeContent.value[day].arr.push(rowUnit.value[day][y].timeData);
    }
  }
};
/**
 * 回显用的方法
 * @param data timeStr
 */
const formatDay = (data) => {
  data.forEach((item, index) => {
    let str
    if(item){
      str = item.split(",");
      str.forEach((item) => {
        let froStr = item.replaceAll(":30", ".5").replaceAll(":00", ".0"),
          setStr = [...froStr.split("~")],
          start = Number(setStr[0]) * 2,
          end = Number(setStr[1]) * 2 - 1;
        setEcho(index, start, end);
      });
    }
  });
};

onMounted(() => {
  init();
});

</script>

<style scoped>
.byted-weektime .calendar {
  -webkit-user-select: none;
  position: relative;
  display: inline-block;
  /* width: 500px;
  height: 500px; */
  margin-top: 50px;
}

#tableBody {
  /* position: relative; */
}

/*.byted-weektime .calendar .schedule{background:#2F88FF;width:0;height:0;position:fixed;display:none;top:0;left:0;pointer-events:none;-webkit-transition:all 400ms ease;-moz-transition:all 400ms ease;-ms-transition:all 400ms ease;transition:all 400ms ease}*/
.byted-weektime .calendar .calendar-table {
  border-collapse: collapse;
  border-radius: 4px;
}

.byted-weektime .calendar .calendar-table tr .calendar-atom-time:hover {
  background: #ccc;
}

.byted-weektime .calendar .calendar-table tr .ui-selected {
  background: #00ffb3;
}

.byted-weektime .calendar .calendar-table tr .ui-selected:hover {
  background: #ccc;
}

.byted-weektime .calendar .calendar-table tr,
.byted-weektime .calendar .calendar-table td,
.byted-weektime .calendar .calendar-table th {
  border: 1px solid #ccc;
  font-size: 12px;
  text-align: center;

  line-height: 1.8em;
  -webkit-transition: background 200ms ease;
  -moz-transition: background 200ms ease;
  -ms-transition: background 200ms ease;
  transition: background 200ms ease;
}

.byted-weektime .calendar .calendar-table tbody tr {
  height: 30px;
}

.byted-weektime .calendar .calendar-table tbody tr td:first-child {
  background: #f8f9fa;
}

.byted-weektime .calendar .calendar-table thead th,
.byted-weektime .calendar .calendar-table thead td {
  background: #f8f9fa;
}

.byted-weektime .calendar .calendar-table .td-table-tip {
  line-height: 2.4em;
  padding: 0 12px 0 19px;
  background: #fff !important;
}

.byted-weektime .calendar .calendar-table .td-table-tip .clearfix {
  height: 46px;
  line-height: 46px;
}

.byted-weektime .calendar .calendar-table .td-table-tip .pull-left {
  font-size: 14px;
  color: #333333;
}

.byted-weektime .week-td {
  width: 75px;
  padding: 20px 0;
}

.byted-weektime a {
  cursor: pointer;
  color: #2f88ff;
  font-size: 14px;
}

#kuang {
  position: absolute;
  background-color: blue;
  opacity: 0.3;
}
/* 将关闭按钮初始状态设置为隐藏 */
.closestyle {
  position: absolute;
  top: -10px;
  right: -12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  visibility: hidden; /* 初始隐藏 */
}

/* 鼠标悬停在日历上时显示关闭按钮 */
.calendar:hover .closestyle {
  visibility: visible; /* 悬停时显示 */
}
.closeicon {
  width: 20px;
  height: 20px;
  color: #fff;
}
</style>
