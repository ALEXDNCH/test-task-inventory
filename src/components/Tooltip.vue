<template>
  <div v-if="visible" class="tooltip" :style="{ top: y + 'px', left: x + 'px' }">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { onUpdated } from 'vue';

defineProps<{
  text: string;
  x: number;
  y: number;
  visible: boolean;
}>();

onUpdated(() => {
  console.log('tolltio');
})
</script>

<style scoped>
.tooltip {
  position: fixed;
  background-color: #1e1e1e;
  color: #fff;
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #888;
  border-radius: 4px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 9999;
}
</style>