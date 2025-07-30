<script lang="ts" setup>
import type { IInventoryItem } from '@/types/item.type';
import InventoryItem from './InventoryItem.vue';
import { computed, ref } from 'vue';
import Tooltip from "../Tooltip.vue"
import { debounce } from '@/utils/debounce';
import {INVENTORY_VISIBLE_SLOTS} from "@/constants/inventoryVisibleSlots.ts";

const props = defineProps<{ items: IInventoryItem[] }>();

const tooltipX = ref(0);
const tooltipY = ref(0);
const tooltipText = ref('');
const tooltipVisible = ref(false);

function handleMouseEnter(item: IInventoryItem) {
  tooltipText.value = item.name;
  tooltipVisible.value = true;
}

function handleMouseLeave() {
  tooltipVisible.value = false;
}

const handleMouseMove = debounce((event: MouseEvent) => {
  tooltipX.value = event.clientX + 12;
  tooltipY.value = event.clientY + 12;
}, 30);

const filledSlots = computed<(IInventoryItem | null)[]>(() => {
  const result: (IInventoryItem | null)[] = [...props.items];
  while (result.length < INVENTORY_VISIBLE_SLOTS) {
    result.push(null);
  }
  return result;
});
</script>

<template>
  <div class="inventory-slots" @mousemove="handleMouseMove">
    <InventoryItem v-for="slot in filledSlots" :key="slot?.id" :item="slot" @mouseenter="slot && handleMouseEnter(slot)"
                   @mouseleave="handleMouseLeave" />
    <Tooltip :x="tooltipX" :y="tooltipY" :text="tooltipText" :visible="tooltipVisible" />
  </div>
</template>

<style lang="scss" scoped>
.inventory-slots {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  aspect-ratio: 5 / 8;
  overflow-y: auto;
  border: 1px solid #454545;
  margin-top: 8px;
}
</style>
