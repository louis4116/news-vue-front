<template>
  <el-form
    ref="formRef"
    :model="formModel"
    label-width="auto"
    :rules="formRule"
    class="w-full md:w-[75%]"
  >
    <el-form-item label="舊密碼" prop="oldPassword" class="text-base">
      <el-input v-model="formModel.oldPassword" type="password" />
    </el-form-item>
    <el-form-item label="密碼" prop="password" class="text-base">
      <el-input v-model="formModel.password" type="password" />
    </el-form-item>
    <el-form-item label="密碼確認" prop="passwordConfirm" class="text-base">
      <el-input v-model="formModel.passwordConfirm" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)"> 確認更改 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'

type FormType = {
  oldPassword: string
  password: string
  passwordConfirm: string
}

const emits = defineEmits(['handle-loading'])

const authStore = useAuthStore()

const formRef = ref<FormInstance>()

const formModel = ref({
  oldPassword: '',
  password: '',
  passwordConfirm: '',
})

const msg = ref<string | null>(null)

const buttonLoading = ref(false)

const confrimPassword = (rule: any, value: any, callback: any) => {
  if (formModel.value.password !== value) {
    callback(new Error('輸入密碼不一致'))
  } else {
    callback()
  }
}

const formRule = ref<FormRules<FormType>>({
  oldPassword: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 18, message: '長度需6至18位元', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 18, message: '長度需6至18位元', trigger: 'blur' },
  ],
  passwordConfirm: [
    { required: true, message: '請確認密碼', trigger: 'blur' },
    {
      required: true,
      validator: confrimPassword,
      trigger: 'blur',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (!valid) return
    try {
      emits('handle-loading', true)
      if (authStore.userData?._id) {
        await authStore.resetPassword({
          id: authStore.userData._id,
          oldPassword: formModel.value.oldPassword,
          newPassword: formModel.value.password,
        })
        formRef.value?.resetFields()
        ElNotification({
          title: '成功',
          message: '修改成功',
          type: 'success',
        })
      }
      msg.value = '更改成功'
    } catch (error: any) {
      ElNotification({
        title: '錯誤',
        message: '修改失敗',
        type: 'error',
      })
      msg.value = error.response.data.msg
    } finally {
      emits('handle-loading', false)
    }
  })
}
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
:deep(.el-form-item__content) {
  width: 80%;
}
</style>
