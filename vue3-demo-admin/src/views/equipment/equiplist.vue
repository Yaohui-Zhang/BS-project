<template>
<el-card class="box-card">
  <template #header>
    <div class="card-header">
      <span>设备列表</span>
    </div>
  </template>
  <div class="equip-content">
    <el-button class="add-btn" type="default" @click="handleAddEquip">新建设备</el-button>
    <el-table :data="tableData.list" border style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="scoped">
          <span style="margin-left: 15px;" :key="index" v-for="(item, index) in scoped.row.equipAttrs">
            {{item.name}} <el-switch v-model="item.status" @change='(val) => handleStatusChange(scoped.row._id, scoped.row.equipAttrs[index].name, val)' />
          </span>
          <span v-if="scoped.row.equipType === 3">
            <span style="margin: 0 10px;">当前温度：{{RandomNumBoth(10, 30)}}℃</span>
            <span>当前湿度：{{RandomNumBoth(30, 80)}}%</span>
          </span>
          <span v-if="scoped.row.equipType === 1" style="display: flex; align-items: center;">
            <div style="margin-right: 10px; margin-left: 15px;">亮度调节：</div>
            <el-slider v-model="value1" />
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="equipName" label="设备名称" width="180" />
      <el-table-column label="设备类型" width="180">
        <template v-slot="scoped">
          <span v-if="scoped.row.equipType === 1">灯</span>
          <span v-if="scoped.row.equipType === 2">开关</span>
          <span v-if="scoped.row.equipType === 3">传感器</span>
          <span v-if="scoped.row.equipType === 4">门锁</span>
        </template>
      </el-table-column>
      <el-table-column prop="equipDesc" label="设备详细信息" />
      <el-table-column label="所属房间" v-if="tableData.roomList.length">
        <template v-slot="scoped">
          {{ tableData.roomList.filter(item => item._id === scoped.row.room)[0].roomName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="scoped">
          <el-popconfirm title="是否确定删除设备？" @confirm="handleDeleteEquip(scoped.row)">
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
<el-dialog v-model="dialogFormVisible" title="新建设备" :show-close='false'>
  <el-form :model="addEquipForm" ref="addEquipRef" :rules="addFormRules" label-width="120px">
    <el-form-item label="设备名称" prop='equipName'>
      <el-input v-model="addEquipForm.equipName" />
    </el-form-item>
     <el-form-item label="设备详细信息" prop="equipDesc">
      <el-input v-model="addEquipForm.equipDesc" />
    </el-form-item>
    <el-form-item label="设备类型">
      <el-select v-model="addEquipForm.equipType" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in equipTypeList"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="所属房间">
      <el-select v-model="addEquipForm.selectRoom" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in tableData.roomList"
          :key="item._id"
          :label="item.roomName"
          :value="item._id"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleCancelAddEquip">取消</el-button>
      <el-button type="primary" @click="handleConfirmAdd"
        >确定</el-button
      >
    </span>
  </template>
</el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getEquipListApi, createEquipApi, deleteEquipApi, updateEquipApi } from '@/apis/equip.js'
import { getAllRoomListApi } from '@/apis/room.js'

const value1 = ref(0)

const dialogFormVisible = ref(false)
const addEquipRef = ref(null)
const pageData = reactive({
  total: 0,
  pageSize: 10,
  pageNum: 1
})
const RandomNumBoth = (Min, Max) => {
  var Range = Max - Min
  var Rand = Math.random()
  var num = Min + Math.round(Rand * Range) // 四舍五入
  return num
}
const addFormRules = reactive({
  equipName: [
    { required: true, message: '设备名称不能为空', trigger: 'blur' }
  ],
  equipDesc: [
    { required: true, message: '设备详细信息不能为空', trigger: 'blur' }
  ]
})

const handleStatusChange = (_id, attrsName, attrStatus) => {
  updateEquipFetch({
    _id,
    attrsName,
    attrStatus
  })
}
const updateEquipFetch = async (data) => {
  await updateEquipApi(data)
  ElMessage.success('设备状态更新成功')
}
const equipTypeList = [
  {
    name: '灯',
    value: 1
  },
  {
    name: '开关',
    value: 2
  },
  {
    name: '传感器',
    value: 3
  },
  {
    name: '门锁',
    value: 4
  }
]
const tableData = reactive({
  list: [],
  roomList: []
})
const addEquipForm = reactive({
  equipName: '',
  equipType: 1,
  equipDesc: '',
  selectRoom: ''
})

const getAllRoomListFetch = async () => {
  const res = await getAllRoomListApi()
  tableData.roomList = res.data
  addEquipForm.selectRoom = res.data[0]._id
}

const handleDeleteEquip = async (data) => {
  await deleteEquipApi({
    equipName: data.equipName,
    equipType: data.equipType
  })
  ElMessage.success('删除设备成功')
  equipListFetch(pageData.pageNum)
}
const handleAddEquip = () => {
  dialogFormVisible.value = true
}
const handleCancelAddEquip = () => {
  addEquipRef.value.resetFields()
  dialogFormVisible.value = false
  addEquipForm.equipName = ''
  addEquipForm.equipType = 1
  addEquipForm.equipDesc = ''
  addEquipForm.selectRoom = tableData.roomList[0]._id
}
const handleConfirmAdd = () => {
  addEquipRef.value.validate((vali) => {
    if (vali) {
      addEquipFetch()
    }
  })
}

const equipListFetch = async (pageNum = 1) => {
  const res = await getEquipListApi({
    pageNum
  })
  pageData.total = res.total
  tableData.list = res.data
}

onMounted(() => {
  equipListFetch()
  getAllRoomListFetch()
})

const addEquipFetch = async () => {
  await createEquipApi({
    equipName: addEquipForm.equipName,
    equipType: addEquipForm.equipType,
    equipDesc: addEquipForm.equipDesc,
    room: addEquipForm.selectRoom
  })
  ElMessage.success('新增设备成功')
  equipListFetch(pageData.pageNum)
  dialogFormVisible.value = false
  addEquipForm.equipName = ''
  addEquipForm.equipType = 1
  addEquipForm.equipDesc = ''
  addEquipForm.selectRoom = tableData.roomList[0]._id
}
const handlePageChage = (pageNum) => {
  console.log('pageNum', pageNum)
  pageData.pageNum = pageNum
  equipListFetch(pageData.pageNum)
}
</script>

<style scoped lang='scss'>
.el-card {
  height: 100%;
  .equip-content {
    margin-bottom: 20px;
    .add-btn {
      margin-bottom: 10px;
    }
  }
}
.el-slider {
  width: 25%;
}
</style>
