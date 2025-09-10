<template>
  <el-col :span="12" :xs="18" :lg="8" class="mb-5">
    <el-card>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="home-card-header line-base-set">{{ renderTitle }}</h2>
          <el-button @click="storeData" v-if="authStore.userData?._id"
            ><el-icon><Plus /></el-icon
          ></el-button>
        </div>
      </template>
      <el-image
        :src="renderImg"
        fit="cover"
        style="height: 200px; display: flex; align-items: center; justify-content: center"
      />
      <div class="home-card-intro mt-5 line-base-set">
        {{ props.title }}
      </div>
      <template #footer
        ><el-link type="info" :href="renderUrl" target="_blank">連結</el-link></template
      >
    </el-card></el-col
  >
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'
import { useNewsStore } from '@/stores/newsStore'

type DefaultImg = {
  [key: string]: string[]
}

const newStore = useNewsStore()
const authStore = useAuthStore()

const props = defineProps({
  date: { type: String, default: '', required: true },
  url: { type: String, default: '', required: true },
  img: { type: String, default: '', required: true },
  source: { type: String, default: '', required: true },
  title: { type: String, default: '', required: true },
})

const defaultImgs = <DefaultImg>{
  ltn: [
    import.meta.env.PROD ? 'assets/rwd_ltnlogo.png' : '/src/assets/img/news-banner/rwd_ltnlogo.png',
    '自由時報',
  ],
  military: [
    import.meta.env.PROD
      ? 'assets/military_logo.png'
      : '/src/assets/img/news-banner/military_logo.png',
    '自由時報-軍武專欄',
  ],
  cna: [
    import.meta.env.PROD ? 'assets/pic_fb.jpg' : '/src/assets/img/news-banner/pic_fb.jpg',
    '中央社',
  ],
  udn: [
    import.meta.env.PROD ? 'assets/聯合新聞網.png' : '/src/assets/img/news-banner/聯合新聞網.png',
    '聯合報',
  ],
}

const defaultProdImgs = <DefaultImg>{
  ltn: ['/assets/rwd_ltnlogo.png', '自由時報'],
  military: ['/assets/military_logo.png', '自由時報-軍武專欄'],
  cna: ['/assets/pic_fb.jpg', '中央社'],
  udn: ['/assets/聯合新聞網.png', '聯合報'],
}

const renderImg = computed(() => {
  if (!props.img) {
    return defaultImgs[props.source][0]
  }
  return props.img
})

//處理聯合新聞網
const renderUrl = computed(() => {
  if (props.source === 'udn') {
    return `https://udn.com${props.url}`
  }
  return props.url
})

const renderTitle = computed(() => {
  return defaultImgs[props.source][1]
})

const storeData = async () => {
  if (!authStore.userData?._id) return
  try {
    await newStore.storeNews({
      id: authStore.userData?._id,
      date: props.date,
      url: props.url,
      img: props.img,
      source: props.source,
      title: props.title,
    })
    ElNotification({
      type: 'success',
      title: '成功',
      message: '成功加入！！！',
      duration: 3000,
    })
  } catch (e: any) {
    ElNotification({
      type: 'error',
      title: '失敗',
      message: e.response.data,
      duration: 3000,
    })
  }
}
</script>

<style scoped>
:deep(.el-card__footer) {
  display: flex;
  justify-content: flex-end;
}

@media screen and (min-width: 1600px) {
  .el-col {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
</style>
