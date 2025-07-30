<script setup lang="ts">
import { FILTERS } from "@/constants/filters";
import { useInventoryStore } from "@/stores/inventoryStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const inventoryStore = useInventoryStore();
const { selectedFilter, filteredItems, inventoryItems } = storeToRefs(inventoryStore);

const currentLabel = computed(() => FILTERS.find(item => item.id === selectedFilter.value))
</script>

<template>
  <div class="inventory-label">
    <span class="inventory-label__title">{{ currentLabel?.label }}</span>
    <span class="inventory-label__count">{{ filteredItems.length }}/{{ inventoryItems.length }}</span>
  </div>
</template>

<style lang="scss" scoped>
.inventory-label {
  width: 100%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inventory-label__count {
  font-size: 19px;
  font-weight: 500;
}
</style>