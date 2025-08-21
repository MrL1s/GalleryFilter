<!-- GallerySearch -->
<template>
  <div class="flex justify-center w-full relative items-center">
    <img src="/svg/magnifier.svg" alt="search" class="absolute left-3" />
    <input
      :value="searchValue"
      @input="onInput"
      type="text"
      placeholder="Поиск"
      class="bg-[#F9F9F9] p-2 pl-10 rounded-md w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ search?: string }>()
const emit = defineEmits<{ (e: 'update:search', value: string): void }>()

const searchValue = ref(props.search ?? '')

function onInput(e: Event) {
  const target = e.target as HTMLInputElement | null
  emit('update:search', target?.value ?? '')
}

watch(
  () => props.search,
  (v) => {
    if (typeof v === 'string' && v !== searchValue.value) searchValue.value = v
  },
)

</script>
