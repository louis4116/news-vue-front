<template>
  <div class="profile-summary flex flex-col items-center justify-center" v-loading="loadingState">
    <ul class="w-full md:w-[75%] flex flex-col items-center justify-start mb-2 mt-10">
      <li class="w-full flex items-center justify-start text-xl mb-4 gap-2">
        <div>暱稱:</div>
        <div class="w-[75%]">{{ props.profile?.name }}</div>
      </li>
      <li class="w-full flex items-center justify-start text-xl mb-4 gap-2">
        <div>信箱:</div>
        <div class="w-[75%]">{{ props.profile?.email }}</div>
      </li>
    </ul>
    <ProfileInfForm @handle-loading="handleLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { UploadFile } from 'element-plus'
import ProfileInfForm from '@/components/profile/profileinf/ProfileInfForm.vue'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps(['profile'])

const defaultAvatar = ref<string | null>(null)

const isShowButton = ref(false)

const loadingState = ref(true)

const authStore = useAuthStore()

function useBase64(file: any) {
  //將圖片轉為base64字串
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const handleChange = (files: UploadFile) => {
  const dataType = ['image/webp', 'image/jpg', 'image/jpeg', 'image/png']
  if (!files.raw?.type) return
  if (dataType.includes(files.raw.type)) {
    useBase64(files.raw)
      .then((e: any) => {
        defaultAvatar.value = e
        isShowButton.value = true
      })
      .catch((e) => {
        console.error(e)
      })
  } else {
    alert('僅接受webp,jpg,jpeg,png')
  }
}

const uploadAvatar = async () => {
  try {
    if (!defaultAvatar.value) return
    const result = await authStore.updateAvatar({
      id: props.profile._id,
      avatar: defaultAvatar.value,
    })
    console.log(result.data)
  } catch (e) {
    console.log(e)
  }
}

// const loadingState = computed(() => {
//   return props.profile ? false : true
// })

const handleLoading = (val: boolean) => {
  loadingState.value = val
}

watch(
  () => props.profile,
  (newValue) => {
    if (newValue) {
      loadingState.value = false
    }
  },
)
</script>

<style scoped></style>
