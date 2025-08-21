<!-- GalleryModal -->
<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    @click.self="close"
  >
    <div class="bg-white p-4 flex flex-col justify-items-start gap-3 relative rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <!-- close modal -->
      <button class="absolute top-2 right-3 p-1 cursor-pointer text-sm text-gray-400" @click="close">✖</button>

      <!-- title and data -->
      <h2 class="font-bold text-xl ">{{ localImage?.title }}</h2>
      <DataCard
        v-if="localImage"
        :createdAt="localImage.createdAt"
        :timeAgo="localImage.timeAgo ?? ''"
        :commentsCount="localImage.comments.length"
      />

      <!-- img -->
      <img
        v-if="localImage"
        :src="localImage.image"
        alt=""
        class="w-full rounded-xl mb-3"
      />

      <!-- description -->
      <p v-if="localImage" class="text-gray-700 mb-4">
        {{ localImage.description }}
      </p>

      <!-- comments -->
      <div v-if="localImage">
        <h3 class="font-semibold mb-2">Комментарии ({{ localImage.comments.length }})</h3>

        <!-- input new comment -->
        <div class="relative w-full">
          <input
            v-model="newComment"
            type="text"
            maxlength="255"
            placeholder="Введите комментарий"
            @focus="isFocused = true"
            @blur="onBlur"
            class="border border-gray-300 rounded-md px-3 py-3 text-sm w-full pr-8 transition-all duration-200"
            :class="isFocused ? 'border-blue-400 ring-2 ring-blue-200 scale-[1.02]' : ''"
          />
          <!-- clear button -->
          <button
            v-if="newComment"
            @click="clearInput"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✖
          </button>
        </div>

        <!-- actions -->
        <div v-if="isFocused" class="flex justify-between items-center mt-2">
          <span class="text-xs text-gray-400">{{ newComment.length }} из 255 символов</span>
          <div class="flex gap-2">
            <button
              @click="cancelInput"
              class="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Отмена
            </button>
            <button
              @click="publishComment"
              :disabled="!newComment.trim()"
              class="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Опубликовать
            </button>
          </div>
        </div>

        <!-- comments list -->
        <div
          v-for="(c, i) in localImage.comments"
          :key="i"
          class="flex items-start gap-2 border-b border-gray-200 py-2"
        >
          <img :src="c.avatar" alt="" class="w-8 h-8 rounded-full" />
          <div class="text-sm">
            <div class="font-medium">
              {{ c.name }}
            </div>
            <div class="text-gray-700">
              {{ c.text }}
            </div>
            <span class="text-gray-400 font-normal">{{ formatDate(c.date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageWithMeta } from "@/types";
import DataCard from "./DataCard.vue";
import { ref, watch } from "vue";

const props = defineProps<{
  image: ImageWithMeta | null;
  visible: boolean;
}>();

// emit definitions
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "update:image", value: ImageWithMeta): void;
}>();

// local state (to avoid mutating props directly)
const localImage = ref<ImageWithMeta | null>(props.image);

// new comment state
const newComment = ref("");
const isFocused = ref(false);

function close() {
  emit("update:visible", false);
}

function clearInput() {
  newComment.value = "";
}

function cancelInput() {
  clearInput();
  isFocused.value = false;
}

function publishComment() {
  if (!localImage.value) return;

  const updated = {
    ...localImage.value,
    comments: [
      ...localImage.value.comments,
      {
        name: "Аноним",
        avatar: "/svg/user.svg",
        text: newComment.value.trim(),
        date: new Date().toISOString(),
      },
    ],
  };

  localImage.value = updated;
  emit("update:image", updated); //  emit updated copy

  clearInput();
  isFocused.value = false;
}

function onBlur() {
  // keep buttons if user typed something
  if (!newComment.value.trim()) {
    isFocused.value = false;
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  const time = d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  return `${date} в ${time}`;
}

// Watch for prop changes and update local copy
watch(
  () => props.image,
  (newVal) => {
    localImage.value = newVal ? { ...newVal, comments: [...newVal.comments] } : null;
  },
  { immediate: true, deep: true }
);
</script>
