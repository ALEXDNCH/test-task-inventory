import type {IInventoryItem, TCaseParamType, TFilterId} from "@/types/item.type";
import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useInventoryStore = defineStore("inventoryStore", () => {
  const selectedFilter = ref<TFilterId>("all");
  const caseParam = ref<TCaseParamType>(1);
  const inventoryItems = ref<IInventoryItem[]>([]);

  const filteredItems = computed(() => {
    if (selectedFilter.value === "all") return inventoryItems.value;
    return inventoryItems.value.filter((item) => item.type === selectedFilter.value);
  });

  return {selectedFilter, caseParam, inventoryItems, filteredItems};
});
