<script setup lang="ts">
import {ref, onMounted, onUnmounted, defineProps, computed} from 'vue';
import type { IInventoryItem } from '@/types/item.type';

const props = defineProps<{ item: IInventoryItem | null }>();
const remaining = ref<number | null>(null);
const isRemaining = computed(() => remaining.value !== null && remaining.value > 0)
let intervalId: ReturnType<typeof setInterval> | null = null;

const updateRemaining = () => {
  if (!props.item?.cooldown) {
    remaining.value = null;
    return;
  }

  const now = Date.now();
  remaining.value = Math.max(0, Math.floor((props.item.cooldown - now) / 1000));
};

onMounted(() => {
  updateRemaining();

  if (props.item?.cooldown) {
    intervalId = setInterval(updateRemaining, 1000);
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="inventory-slot" :class="[item?.type, { '_cooldown': isRemaining}]">
    <template v-if="item">
      <img :src="item.imageUrl" alt="item" class="item-image" />
      <div v-if="item.charges" class="top-left">{{ item.charges }}/{{ item.maxCharges }}</div>
      <div v-if="item.count" class="bottom-right">x{{ item.count }}</div>
      <div v-if="item.cooldown" class="cooldown" v-show="isRemaining">
        <img src="@/assets/images/cooldown.svg" alt="cooldown">
        {{ remaining }}s
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.inventory-slot {
  position: relative;
  aspect-ratio: 1 / 1;
  height: auto;
  width: clamp(50px, 14vw, 80px);
  background-color: #1a1a1a;
  border: 1.5px solid #454545;
  display: flex;
  align-items: center;
  justify-content: center;

  &._cooldown {
    &>img,
    .bottom-right {
      opacity: 0.5;
    }
  }

  &.armor::before,
  &.weapon::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    filter: blur(6px);
  }

  &.armor::before {
    background: radial-gradient(circle, #173659);
  }

  &.weapon::before {
    background: radial-gradient(circle, #342A47);
  }


}


.item-image {
  width: 80%;
  height: 80%;
  z-index: 3;
}

.top-left {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 13px;
  color: white;
  font-weight: 500;
  pointer-events: none;
  padding: 2px 2px;
  z-index: 2;
  text-shadow:
    -1px -1px 0 #0D0D0D,
    1px -1px 0 #0D0D0D,
    -1px 1px 0 #0D0D0D,
    1px 1px 0 #0D0D0D;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 170%;
    height: 170%;
    background: #0D0D0D;
    clip-path: polygon(0 0, 100% 0, 0 100%);
    z-index: -1;
  }
}

.bottom-right {
  position: absolute;
  bottom: 4px;
  right: 6px;
  font-size: 13px;
  color: white;
  font-weight: bold;
  pointer-events: none;
}

.cooldown {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 18px;
  color: white;
  pointer-events: none;
  z-index: 6;

  @media (max-width: 505px) {
    & img{
      display: none;
    }
  }
}
</style>
