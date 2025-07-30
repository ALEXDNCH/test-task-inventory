<script setup lang="ts">
import { INVENTORY_TABS } from '@/constants/inventoryTabs';
import { ref } from 'vue';

const activeTab = ref(0)
</script>

<template>
  <div class="inventory-tabs">
    <button class="tab" :class="{ '_active': activeTab === index }" v-for="(tab, index) in INVENTORY_TABS" :key="tab">{{
      tab
    }}</button>
    <button class="close-button" aria-label="Close">
      <img src="@/assets/images/close.svg" alt="Close">
    </button>
  </div>
</template>

<style scoped lang="scss">
.inventory-tabs {
  display: flex;
  align-items: center;
  width: 100%;
}

.tab {
  display: flex;
  flex: auto;
  align-items: center;
  justify-content: center;
  color: rgba($color: #fff, $alpha: 0.67);
  border: 2px solid #000000;
  transition: color 0.3s;
  gap: 0 10px;
  font-size: 24px;
  background-color: #393839;

  &:not(:first-child) {
    margin-left: -2px;
  }

  &:not(:last-child) {
    margin-right: -2px;
  }


  &._active {
    color: #fff;
    background-color: #242223;
  }
}

.close-button {
  background-color: #242223;
  width: 59px;
  height: 59px;
}

.tab,
.close-button {
  min-height: 59px;
  border: 2px solid #000000;
}
</style>