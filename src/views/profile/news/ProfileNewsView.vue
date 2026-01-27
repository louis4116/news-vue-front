<template>
  <div class="w-full">
    <div class="w-full flex-center my-4">
      <div class="w-[50%]">
        <el-input v-model="inputModel" maxlength="20" type="text" placeholder="搜尋" />
      </div>
    </div>
    <div class="w-full flex-center py-2 mb-4 flex-wrap">
      <ul class="w-full flex-center py-2 mb-4 flex-wrap">
        <UserNewsCategory
          v-for="item in category"
          :key="item.cate"
          :cate="item.cate"
          :name="item.name"
          :activeTag="activeTag"
          @nav-click="navClick"
        />
        <CheckSort :dateToggle="dateToggle" @date-click="dateClick" />
      </ul>
      <DatePicker @date-pick="datePick" />
    </div>

    <div
      class="news-list-container items-center justify-center flex-col overflow-hidden"
      v-if="sliceNews.length"
    >
      <ProfileNewsList
        v-for="(item, index) in sliceNews"
        v-bind="item"
        :key="item._id"
        :data-index="index"
      />
      <el-pagination
        class="justify-center mt-8"
        background
        layout="prev, pager, next"
        :page-size="10"
        :pager-count="7"
        :total="totalNumber"
        v-model:current-page="currentPage"
      />
    </div>
    <el-empty description="無資料" v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { refDebounced } from '@vueuse/core'
import ProfileNewsList from '@/components/profile/profilenews/ProfileNewsList.vue'
import UserNewsCategory from '@/components/ui/userNewsCategory/UserNewsCategory.vue'
import CheckSort from '@/components/ui/checksort/CheckSort.vue'
import DatePicker from '@/components/date/DatePicker.vue'

type ProfileNews = {
  _id: string
  img: string
  date: string
  source: string
  storedDate: string
  title: string
  url: string
  memo: string
}

const category = [
  {
    name: '自由時報',
    cate: 'ltn',
  },
  {
    name: '自由時報-軍武',
    cate: 'military',
  },
  {
    name: '中央社',
    cate: 'cna',
  },
  {
    name: '聯合報',
    cate: 'udn',
  },
]

const props = defineProps(['profile'])

const activeTag = ref('ltn')

const inputModel = ref('')

const inputDebounced = refDebounced(inputModel, 300)

const dateToggle = ref(false)

const dateRange = ref({
  start: 0,
  end: Date.parse(new Date().toString()),
})

//當前頁面
const currentPage = ref(1)

//顯示的新聞
const allNews = computed(() => {
  if (!props.profile?.news) return []
  const filterNews = props.profile?.news.filter((item: ProfileNews) => {
    const tempDate = Date.parse(item.storedDate)
    const searchInput = inputDebounced.value.toLowerCase().trim()
    return (
      item.source === activeTag.value &&
      item.title.toLowerCase().includes(searchInput) &&
      dateRange.value.start < tempDate &&
      dateRange.value.end > tempDate
    )
  })
  return filterNews.sort((a: ProfileNews, b: ProfileNews) => {
    const tempA = Date.parse(a.storedDate)
    const tempB = Date.parse(b.storedDate)
    return dateToggle.value ? tempA - tempB : tempB - tempA
  })
})

//每頁數量
const sliceNews = computed(() => {
  if (!allNews.value) return
  const pageSize = 10
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allNews.value.slice(start, end)
})

//新聞總數量
const totalNumber = computed(() => {
  return allNews.value.length
})

const navClick = (val: string) => {
  activeTag.value = val
}

const dateClick = () => {
  dateToggle.value = !dateToggle.value
}

const datePick = (start: string, end: string) => {
  dateRange.value = {
    start: Date.parse(start),
    end: Date.parse(end) + 86400000,
  }
}

//條件變更後重製起始頁面
watch([inputDebounced, dateRange], () => {
  currentPage.value = 1
})

//標籤變換後重製狀態
watch([activeTag], () => {
  inputModel.value = ''
  dateRange.value = {
    start: 0,
    end: Date.parse(new Date().toString()),
  }
  dateToggle.value = false
  currentPage.value = 1
})
</script>

<style scoped>
:deep(.el-input__wrapper) {
  padding: 0.5rem 0.75rem;
  font-size: 16px;
}
</style>
