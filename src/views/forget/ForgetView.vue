<template>
  <div class="w-full h-full flex">
    <el-card class="m-auto max-w-sm w-full">
      <el-form ref="formRef" label-width="auto" :model="formModel" :rules="formRule">
        <el-form-item label="註冊信箱" prop="email">
          <el-input v-model="formModel.email" />
        </el-form-item>
        <el-form-item>
          <div class="flex items-center justify-center w-full">
            <el-button type="info" @click="submitForm(formRef)"> 送出 </el-button>
          </div>
        </el-form-item>
        <el-form-item class="back-item">
          <router-link :to="{ name: 'sign' }">
            <el-button type="info" link> 返回登入頁面 </el-button>
          </router-link>
        </el-form-item>
      </el-form></el-card
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'

type ResetFormType = {
  email: string
}

const authStore = useAuthStore()

const formRef = ref<FormInstance>()

const formModel = ref<ResetFormType>({
  email: '',
})

const formRule = ref<FormRules<ResetFormType>>({
  email: [{ required: true, message: '請輸入信箱', trigger: 'blur', type: 'email' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (!valid) return
    try {
      const result = await authStore.resetEmail(formModel.value.email)
    } catch (error) {
      console.log(error)
    }
  })
}
</script>

<style scoped>
:deep(.el-form-item:last-child) {
  margin-bottom: 0%;
}
:deep(.back-item a) {
  margin: auto;
}
</style>
