import type {IFilterItem} from "@/types/item.type.ts";

export const FILTERS: IFilterItem[] = [
  {id: "all", label: "ALL ITEMS", icon: "../../src/assets/images/filters/all.svg"},
  {id: "armor", label: "ARMOR", icon: "../../src/assets/images/filters/armor.svg"},
  {id: "weapon", label: "WEAPONS", icon: "../../src/assets/images/filters/weapon.svg"},
  {id: "misc", label: "MISCELLANEOUS", icon: "../../src/assets/images/filters/misc.svg"},
] as const;
