<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useInventoryStore } from "@/stores/inventoryStore";
import FilterSidebar from '@/components/layout/FilterSidebar.vue';
import { getInventoryItems } from '@/services/inventoryItemsService';
import type { TCaseParamType, TFilterId } from '@/types/item.type';
import InventoryTabs from '../layout/InventoryTabs.vue';
import InventoryLabel from '../layout/InventoryLabel.vue';
import InventoryGrid from './InventoryGrid.vue';

const inventoryStore = useInventoryStore();
const { selectedFilter, caseParam } = storeToRefs(inventoryStore);

onMounted(async () => {
  const url = new URL(window.location.href);
  const rawParam = url.searchParams.get('case');

  const param = rawParam !== null ? Number(rawParam) : NaN;
  const allowed: TCaseParamType[] = [1, 2, 3];

  caseParam.value = allowed.includes(param as TCaseParamType)
    ? (param as TCaseParamType)
    : 1;
  const items = await getInventoryItems(caseParam.value);
  inventoryStore.inventoryItems = items;
  console.log('res', items);
});

const handleClick = (id: TFilterId) => {
  selectedFilter.value = id
}
</script>

<template>
  <div class="inventory-wrapper">
    <InventoryTabs />
    <div class="flex">
      <FilterSidebar :selected=selectedFilter @update:filter="handleClick" />
      <main class="inventory-content">
        <InventoryLabel />
        <InventoryGrid :items="inventoryStore.filteredItems" />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.inventory-wrapper {
  width: 100%;
  max-width: 562px;
  height: 100%;
  overflow-y: auto;
  background-color: #242223;
  margin: 0 auto; 
}

.inventory-content {
  width: 100%;
  padding: clamp(8px, 15vw, 12px);
  flex: 3;
}
</style>