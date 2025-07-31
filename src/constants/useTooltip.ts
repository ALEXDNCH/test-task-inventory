import {ref} from "vue";
import type {IInventoryItem} from "@/types/item.type.ts";
import {debounce} from "@/utils/debounce.ts";

export const useTooltip = () => {
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
    tooltipX.value = event.clientX + 5;
    tooltipY.value = event.clientY + 5;
  }, 15);

  return {tooltipX, tooltipY, tooltipText, tooltipVisible, handleMouseEnter, handleMouseLeave, handleMouseMove}
}