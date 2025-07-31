<script lang="ts" setup>
import type { IInventoryItem } from '@/types/item.type';
import InventoryItem from './InventoryItem.vue';
import { computed } from 'vue';
import Tooltip from "../Tooltip.vue"
import {useTooltip} from "@/constants/useTooltip.ts";
import {INVENTORY_VISIBLE_SLOTS} from "@/constants/inventoryVisibleSlots.ts";

const {tooltipX, tooltipY, tooltipText, tooltipVisible , handleMouseMove, handleMouseLeave, handleMouseEnter} = useTooltip()
const props = defineProps<{ items: IInventoryItem[] }>();

const filledSlots = computed<(IInventoryItem | null)[]>(() => {
  const result: (IInventoryItem | null)[] = [...props.items];
  while (result.length < INVENTORY_VISIBLE_SLOTS) {
    result.push(null);
  }
  return result;
});

const aspectRatio = computed(() => `5 / ${INVENTORY_VISIBLE_SLOTS / 5}`);
</script>

<template>
  <div class="inventory-slots" @mousemove="handleMouseMove" :style="{aspectRatio}">
    <InventoryItem v-for="slot in filledSlots" :key="slot?.id" :item="slot" @mouseenter="slot && handleMouseEnter(slot)"
                   @mouseleave="handleMouseLeave" />
    <Tooltip :x="tooltipX" :y="tooltipY" :text="tooltipText" :visible="tooltipVisible" />
  </div>
</template>

<style lang="scss" scoped>
.inventory-slots {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  overflow-y: auto;
  border: 1px solid #454545;
  margin-top: 8px;
}
</style>
