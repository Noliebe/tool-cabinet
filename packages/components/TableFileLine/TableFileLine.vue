<template>
  <div class="a_approve-wrap">
    <el-card class="mb-4 !border-none" shadow="never">
      <el-form class="mb-[-16px]" :model="queryParams" inline>
        <el-form-item label="培训项目" prop="name">
          <el-input
            class="w-[280px]"
            v-model="queryParams.name"
            clearable
            placeholder="请输入培训项目名称模糊搜索"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none" v-loading="pager.loading" shadow="never">
      <el-button
        v-perms="['approve.a_approve/delete']"
        :disabled="!selectData.length"
        @click="handleDelete(selectData)"
      >
        删除
      </el-button>
      <div class="el-table-wrap mt-4">
        <el-table
          :data="pager.lists"
          :span-method="arraySpanMethod"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            :selectable="handleSelectable"
            width="55"
          />

          <el-table-column
            label="项目/厅"
            prop="projects_name"
            show-overflow-tooltip
          >
            <template #default="{ row }">
              <template v-if="row.isHelloWorldRow">
                <!-- 图片/视频行 -->
                <div class="mb-5 flex">
                  <template
                    v-for="(item, index) in row.videoAndImage"
                    :key="index"
                  >
                    <a
                      :href="item.url"
                      target="_blank"
                      class="list-img-item-wrap"
                    >
                      <el-image
                        v-if="item.type === 'image'"
                        class="list-img-item"
                        :src="item.url"
                      />
                      <div
                        v-else-if="item.type === 'video'"
                        class="list-img-item flex items-center justify-center p-5"
                      >
                        视频:{{ item.url }}
                      </div>
                      <div
                        v-else-if="item.type === 'other'"
                        class="list-img-item flex items-center justify-center p-5"
                      >
                        {{ item.url }}
                      </div>
                    </a>
                  </template>
                </div>
              </template>
              <template v-else>
                <span v-text="row.ProjectsHall_data.join(',')"></span>
              </template>
            </template>
          </el-table-column>
          <!-- <el-table-column label="项目/厅" prop="projects_name" show-overflow-tooltip>
                        <template #default="{ row }">
                            <span> {{ row.ProjectsHall_data.join(',') }}</span>
                        </template>
                    </el-table-column> -->
          <el-table-column
            label="申报内容"
            prop="content"
            show-overflow-tooltip
          />
          <el-table-column
            label="申报原因"
            prop="reason"
            show-overflow-tooltip
          />
          <el-table-column label="培训方式" prop="type" show-overflow-tooltip>
            <template #default="{ row }">
              <!-- 1=线上,2=线下 def null -->
              {{ row.type == 1 ? "线上" : row.type == 2 ? "线下" : "" }}
            </template>
          </el-table-column>
          <el-table-column
            label="培训时间"
            prop="training_time"
            show-overflow-tooltip
          />

          <!-- 1通过 2不通过 -->
          <el-table-column label="审批状态" prop="status" show-overflow-tooltip>
            <template #default="{ row }">
              {{
                row.status == 0 ? "待审批" : row.status == 1 ? "通过" : "不通过"
              }}
            </template>
          </el-table-column>
          <el-table-column label="审批意见" prop="note" show-overflow-tooltip />

          <el-table-column label="操作" width="140" fixed="right">
            <template #default="{ row }">
                <!-- type="primary" -->
              <el-button
                v-perms="['approve.a_approve/delete']"
                type="danger"
                link
                @click="handleDelete(row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mt-4 flex justify-end">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup name="aApproveLists">
import type { TableColumnCtx } from "element-plus";
import { reactive, ref } from "vue";
import { apiAApproveDelete, apiAApproveLists } from "./api";
import { useDictData } from "../hooks/useDictOptions";
import { usePaging } from "../hooks/usePaging";
import { testVideo, testImage } from "../utils";
import feedback from "../utils/feedback";

