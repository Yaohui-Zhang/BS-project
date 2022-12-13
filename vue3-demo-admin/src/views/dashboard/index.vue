<template>
   <div class="common-layout">
    <div class="top-title">智能家居管理系统</div>
    <div class="right-content">
      <div class="side-nav">
        <el-menu
          router
          :default-active='route.path'
          active-text-color="#20A0FF"
          background-color="#324157"
          class="el-menu-vertical-demo"
          text-color="#F8F5F9"
        >
          <el-sub-menu index="/dashboard/area">
            <template #title>
              <span>场所管理</span>
            </template>
            <el-menu-item index="/dashboard/area">场所列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/dashboard/room">
            <template #title>
              <span>房间管理</span>
            </template>
            <el-menu-item index="/dashboard/room">房间列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/dashboard/">
            <template #title>
              <span>智能设备管理</span>
            </template>
            <el-menu-item index="/dashboard/equiplist">智能设备列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/dashboard/visual">
            <template #title>
              <span>设备可视化管理</span>
            </template>
            <el-menu-item index="/dashboard/visual">智能设备可视化界面</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang='scss' scoped>
.common-layout {
  width: 100%;
  height: 100%;
  background-color: #F0F0F0;
  .top-title {
    position: fixed;
    width: 100%;
    height: 60px;
    background-color: #242F42;
    z-index: 2;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    line-height: 60px;
    padding: 0 20px;
  }
  .right-content {
    height: 100%;
    display: flex;
    .side-nav {
      position: relative;
      height: 100%;
      width: 220px;
      .el-menu {
        padding-top: 55px;
        height: 100%;
        border: 0;
      }
    }
    .main {
      flex: 1;
      padding: 70px 15px 15px 15px;
    }
  }
}
</style>
