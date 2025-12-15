<template>
  <div class="w-full h-full flex">
    <el-card class="m-auto max-w-sm w-full" v-loading="loadingState">
      <el-form ref="formRef" :model="formModel" label-width="auto" :rules="formRule" class="w-full">
        <el-form-item label="密碼" prop="password" class="text-base">
          <el-input v-model="formModel.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)" class="m-auto">
            更改
          </el-button></el-form-item
        >
      </el-form></el-card
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'

type FormType = {
  password: string
}

const route = useRoute()

const router = useRouter()

const authStore = useAuthStore()

const formRef = ref<FormInstance>()

const formModel = ref({
  password: '',
})

const routeId = ref<string | null>(null)

const loadingState = ref(false)

const formRule = ref<FormRules<FormType>>({
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 18, message: '長度需6至18位元', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (!valid) return
    try {
      loadingState.value = true
      if (routeId.value) {
        await authStore.unLoginResetPassword(routeId.value, formModel.value.password)
        formRef.value?.resetFields()
        ElNotification({
          title: '成功',
          message: '修改成功，稍後移至登入頁面',
          type: 'success',
          duration: 3000,
          onClose: () => {
            router.push({ name: 'sign' })
          },
        })
      }
    } catch (error: any) {
      ElNotification({
        title: '錯誤',
        message: '修改失敗',
        type: 'error',
      })
    } finally {
      loadingState.value = false
    }
  })
}

onMounted(() => {
  if (route.params.id) {
    routeId.value = route.params.id as string
  }
})
</script>

<style scoped>
:deep(.el-form-item) {
  margin-bottom: 2rem;
  justify-content: space-between;
}
:deep(.el-form-item:last-child) {
  margin-bottom: 0%;
}
:deep(.el-button) {
  margin-left: auto;
}
</style>
