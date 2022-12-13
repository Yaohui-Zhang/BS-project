<template>
<el-card class="box-card">
  <template #header>
    <div class="card-header">
      <span>设备可视化</span>
    </div>
  </template>
  <div class="top-control" style="display: flex;" v-if="!isMobile">
    <div class="selected-content">
      房间：
      <el-select v-model="selectedAllRoom.selectedRoom" class="m-2" placeholder="Select" size="large" @change='handleRoomChange'>
        <el-option
          v-for="item in selectedAllRoom.options"
          :key="item._id"
          :label="item.roomName"
          :value="item._id"
        />
      </el-select>
    </div>
    <el-button type="primary" style="margin-top: 4px" @click="handleResetEquip">重置设备摆放</el-button>
  </div>
  <div class="main-content">
    <el-scrollbar height="70vh" v-if="!isMobile">
      <div class="epuip-list-content">
        <el-card class="box-card" @click="handleClickEquip(item)" v-for="(item, index) in currentRoomEquip.list.filter(item => !item.isMounted)" :key="index">
          {{item.equipName}}
        </el-card>
      </div>
    </el-scrollbar>
    <div class="image-content" @click="handleClickImage">
      <img style="width: 100%; height: 100%" :src="selectedAllRoom.selectedRoomImg" alt="">
      <template v-if="!isMobile">
        <el-card
          ref="equipItem"
          :class="`box-card${index}`"
          :style="{ left: item.x + 'px', top: item.y + 'px' }"
          v-for="(item, index) in currentRoomEquip.list.filter(item => item.isMounted)" :key="index"
          @click="handleClickUnMountedEquip(item)"
        >
          <!-- {{item.equipName}} -->
          <el-popover
            placement="top-start"
            :width="200"
            trigger="hover"
            :content="item.equipName"
          >
            <template #reference>
              <img style="width: 100%; height: 100%;" v-if="item.equipType === 1" src="../../assets/images/灯.webp" alt="">
              <img style="width: 100%; height: 100%;" v-if="item.equipType === 2" src="../../assets/images/kaiguan.webp" alt="">
              <img style="width: 100%; height: 100%;" v-if="item.equipType === 3" src="../../assets/images/chuanganqi.webp" alt="">
              <img style="width: 100%; height: 100%;" v-if="item.equipType === 4" src="../../assets/images/mensuo.webp" alt="">
            </template>
          </el-popover>
        </el-card>
      </template>
    </div>
  </div>

</el-card>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { mountedEquipApi, unMountedEquipApi } from '@/apis/equip'
import { getAllRoomListApi, getEquipByRoom } from '@/apis/room'
const selectedAllRoom = reactive({
  selectedRoomImg: '',
  selectedRoom: '',
  options: []
})
const currentRoomEquip = reactive({
  list: []
})
const isMobile = ref(false)
const equipItem = ref(null)
const isClickEquip = ref(false)
const moveEquipId = ref('')
const handleClickEquip = async (data) => {
  isClickEquip.value = true
  moveEquipId.value = data._id
  // console.log('data', data)
  // const x = RandomNumBoth(0, boxX.value - 150)
  // const y = RandomNumBoth(0, boxY.value - 100)
  // await mountedEquipApi({
  //   equipId: data._id,
  //   x,
  //   y
  // })
  // getRoomEquipFetch(selectedAllRoom.selectedRoom)
}

const handleClickImage = async (e) => {
  if (isClickEquip.value) {
    console.log('点击摆放', e)
    await mountedEquipApi({
      equipId: moveEquipId.value,
      x: e.pageX - 25,
      y: e.pageY - 25
    })
    getRoomEquipFetch(selectedAllRoom.selectedRoom)
    isClickEquip.value = false
    moveEquipId.value = ''
  }
}

const boxX = ref(0)
const boxY = ref(0)

onMounted(async () => {
  console.log('navigator.userAgent', navigator.userAgent)
  if (navigator.userAgent.match(/android|iphone|ipad|ipod/i)) {
    isMobile.value = true
  }
  const res = await getAllRoomListApi()
  console.log('所有的房间', res)
  selectedAllRoom.options = res.data
  selectedAllRoom.selectedRoom = res.data[0]?._id ?? ''
  selectedAllRoom.selectedRoomImg = res.data[0]?.roomImg ?? ''
  getRoomEquipFetch(selectedAllRoom.selectedRoom)
  setTimeout(() => {
    console.log('asdas', document.querySelector('.image-content').offsetLeft)
    boxX.value = document.querySelector('.image-content').offsetLeft
    boxY.value = document.querySelector('.image-content').clientTop
  }, 300)
})
const getRoomEquipFetch = async (roomId) => {
  const res = await getEquipByRoom({ roomId })
  console.log('res', res)
  currentRoomEquip.list = res.list
}
const handleRoomChange = (roomId) => {
  selectedAllRoom.selectedRoomImg = selectedAllRoom.options.filter(item => item._id === roomId)[0]?.roomImg
  getRoomEquipFetch(roomId)
}

const handleResetEquip = async () => {
  await unMountedEquipApi()
  getRoomEquipFetch(selectedAllRoom.selectedRoom)
}
</script>

<style scoped lang='scss'>
.el-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep .el-card__body {
    flex: 1;
    .selected-content {
      margin-bottom: 10px;
      margin-right: 20px;
    }
    .el-scrollbar {
      width: 250px;
      margin-right: 10px;
    }
    .epuip-list-content {
      width: 250px;
      // background-color: pink;
      height: 100%;
      .el-card {
        cursor: pointer;
        height: 100px;
        margin-bottom: 8px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .image-content {
      position: relative;
      .el-card {
        position: fixed;
        cursor: pointer;
        height: 50px;
        width: 50px;
        .el-card__body {
          padding: 5px;
        }
      }
    }
    .main-content {
      display: flex;
      .image-content {
        flex: 1;
        height: 75vh;
      }
    }
  }

}
</style>
