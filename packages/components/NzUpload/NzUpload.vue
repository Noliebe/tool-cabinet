<template>
  <div class="upload">
    <el-upload
      v-model:file-list="elUploadFileList"
      ref="uploadRefs"
      :action="action"
      :multiple="multiple"
      :limit="limit"
      :show-file-list="false"
      :headers="headers"
      :data="data"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :on-error="handleError"
      :on-remove="handleRemove"
      :accept="getAccept"
    >
      <slot />
    </el-upload>
    <el-dialog
      v-if="showProgress && elUploadFileList.length"
      v-model="visible"
      title="上传进度"
      :close-on-click-modal="false"
      width="500px"
      :modal="false"
      @close="handleClose"
    >
      <div class="file-list p-4">
        <template v-for="(item, index) in elUploadFileList" :key="index">
          <div class="mb-5">
            <div>{{ item.name }}</div>
            <div class="flex-1">
              <el-progress :percentage="parseInt(item.percentage)" />
            </div>
          </div>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
/**
 * TODO 待开发
 */
import type { ElUpload, UploadFile } from "element-plus";
import { ElMessage } from "element-plus";
import { computed, defineComponent, ref, shallowRef } from "vue";

const config = {
  baseUrl: '',
  urlPrefix: '',
}
// import useUserStore from "@/stores/modules/user";
const useUserStore = ()=>({
  token: 'testToken'
})

import { deepClone } from "../utils";

const feedback = {
  msgError: ElMessage.error,
};

export default defineComponent({
  components: {},
  props: {
    // 上传文件类型
    type: {
      type: String,
      default: "image",
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: true,
    },
    // 多选时最多选择几条
    limit: {
      type: Number,
      default: 10,
    },
    // 上传时的额外参数
    data: {
      type: Object,
      default: () => ({}),
    },
    // 是否显示上传进度
    showProgress: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["change", "error", "success", "allSuccess", "update:file-list"],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const uploadRefs = shallowRef<InstanceType<typeof ElUpload>>();
    const action = ref(
      `${config.baseUrl}${config.urlPrefix}/upload/${props.type}`
    );

    const headers = computed(() => ({
      token: userStore.token,
    }));
    const visible = ref(false);

    // nzUpload 维护的 file-list
    const modelFileList = ref<any[]>([]);
    
    // elUpload 的 file-list, 每次上传都会被清空 所以实际的 文件列表 在 modelFileList里维护
    const elUploadFileList = ref<any[]>([]);

    const handleProgress = () => {
      visible.value = true;
    };
    let uploadLen = 0;
    const handleSuccess = (response: any, file: any) => {
      uploadLen++;
      if (uploadLen == elUploadFileList.value.length) {
        uploadLen = 0;
        modelFileList.value = [
          ...modelFileList.value,
          ...(elUploadFileList.value
            ? elUploadFileList.value.map((item) => deepClone({ d: item }).d)
            : []),
        ];
        elUploadFileList.value = [];
        emit("update:file-list", modelFileList.value);
        emit("allSuccess");
      }
      emit("change", file);
      if (response.code == 1) {
        emit("success", response);
      }
      if (response.code == 0 && response.msg) {
        feedback.msgError(response.msg);
      }
    };
    const handleError = (event: any, file: any) => {
      uploadLen++;
      if (uploadLen == elUploadFileList.value.length) {
        uploadLen = 0;
        elUploadFileList.value = [];
        emit("allSuccess");
      }
      feedback.msgError(`${file.name}文件上传失败`);
      uploadRefs.value?.abort(file);
      visible.value = false;
      emit("change", file);
      emit("error", file);
    };
    // TODO
    // 因为没用elementplus 的 文件列表, 所以这个方法不会被触发
    const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
      // 删除时 移除 file-list的内容
    };
    const handleExceed = () => {
      feedback.msgError(`超出上传上限${props.limit}，请重新上传`);
    };
    const handleClose = () => {
      elUploadFileList.value = [];
      visible.value = false;
    };

    const getAccept = computed(() => {
      switch (props.type) {
        case "image":
          return ".jpg,.png,.gif,.jpeg,.ico";
        case "video":
          return ".wmv,.avi,.mpg,.mpeg,.3gp,.mov,.mp4,.flv,.rmvb,.mkv";
        default:
          return "*";
      }
    });
    return {
      uploadRefs,
      action,
      headers,
      visible,
      fileList: modelFileList,
      elUploadFileList,
      getAccept,
      handleProgress,
      handleSuccess,
      handleError,
      handleExceed,
      handleClose,
      handleRemove,
    };
  },
});
</script>

<style lang="scss"></style>
