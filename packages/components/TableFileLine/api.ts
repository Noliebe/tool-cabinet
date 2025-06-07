export function apiAApproveDelete(params: any) {
  return Promise.resolve();
}

// 培训审批列表
export function apiAApproveLists(params: any) {
  return Promise.resolve({
    lists: [
      {
        id: 6,
        name: "",
        type: 1,
        content:
          "测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11测试2025年6月7日13:38:11",
        reason: "测试2025年6月7日13:38:05",
        file: "https://xiangmu.wangmy.cool/uploads/file/20250607/202506071338279d82d7483.png",
        status: 1,
        revoke_status: 0,
        training_time: "2025-06-09 00:00:00",
        note: "审批意见2025年6月7日13:46:37",
        approve_time: 1749275201,
        create_time: "2025-06-07 13:38:39",
        update_time: "2025-06-07 13:46:41",
        delete_time: null,
        ProjectsHall_data: ["临沂一中项目/男生食堂"],
        projects_hall: [[2, 6]],
      },
      {
        id: 5,
        name: "",
        type: 2,
        content: "测试2",
        reason: "测试",
        file: "https://xiangmu.wangmy.cool/uploads/file/20250606/20250606183521521057135.jpg",
        status: 1,
        revoke_status: 0,
        training_time: "2025-06-20 22:00:00",
        note: "测试审批",
        approve_time: 1749211325,
        create_time: "2025-06-06 18:35:23",
        update_time: "2025-06-06 20:02:05",
        delete_time: null,
        ProjectsHall_data: ["亿联1中/2厅"],
        projects_hall: [[1, 3]],
      },
      {
        id: 2,
        name: "",
        type: 2,
        content: "这是一个申报内容",
        reason: "这是一个申报原因",
        file: "https://xiangmu.wangmy.cool/uploads/file/20250606/2025060615163858fc61675.png,http://tmp/iHjqoT7gh1h6929ab0823117cc3bf7ae8ebb69e54f8b.xlsx",
        status: 1,
        revoke_status: 0,
        training_time: "2025-07-01 09:00:00",
        note: "总部统一学习",
        approve_time: 1749196038,
        create_time: "2025-06-06 15:22:40",
        update_time: "2025-06-06 15:47:18",
        delete_time: null,
        ProjectsHall_data: ["临沂一中项目/男生食堂"],
        projects_hall: [[2, 6]],
      },
    ],
    count: 6,
    page_no: 1,
    page_size: 15,
    extend: [],
  });
}
