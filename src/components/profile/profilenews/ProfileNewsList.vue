<template>
  <div class="profile-newlist w-full flex items-center md:flex-row flex-col p-2">
    <div
      class="profile-newlist-img flex-center w-3xs h-[170px] mb-6 md:mb-0 overflow-hidden cursor-pointer"
      @click="navToSourceNew"
    >
      <el-image class="w-full h-full object-cover" :src="renderImg" fit="cover">
        <template #error>
          <div class="w-full h-full flex-center text-3xl bg-[rgba(0,0,0,0.25)]">
            <el-icon><icon-picture /></el-icon></div></template
      ></el-image>
    </div>
    <div class="profile-newlist-content flex items-center md:ms-6 w-full">
      <div class="flex flex-col w-full">
        <div class="profile-newlist-title flex text-2xl mb-2">
          <h4>{{ props.title }}</h4>
        </div>
        <p class="mb-4">日期：{{ props.date }}</p>
        <el-form :model="formModel" @submit.prevent="handleSubmit"
          ><el-form-item
            ><el-input
              v-model="formModel.memo"
              placeholder="備註"
              class="text-base" /></el-form-item
        ></el-form>
      </div>
      <div
        class="flex items-center justify-end text-4xl ml-12 text-red-400 hover:text-red-500 active:text-red-700"
      >
        <FontAwesomeIcon :icon="faDeleteLeft" class="cursor-pointer" @click="deleteData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { useNewsStore } from '@/stores/newsStore'

const defaultImage = new Map([
  ['ltn', new URL('@/assets/img/news-banner/rwd_ltnlogo.png', import.meta.url).href],
  ['ltnMilitary', new URL('@/assets/img/news-banner/military_logo.png', import.meta.url).href],
  ['cna', new URL('@/assets/img/news-banner/pic_fb.jpg', import.meta.url).href],
  ['udn', new URL('@/assets/img/news-banner/聯合新聞網.png', import.meta.url).href],
])

const emits = defineEmits(['handle-loading', 'deleted'])

const newStore = useNewsStore()

const props = defineProps({
  _id: String,
  img: String,
  date: String,
  source: { type: String, required: true },
  storedDate: String,
  title: String,
  url: { type: String, required: true },
  memo: String,
})

const formModel = ref({
  memo: props.memo ?? '',
})

watch(
  () => props.memo,
  (newVal) => {
    formModel.value.memo = newVal ?? ''
  },
)

const deleteData = async () => {
  try {
    await ElMessageBox.confirm('確定刪除?', '警告', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
    if (props._id) {
      await newStore.deleteNews({ _id: props._id })
      ElMessage({
        type: 'success',
        message: '刪除成功',
      })
      emits('deleted', props._id)
    }
  } catch (action: any) {
    ElMessage({
      type: action === 'cancel' ? 'info' : 'error',
      message: action === 'cancel' ? '取消刪除' : '刪除失敗',
    })
  }
}

const handleSubmit = async () => {
  try {
    emits('handle-loading', true)
    if (props._id) {
      await newStore.updateMemo({ _id: props._id, memo: formModel.value.memo })
      ElNotification({
        title: '更新成功',
        type: 'success',
      })
    }
  } catch (e) {
    console.log(e)
  } finally {
    emits('handle-loading', false)
  }
}

const renderImg = computed(() => {
  if (props.img) return props.img
  return defaultImage.get(props.source)
})

const navToSourceNew = () => {
  window.open(props.url, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
:deep(.el-input__wrapper) {
  padding-inline: 12px;
  padding-block: 6px;
}

:deep(.el-input__inner) {
  font-size: 1rem;
}
</style>
