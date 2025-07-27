<template>
  <ul class="news-category flex items-center justify-center gap-5 md:gap-10 flex-wrap">
    <li v-for="item in categortArray?.content" :key="item.url" @click="getUrl(item.url)">
      <el-button type="info" :plain="item.url === activeUrl">{{ item.name }}</el-button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { useNewsStore } from '@/stores/newsStore'
import { categoryData } from './newsCategoryData'

type Category = {
  tag: string
  content: {
    name: string
    url: string
  }[]
}

const newsStore = useNewsStore()

const props = defineProps(['routeId'])

const emits = defineEmits(['init-page'])

const categortArray = ref<Category | null>(null)

const activeUrl = ref<string | null>(null)

const findCategory = () => {
  const findCategory = categoryData.find((item) => item.tag === props.routeId)
  if (findCategory) {
    categortArray.value = findCategory
    activeUrl.value = findCategory.content[0].url
    getNews(props.routeId, activeUrl.value)
  }
}

const getUrl = (url: string) => {
  activeUrl.value = url
  emits('init-page')
  getNews(props.routeId, activeUrl.value)
}

const getNews = async (agency: string, tag: string) => {
  newsStore.initData()
  try {
    await newsStore.getNewsData(agency, tag)
  } catch (e: any) {
    ElNotification({
      type: 'error',
      title: '失敗',
      message: e.response.data.msg,
      duration: 3000,
    })
  }
}

watch(
  () => props.routeId,
  () => {
    findCategory()
  },
)

onMounted(() => {})
</script>

<style scoped></style>
