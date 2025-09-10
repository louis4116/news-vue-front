import { ref } from 'vue'
import { defineStore } from 'pinia'
import serverInstance from '@/util/request'

type NewsType = {
  id: string
  date: string
  img: string
  source: string
  title: string
  url: string
}

export const useNewsStore = defineStore('news', () => {
  const newsData = ref<NewsType[] | null>(null)
  const agencyRef = ref('')
  const tagRef = ref('')

  function initData() {
    newsData.value = null
  }
  async function getNewsData(agency: string, tag: string) {
    let data
    agencyRef.value = agency
    tagRef.value = tag
    if (agency === 'ltnMilitary') {
      data = await serverInstance({
        url: `news/ltn/ltn-military/${tag}`,
        method: 'get',
      })
    } else {
      data = await serverInstance({
        url: `news/${agency}/${tag}`,
        method: 'get',
      })
    }

    newsData.value = data.data
    return data
  }

  async function storeNews(data: NewsType) {
    const result = await serverInstance({
      url: `handleNews/${data.id}`,
      method: 'post',
      data: {
        date: data.date,
        url: data.url,
        img: data.img,
        source: data.source,
        title: data.title,
      },
    })
    return result
  }

  async function deleteNews({ _id }: { _id: string }) {
    const result = await serverInstance({ url: `handleNews/${_id}`, method: 'delete' })
    return result
  }

  async function updateMemo({ _id, memo }: { _id: string; memo: string }) {
    const result = await serverInstance({
      url: `handleNews/${_id}`,
      method: 'patch',
      data: {
        memo,
      },
    })
    return result
  }

  return { agencyRef, tagRef, newsData, getNewsData, initData, storeNews, deleteNews, updateMemo }
})
