<template>
  <input type="checkbox" />
</template>

<script setup lang="ts" name="NZToggleSwitch"></script>

<style scoped>
input[type="checkbox"] {
  appearance: none;
  width: 64px;
  height: 32px;
  position: relative;
  border-radius: 16px;
  cursor: pointer;
  background-color: #777;
}

input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  background: white;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  transition: left cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}
input[type="checkbox"]:after {
  content: "开 关";
  text-indent: 12px;
  word-spacing: 4px;
  display: inline-block;
  white-space: nowrap;
  color: white;
  font: 14px/30px monospace;
  font-weight: bold;
}

input[type="checkbox"]:hover:before {
  box-shadow: inset 0px 0px 5px 0px black;
}
input[type="checkbox"]:checked {
  background-color: limegreen;
}
input[type="checkbox"]:checked:before {
  left: 34px;
}
input[type="checkbox"]:checked:after {
  color: black;
}
</style>
