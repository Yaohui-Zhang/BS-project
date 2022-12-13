<template>
<el-card class="box-card">
  <template #header>
    <div class="card-header">
      <span>房间列表</span>
    </div>
  </template>
  <div class="room-content">
    <el-button class="add-btn" type="default" @click="handleAddRoom">新建房间</el-button>
    <el-table :data="tableData.list" border style="width: 100%">
      <el-table-column prop="roomName" label="房间名称" width="180" />
      <el-table-column prop="areaName" label="所属场所" />
      <el-table-column label="房间图片">
        <template v-slot="scoped">
          <el-image style="width: 100px; height: 100px" :src="scoped.row.roomImg" fit="contain" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="scoped">
          <el-button size="small" class="add-btn" type="primary" @click="handleUpdateRoom(scoped.row)">详情</el-button>
          <el-popconfirm title="是否确定删除房间？" @confirm="handleDeleteRoom(scoped.row)">
            <template #reference>
              <el-button size="small" class="add-btn" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination
    background
    v-model:page-size='pageData.pageSize'
    v-model:current-page='pageData.pageNum'
    @current-change='handlePageChage'
    layout="prev, pager, next"
    :total="pageData.total"
  />
</el-card>
<el-dialog v-model="dialogFormVisible" title="新建房间" :show-close='false'>
  <el-form :model="addRoomForm" ref="addAreaRef" :rules="addFormRules" label-width="120px">
    <el-form-item label="房间名称" prop='roomName'>
      <el-input v-model="addRoomForm.roomName" />
    </el-form-item>
    <el-form-item label="选择所属场所">
      <el-select v-model="selectAreaList.selectArea" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in selectAreaList.areaList"
          :key="item._id"
          :label="item.areaName"
          :value="item._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="图片上传" :class="{ hide: hideUpload }">
      <el-upload
        v-model:file-list="addRoomForm.fileList"
        action="http://localhost:3000/uploadImg"
        list-type="picture-card"
        :on-preview="handleAddPictureCardPreview"
        :on-change="handleAddPicChange"
        :on-remove="handleAddPicRemove"
        :limit='1'
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="addRoomdialogVisible" class="previewpic-dialog">
        <img width="500" w-full :src="addDialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleCancelAddRoom">取消</el-button>
      <el-button type="primary" @click="handleConfirmAdd"
        >确定</el-button
      >
    </span>
  </template>
</el-dialog>
<el-dialog v-model="updateVisible" title="房间详情" :show-close='false'>
  <el-form :model="currentUpdateData" ref="updateRoomRef" :rules="addFormRules" label-width="120px">
    <el-form-item label="场所名称" prop='areaName'>
      {{currentUpdateData.roomName}}
    </el-form-item>
    <el-form-item label="选择所属场所">
      {{currentUpdateData.areaName}}
      <!-- <el-select v-model="currentUpdateData.selectArea" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in selectAreaList.areaList"
          :key="item._id"
          :label="item.areaName"
          :value="item._id"
        />
      </el-select> -->
    </el-form-item>

    <el-form-item label="图片上传">
      <el-image style="width: 100px; height: 100px" :src="currentUpdateData.roomImg" fit="contain" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleCancelUpdateRoom">取消</el-button>
      <el-button type="primary" @click="handleCancelUpdateRoom"
        >确定</el-button
      >
    </span>
  </template>
</el-dialog>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { getRoomListApi, addRoomApi, deleteRoomApi } from '../../apis/room'
import { getAllAreaListApi } from '@/apis/area.js'
const pageData = reactive({
  total: 0,
  pageSize: 5,
  pageNum: 1
})
const addRoomdialogVisible = ref(false)
const addDialogImageUrl = ref('')
const dialogFormVisible = ref(false)
const updateVisible = ref(false)
const addAreaRef = ref(null)
const updateRoomRef = ref(null)
const tableData = reactive({
  list: []
})
const hideUpload = ref(false)
const handleAddPicChange = (file, fileList) => {
  hideUpload.value = fileList.length >= 1
}
const handleAddPicRemove = (file, fileList) => {
  hideUpload.value = fileList.length >= 1
}
const addRoomForm = reactive({
  roomName: '',
  roomImg: '',
  fileList: []
})

const handleAddPictureCardPreview = (file) => {
  addDialogImageUrl.value = file.url
  addRoomdialogVisible.value = true
}

const selectAreaList = reactive({
  selectArea: '',
  areaList: []
})

const currentUpdateData = reactive({
  roomId: '',
  roomName: '',
  selectArea: '',
  rawAreaId: '',
  fileList: [],
  roomImg: '',
  areaName: ''
})

const fetchAreaList = async () => {
  const { data } = await getAllAreaListApi()
  selectAreaList.areaList = data
  selectAreaList.selectArea = selectAreaList.areaList[0]._id
}

const addFormRules = reactive({
  roomName: [
    { required: true, message: '房间名称不能为空', trigger: 'blur' }
  ]
})

onMounted(() => {
  fetchAreaList()
  getRoomList()
})
const getRoomList = async (pageNum = 1) => {
  const res = await getRoomListApi({
    pageNum
  })
  console.log('res', res)
  pageData.total = res.total
  tableData.list = res.data
}

const handleAddRoom = () => {
  dialogFormVisible.value = true
}

const handleCancelAddRoom = () => {
  addAreaRef.value.resetFields()
  addRoomForm.fileList = []
  selectAreaList.selectArea = selectAreaList.areaList[0]._id
  addRoomForm.roomName = ''
  dialogFormVisible.value = false
  hideUpload.value = false
}

const addRoomFetch = async () => {
  if (addRoomForm.fileList.length) {
    await addRoomApi({
      roomName: addRoomForm.roomName,
      areaId: selectAreaList.selectArea,
      roomImg: addRoomForm.fileList[0].response.data.path
    })
    ElMessage.success('新增房间成功')
    getRoomList(pageData.pageNum)
    dialogFormVisible.value = false
    addRoomForm.fileList = []
    selectAreaList.selectArea = selectAreaList.areaList[0]._id
    addRoomForm.roomName = ''
    hideUpload.value = false
  } else {
    ElMessage.error('图片上传不能为空')
  }
}

const handleConfirmAdd = () => {
  addAreaRef.value.validate((vali) => {
    if (vali) {
      addRoomFetch()
    }
  })
}

const handleUpdateRoom = (data) => {
  console.log('data', data)
  updateVisible.value = true
  currentUpdateData.roomId = data._id
  currentUpdateData.roomName = data.roomName
  currentUpdateData.selectArea = data.areaId
  currentUpdateData.rawAreaId = data.areaId
  currentUpdateData.roomImg = data.roomImg
  currentUpdateData.areaName = data.areaName
  currentUpdateData.fileList = [{
    url: data.roomImg
  }]
}

const handleCancelUpdateRoom = () => {
  updateVisible.value = false
}

const handleDeleteRoom = async (data) => {
  await deleteRoomApi({
    roomId: data._id,
    areaId: data.areaId
  })
  ElMessage.success('删除成功')
  getRoomList(pageData.pageNum)
}

const handlePageChage = (pageNum) => {
  console.log('pageNum', pageNum)
  pageData.pageNum = pageNum
  getRoomList(pageData.pageNum)
}

</script>

<style scoped lang='scss'>
.el-card {
  height: 100%;
  .room-content {
    margin-bottom: 20px;
    .add-btn {
      margin-bottom: 10px;
    }
  }
  .previewpic-dialog {
    .el-dialog__body {
      text-align: center;
    }
  }
}
.hide ::v-deep .el-upload--picture-card {
  display: none;
}
</style>
