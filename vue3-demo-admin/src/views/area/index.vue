<template>
<el-card class="box-card">
  <template #header>
    <div class="card-header">
      <span>场所列表</span>
    </div>
  </template>
  <div class="area-content">
    <el-button class="add-btn" type="default" @click="handleAddArea">新建场所</el-button>
    <el-table :data="tableData.list" border style="width: 100%">
      <el-table-column prop="areaName" label="场所名称" width="180" />
      <el-table-column prop="areaPosition" label="场所地址" />
      <el-table-column label="操作" width="150">
        <template v-slot="scoped">
          <el-button size="small" class="add-btn" type="primary" @click="handleUpdateArea(scoped.row)">编辑</el-button>
          <el-popconfirm title="是否确定删除场所？" @confirm="handleDeleteArea(scoped.row.areaName)">
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
<el-dialog v-model="dialogFormVisible" title="新建场所" :show-close='false'>
  <el-form :model="addAreaForm" ref="addAreaRef" :rules="addFormRules" label-width="120px">
    <el-form-item label="场所名称" prop='areaName'>
      <el-input v-model="addAreaForm.areaName" />
    </el-form-item>
    <el-form-item label="场所地址" prop="areaPosition">
      <el-input v-model="addAreaForm.areaPosition" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleCancelAddArea">取消</el-button>
      <el-button type="primary" @click="handleConfirmAdd"
        >确定</el-button
      >
    </span>
  </template>
</el-dialog>
<el-dialog v-model="updateVisible" title="编辑场所" :show-close='false'>
  <el-form :model="currentUpdateData" ref="updateAreaRef" :rules="addFormRules" label-width="120px">
    <el-form-item label="场所名称" prop='areaName'>
      {{currentUpdateData.areaName}}
    </el-form-item>
    <el-form-item label="场所地址" prop="areaPosition">
      <el-input v-model="currentUpdateData.areaPosition" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleCancelUpdateArea">取消</el-button>
      <el-button type="primary" @click="handleConfirmUpdate"
        >确定</el-button
      >
    </span>
  </template>
</el-dialog>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { getAreaListApi, createAreaApi, deleteAreaApi, updateAreaApi } from '@/apis/area.js'

const pageData = reactive({
  total: 0,
  pageSize: 10,
  pageNum: 1
})

const tableData = reactive({
  list: []
})

const currentUpdateData = reactive({
  areaName: '',
  areaPosition: ''
})

const addFormRules = reactive({
  areaName: [
    { required: true, message: '场所名称不能为空', trigger: 'blur' }
  ],
  areaPosition: [
    { required: true, message: '场所地址不能为空', trigger: 'blur' }
  ]
})

const addAreaForm = reactive({
  areaName: '',
  areaPosition: ''
})

const addAreaRef = ref(null)

const updateAreaRef = ref(null)

const fetchAreaList = async (pageNum = 1) => {
  const { data, total } = await getAreaListApi({
    pageNum
  })
  tableData.list = data
  pageData.total = total
}
const dialogFormVisible = ref(false)
onMounted(() => {
  fetchAreaList()
})

const handleAddArea = () => {
  dialogFormVisible.value = true
}

const handleCancelAddArea = () => {
  addAreaRef.value.resetFields()
  addAreaForm.areaName = ''
  addAreaForm.areaPosition = ''
  dialogFormVisible.value = false
}

const addAreaFetch = async () => {
  await createAreaApi({
    areaName: addAreaForm.areaName,
    areaPosition: addAreaForm.areaPosition
  })
  ElMessage.success('新增成功')
  dialogFormVisible.value = false
  addAreaForm.areaName = ''
  addAreaForm.areaPosition = ''
  await fetchAreaList(pageData.pageNum)
}

const handleConfirmAdd = () => {
  addAreaRef.value.validate((vali) => {
    if (vali) {
      addAreaFetch()
    }
  })
}

const handleConfirmUpdate = () => {
  updateAreaRef.value.validate(vali => {
    if (vali) {
      updateAreaFetch()
    }
  })
}

const updateAreaFetch = async () => {
  await updateAreaApi({
    areaName: currentUpdateData.areaName,
    areaPosition: currentUpdateData.areaPosition
  })
  ElMessage.success('更新成功')
  updateVisible.value = false
  await fetchAreaList(pageData.pageNum)
}

const handleDeleteArea = async (data) => {
  console.log(123123)
  await deleteAreaApi({
    areaName: data
  })
  ElMessage.success('删除成功')
  await fetchAreaList(pageData.pageNum)
}

const updateVisible = ref(false)

const handleUpdateArea = (data) => {
  updateVisible.value = true
  currentUpdateData.areaName = data.areaName
  currentUpdateData.areaPosition = data.areaPosition
}

const handleCancelUpdateArea = () => {
  updateAreaRef.value.resetFields()
  updateVisible.value = false
}

const handlePageChage = (pageNum) => {
  console.log('pageNum', pageNum)
  pageData.pageNum = pageNum
  fetchAreaList(pageData.pageNum)
}

</script>

<style scoped lang='scss'>
.el-card {
  height: 100%;
  .area-content {
    margin-bottom: 20px;
    .add-btn {
      margin-bottom: 10px;
    }
  }
}
</style>
