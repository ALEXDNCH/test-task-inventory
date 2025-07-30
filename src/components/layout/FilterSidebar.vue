<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { FILTERS } from '@/constants/filters'
import type { TFilterId } from '@/types/item.type';


defineProps<{ selected: TFilterId }>()
const emit = defineEmits<{
  (e: 'update:filter', value: TFilterId): void
}>()
</script>

<template>
  <aside class="filter-sidebar">
    <button v-for="filter in FILTERS" :key="filter.id" :class="['filter-button', { _active: filter.id === selected }]"
      @click="() => emit('update:filter', filter.id)">
      <img :src="filter.icon" alt="Filter icon"></img>
    </button>
  </aside>
</template>


<style lang="scss">
.filter-sidebar {
  display: flex;
  width: clamp(52px, 17vw, 64px);
  flex-direction: column;
  background: #393839;
  border-right: 1px solid #000000;
}

.filter-button {
  padding: clamp(10px,17vw,16px);
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
  & img{
    width: 100%;
  }
}

.filter-button._active {
  opacity: 1;
}
</style>