type reqData = {
  count: number; // 总数,
  extend: [];
  page_no: number;
  page_size: number;
  lists: rowType[];
};
type rowType = {
  id: number; // 6
  name: string;
  type: number; // 1
  content: string; // '测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11'
  reason: string; // '测试2025年6月7日13:38:05'
  file: string; // 'https:\/\/xiangmu.wangmy.cool\/uploads\/file\/20250607\/202506071338279d82d7483.png'
  status: number; // 1
  revoke_status: number; // 0
  training_time: string; // '2025-06-09 00:00:00'
  note: string; // '审批意见2025年6月7日13:46:37'
  approve_time: number; // 1749275201
  create_time: string; // '2025-06-07 13:38:39'
  update_time: string; // '2025-06-07 13:46:41'
  delete_time: null;
  ProjectsHall_data: string[];
  projects_hall: [[number, number]];
};

interface SpanMethodProps {
  row: rowType & { isHelloWorldRow: boolean };
  column: TableColumnCtx<rowType>;
  rowIndex: number;
  columnIndex: number;
}

// 查询条件
const queryParams = reactive({
  name: "",
  projects_id: "",
  hall_id: "",

  PH_ids: undefined,
});

//项目/厅选择
const handleSelectPH = (nV: string[]) => {
  queryParams.projects_id = nV ? nV[0] : "";
  queryParams.hall_id = nV ? nV[1] : "";
};

// 初始化数据
const renameTreeKeys = (data: any[]) => {
  return data.map((item) => {
    const newItem = {
      value: item.id,
      label: item.name,
    };
    if (item.children && Array.isArray(item.children)) {
      newItem.children = renameTreeKeys(item.children); // 递归处理子节点
    }
    return newItem;
  });
};

// 选中数据
const selectData = ref<any[]>([]);

// 表格选择后回调事件
const handleSelectionChange = (val: any[]) => {
  selectData.value = val.map(({ id }) => id);
};

// 获取字典数据
const { dictData } = useDictData("");

/**
 * 自定义合并方法
 */
function arraySpanMethod({ row, columnIndex }: SpanMethodProps) {
  // 如果是虚拟行（helloworld 行）
  if (row.isHelloWorldRow) {
    if (columnIndex === 1) {
      return {
        rowspan: 1,
        colspan: 10, // 合并所有列
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      };
    }
  }

  // 其他行保持默认
  return {
    rowspan: 1,
    colspan: 1,
  };
}

// 分页相关
const { pager, getLists, resetParams, resetPage } = usePaging({
  fetchFun: (e) => {
    //@ts-ignore
    return apiAApproveLists(e).then((res: reqData) => {
      console.log("res", res);
      // 项目厅信息
      const nList: any = [];
      (res.lists || []).forEach((item: any) => {
        let videoAndImage;
        if (item.file) {
          videoAndImage = (item.file.split(",") || []).map((val: any) => {
            return {
              url: val,
              type: testImage(val)
                ? "image"
                : testVideo(val)
                ? "video"
                : "other",
            };
          });
        } else {
          videoAndImage = [];
        }
        nList.push(item);
        if (videoAndImage && videoAndImage.length) {
          nList.push({
            isHelloWorldRow: true,
            videoAndImage,
          });
        }
      });
      res.lists = nList;

      return res;
    });
  },
  params: queryParams,
});

// 删除
const handleDelete = async (id: number | any[]) => {
  await feedback.confirm("确定要删除？");
  await apiAApproveDelete({ id });
  getLists();
};

// const handleSelectable = (row: any, index: number) => {
const handleSelectable = (row: any) => {
  // 展示文件的行不显示复选框
  return !row.isHelloWorldRow;
  // // 只允许偶数行可选
  // return index % 2 === 0
};

getLists();
</script>

<style scoped lang="scss">
.a_approve-wrap {
  .el-table-wrap {
    :deep(.el-checkbox.is-disabled) {
      display: none;
    }
  }

  .list-img-item-wrap {
    & + .list-img-item-wrap {
      margin-left: 10px;
    }
  }
  .list-img-item {
    @apply bg-primary-light-9;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    vertical-align: middle;
    white-space: break-spaces;
    word-break: break-all !important;
  }
}
</style>
