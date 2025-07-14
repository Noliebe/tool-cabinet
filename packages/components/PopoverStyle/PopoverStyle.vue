<template>
  <cover-view slot="callout">
    <cover-view :marker-id="3">
      <cover-view class="map-custom-callout">
        <cover-view class="map-custom-title">青龙河小区东区</cover-view>
        <cover-view class="map-custom-sub-title"
          >蒙山北路与南昌路交汇处</cover-view
        >
      </cover-view>
      <cover-view class="map-custom-adorn">&nbsp;</cover-view>
    </cover-view>
  </cover-view>
  <!-- 
      <map
        id="map"
        class="map"
        :style="{ height: '362rpx', width:'662rpx' }"
        scale="16"
        :show-location="false"
        :latitude="moduleData.latitude"
        :longitude="moduleData.longitude"
        :markers="moduleData.markers"
      >
        <cover-view slot="callout">
          <cover-view :marker-id="3">
            <cover-view class="map-custom-callout" >
              <cover-view class="map-custom-title">青龙河小区东区</cover-view>
              <cover-view class="map-custom-sub-title"
                >蒙山北路与南昌路交汇处</cover-view
              >
            </cover-view>
            <cover-view class="map-custom-adorn"
              >&nbsp;</cover-view
            >
          </cover-view>
        </cover-view>
      </map>
      -->
</template>

<script lang="ts" setup>

// uniapp-微信小程序的 示例, 先放这里
  // onReady(){
  //   console.log('this.addMarker is run ');
    
  //   this.addMarker()
  // }

  // addMarker() {
  //   // 新增一个标记点
  //   const markerInfo = {
  //     id: 3, // marker 唯一标识
  //     latitude: 23.096994,
  //     longitude: 113.32452,
  //     // title: "北京市", // 点击时显示的标题
  //     iconPath: '',
  //     customCallout: {
  //       anchorY: 50,
  //       anchorX: 0,
  //       display: 'ALWAYS',
  //     },
  //     iconPath: "/static/adorn-right.png", // 本地图标路径
  //   };
  //   // width: 30, // 图标宽度（像素）
  //   // height: 30, // 图标高度

  //   this.moduleData.markers.push(markerInfo);
  //   // 强制更新视图（UniApp 需手动触发）
  //   this.$forceUpdate();
  // },

</script>

<style scoped>
.map-custom-callout {
  background-color: #fff;
  border-radius: 14rpx;
  padding: 14rpx 16rpx;
  .map-custom-title {
    font-weight: 600;
    font-size: 28rpx;
    color: #303741;
    line-height: 40rpx;
    text-align: center;
  }
  .map-custom-sub-title {
    font-weight: 400;
    font-size: 24rpx;
    color: #9097a1;
    text-align: center;
    line-height: 33rpx;
  }
}
.map-custom-adorn {
  display: block;
  margin: -1px auto 0;
  width: 0;
  height: 0;
  border: 22rpx solid rgba(0, 0, 0, 0);
  border-top-color: #fff;
}
</style>
