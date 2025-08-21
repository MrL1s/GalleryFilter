import { computed, ref, type Ref } from 'vue'
import type { ImageItem, ImageWithMeta } from '@/types'

export function useGallery(initialImages: ImageItem[]) {
  const search = ref("")
  const category: Ref<string[]> = ref([])

  const filtered = computed<ImageWithMeta[]>(() =>
    initialImages
      .filter((img) => {
        // search in title
        const matchesSearch = img.title.toLowerCase().includes(search.value.toLowerCase())

        // if category is empty, return matchesSearch
        if (category.value.length === 0) return matchesSearch

        // search in category
        const matchesCategory = category.value.length === 0 || category.value.every(cat => img.category.includes(cat))

        return matchesSearch && matchesCategory
      })
      .map((img) => ({
        ...img,
        timeAgo: getTimeAgo(img.createdAt),
        commentsCount: img.comments.length,
      })),
  )

  return { search, category, filtered }
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'только что'
  if (minutes < 60) return `${minutes} минут назад`
  if (hours < 24) return `${hours} часов назад`
  return `${days} дней назад`
}
