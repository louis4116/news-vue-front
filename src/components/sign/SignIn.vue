<template>
  <el-form
    ref="formRef"
    label-width="auto"
    :model="formModel"
    :rules="formRule"
    v-loading="loadingState"
  >
    <el-form-item label="信箱" prop="email">
      <el-input v-model="formModel.email" />
    </el-form-item>
    <el-form-item label="密碼" prop="password">
      <el-input v-model="formModel.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)" class="m-auto"> 登入 </el-button>
      <router-link :to="{ name: 'forget' }" class="m-auto"
        ><el-button type="info"> 找回密碼 </el-button></router-link
      >
    </el-form-item>
    <el-form-item>
      <el-button type="info" @click="handleToggle" link> 切換至註冊頁面 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useAuthStore } from '@/stores/authStore'
import { useRecaptchaStore } from '@/stores/recaptchaStore'

type LoginFormType = {
  email: string
  password: string
}

const emits = defineEmits(['handle-toggle'])

const authStore = useAuthStore()

const router = useRouter()

const loadingState = ref(false)

const formRef = ref<FormInstance>()

const formModel = ref<LoginFormType>({
  email: '',
  password: '',
})

const formRule = ref<FormRules<LoginFormType>>({
  email: [{ required: true, message: '請輸入信箱', trigger: 'blur', type: 'email' }],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 18, message: '長度需6至18位元', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl || loadingState.value) return
  await formEl.validate(async (valid) => {
    if (!valid) return
    try {
      loadingState.value = true
      const result = await authStore.signIn(formModel.value)
      localStorage.setItem('login-token', result.data.token)
      authStore.$state.signInStatus = true
      alert('成功!!')
      formRef.value?.resetFields()
      router.push({ name: 'home' })
    } catch (e: any) {
      ElNotification.error({
        type: 'error',
        title: '失敗',
        message: e.msg,
        duration: 3000,
      })
    } finally {
      loadingState.value = false
    }
  })
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
