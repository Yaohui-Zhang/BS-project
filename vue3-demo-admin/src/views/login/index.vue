<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2 class="login-box-title">WELCOME TO ADMIN SYSTEM</h2>
      <div class="login-box-sub-title">欢迎登录智能家居管理系统</div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="formRules">
        <el-form-item prop='username'>
          <el-input v-model="loginForm.username">
            <template #prefix>
              <el-icon v-if="isLoginBtn" :size="20"><Avatar /></el-icon>
              <span v-else class="pre-text">用户名</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input type="password" v-model="loginForm.password">
            <template #prefix>
              <el-icon v-if="isLoginBtn" :size="20"><Lock /></el-icon>
              <span v-else class="pre-text">密码</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop='confirmPwd' v-if="!isLoginBtn">
          <el-input type="password" v-model="loginForm.confirmPwd">
            <template #prefix>
              <el-icon v-if="isLoginBtn" :size="20"><Avatar /></el-icon>
              <span v-else class="pre-text">确认密码</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop='phoneNum' v-if="!isLoginBtn">
          <el-input v-model="loginForm.phoneNum">
            <template #prefix>
              <el-icon v-if="isLoginBtn" :size="20"><Lock /></el-icon>
              <span v-else class="pre-text">手机号</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="register-text" @click="jumpRegister">{{ isLoginBtn ? '还没有账号？ 立即注册' : '立即登录'}}</div>
      <el-button type="primary" @click="handleLogin">{{isLoginBtn ? '登录' : '注册'}}</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { checkUsername, checkPassword, checkPhoneNum } from './rules/index'
import { userLogin, userRegister } from '@/apis/user.js'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
  phoneNum: '',
  confirmPwd: ''
})

const formRules = reactive({
  username: [
    { validator: checkUsername, trigger: 'blur' }
  ],
  password: [
    { validator: checkPassword, trigger: 'blur' }
  ],
  confirmPwd: [
    { validator: checkPassword, trigger: 'blur' }
  ],
  phoneNum: [
    { validator: checkPhoneNum, trigger: 'blur' }
  ]
})

const isLoginBtn = ref(true)

const jumpRegister = () => {
  loginFormRef.value.resetFields()
  isLoginBtn.value = !isLoginBtn.value
}

const loginFormRef = ref(null)

const handleLogin = async () => {
  // 表单校验
  loginFormRef.value.validate((vali) => {
    console.log('vali', vali)
    if (vali) {
      if (isLoginBtn.value) {
        fetchLogin()
      } else {
        fetchRegister()
      }
    }
  })
}

const fetchLogin = async () => {
  const res = await userLogin({
    username: loginForm.username,
    password: loginForm.password
  })

  userStore.setToken(res.token)

  ElMessage.success('登录成功')
  router.push('/dashboard')
}

const fetchRegister = async () => {
  if (loginForm.password !== loginForm.confirmPwd) {
    ElMessage.error('两次密码输入不一致')
    return
  }
  await userRegister({
    username: loginForm.username,
    password: loginForm.password,
    phoneNum: loginForm.phoneNum
  })
  ElMessage.success('注册成功')
  loginFormRef.value.resetFields()
  isLoginBtn.value = true
}

</script>

<style scoped lang='scss'>
.login-wrapper {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/bg.webp) no-repeat;
  background-size: cover;
  overflow: hidden;
  .login-box {
    background: #102962;
    background: rgba($color: #102962, $alpha: 0.8);
    width: 450px;
    margin: 185px auto 0 auto;
    padding: 70px 25px 32px 25px;
    box-sizing: border-box;
    border-radius: 4px;
    .login-box-title {
      color: #fff;
      font-weight: 700;
      font-size: 26px;
      font-family: Franklin Gothin;
      margin-bottom: 20px;
    }
    .login-box-sub-title {
      color: #fff;
      font-size: 16px;
      opacity: 0.8;
      margin-bottom: 50px;
    }
    .el-form-item {
      margin-bottom: 30px;
      .el-input {
        width: 100%;
        border: 0;
        border-radius: 0;
        ::v-deep .el-input__wrapper {
          background-color: transparent;
          box-shadow: unset;
          border-bottom: 1px solid #1F3873;
          border-radius: 0;
          padding:  1px 0;
        }
        ::v-deep .is-focus {
          border-bottom: 1px solid #A4BFE8;
          border-radius: 0;
        }
        ::v-deep .el-input__inner {
          color: #fff;
        }
      }
    }
    .is-error {
      ::v-deep .el-input__wrapper {
        border-bottom: 1px solid #f56c6c !important;
      }
      .el-icon,
      .pre-text {
        color: #f56c6c;
      }
    }
    .register-text {
      display: inline-block;
      margin-top: 23px;
      font-size: 14px;
      color: #fff;
      opacity: 0.8;
      cursor: pointer;
    }
    .el-button {
      width: 100%;
      margin-top: 30px;
    }

  }
}
</style>
