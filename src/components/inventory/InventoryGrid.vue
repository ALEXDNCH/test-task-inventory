<script lang="ts" setup>
import type { IInventoryItem } from '@/types/item.type';
import InventoryItem from './InventoryItem.vue';
import { computed, ref } from 'vue';
import {INVENTORY_VISIBLE_SLOTS} from "@/constants/inventoryVisibleSlots.ts";

const props = defineProps<{ items: IInventoryItem[] }>();

const filledSlots = computed<(IInventoryItem | null)[]>(() => {
  const result: (IInventoryItem | null)[] = [...props.items];
  while (result.length < INVENTORY_VISIBLE_SLOTS) {
    result.push(null);
  }
  return result;
});
</script>

<template>
  <div class="inventory-slots" >
    <InventoryItem v-for="slot in filledSlots" :key="slot?.id" :item="slot"  />
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
