<template>
  <el-dialog v-model="dialogVisible" title="是否登出?" width="300" @close="handleDialog(false)">
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleDialog(false)">取消</el-button>
        <el-button type="primary" @click="signOut"> 確認 </el-button>
      </div>
    </template></el-dialog
  >
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authSt = useAuthStore()

const dialogVisible = ref(true)

const router = useRouter()

const handleDialog = (val: boolean) => {
  if (!val) {
    router.go(-1)
  }
}

const signOut = async () => {
  try {
    await authSt.signOut()
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
