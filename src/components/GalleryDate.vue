<!-- GalleryDate -->
<template>
  <span class="flex gap-1 items-center text-xs text-gray-500">
    {{ formattedDate }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{ createdAt: string }>()

const formattedDate = computed(() => {
  const date = new Date(props.createdAt)

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  }).toLowerCase()
})
</script>
