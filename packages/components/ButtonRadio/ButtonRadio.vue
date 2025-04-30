<template>
  <!-- <el-radio-group v-model="model" @change="changeCT"> -->
  <div class="nz-button-radio">
    <label v-for="(item, index) in options" :key="index">
      <input type="radio" name="drone" :value="item.value" />
      <div class="nz-button-radio-show">{{ item.label }}</div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";

const model = defineModel();

const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    label: string;
    /**
     * primary or secondary button
     */
    primary?: boolean;
    /**
     * size of the button
     */
    size?: "small" | "medium" | "large";
    /**
     * background color of the button
     */
    backgroundColor?: string;
  }>(),
  { primary: false }
);

const emit = defineEmits<{
  (e: "click", id: number): void;
}>();

const options = reactive([
  {
    disabled: false,
    label: "上一周",
    value: "1",
    id: 1,
  },
  {
    disabled: false,
    label: "这周周",
    value: "2",
    id: 2,
  },
  {
    disabled: false,
    label: "下一周",
    value: "3",
    id: 13,
  },
]);

const classes = computed(() => ({
  "storybook-button": true,
  "storybook-button--primary": props.primary,
  "storybook-button--secondary": !props.primary,
  [`storybook-button--${props.size || "medium"}`]: true,
}));

const changeCT = () => {};

const onClick = () => {
  emit("click", 1);
};
</script>

<style scoped>
.nz-button-radio {
  background-color: #fff;
  border: 1px solid #e6e6e6;
  display: flex;
}

.nz-button-radio > label + label {
  border-left: 1px solid #e6e6e6;
}
.nz-button-radio input[type="radio"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
.nz-button-radio input[type="radio"]:checked + .nz-button-radio-show {
  background-color: rgb(64, 158, 255);
}

</style>
