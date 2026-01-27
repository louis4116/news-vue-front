<template>
  <el-form
    ref="formRef"
    label-width="auto"
    :model="formModel"
    :rules="formRule"
    v-loading="loadingState"
  >
    <el-form-item label="暱稱" prop="name">
      <el-input v-model="formModel.name" />
    </el-form-item>
    <el-form-item label="信箱" prop="email">
      <el-input v-model="formModel.email" />
    </el-form-item>
    <el-form-item label="密碼" prop="password">
      <el-input v-model="formModel.password" type="password" />
    </el-form-item>
    <el-form-item label="密碼確認" prop="passwordConfirm">
      <el-input v-model="formModel.passwordConfirm" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)"> 註冊 </el-button>
      <el-button type="info" @click="resetForm"> 重置 </el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="info" @click="handleToggle" link> 切換至登入頁面 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'

type FormType = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const emits = defineEmits(['handle-toggle'])

const authSt = useAuthStore()

const loadingState = ref(false)

const formRef = ref<FormInstance>()

const formModel = ref<FormType>({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const confirmPassword = (_rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (formModel.value.password !== value) {
    callback(new Error('輸入密碼不一致'))
  } else {
    callback()
  }
}

const formRule = ref<FormRules<FormType>>({
  name: [
    { required: true, message: '請輸入暱稱', trigger: 'blur' },
    { min: 3, max: 10, message: '長度需3至10位元', trigger: 'blur' },
  ],
  email: [{ required: true, message: '請輸入信箱', trigger: 'blur', type: 'email' }],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 18, message: '長度需6至18位元', trigger: 'blur' },
  ],
  passwordConfirm: [
    { required: true, message: '請確認密碼', trigger: 'blur' },
    {
      required: true,
      validator: confirmPassword,
      trigger: 'blur',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl || loadingState.value) return
  try {
    await formEl.validate()
    loadingState.value = true
    await authSt.signUp(formModel.value)
    formRef.value?.resetFields()
    alert('註冊成功')
  } catch (e: unknown) {
    if (e instanceof AxiosError && e.response) {
      ElNotification.error({
        title: '失敗',
        message: e.response.data,
      })
    } else {
      ElNotification.error({
        title: '失敗',
        message: '發生未知錯誤',
      })
    }
  } finally {
    loadingState.value = false
  }
}

const resetForm = () => {
  formRef.value?.resetFields()
}

const handleToggle = () => {
  emits('handle-toggle')
}
</script>

<style scoped>
:deep(.el-form-item) {
  margin-bottom: 8%;
}
:deep(.el-form-item:last-child) {
  margin-bottom: 0%;
}
:deep(.el-button) {
  margin: auto;
}
</style>
