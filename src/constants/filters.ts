import type {IFilterItem} from "@/types/item.type.ts";
import iconAll from '@/assets/images/filters/all.svg';
import iconArmor from '@/assets/images/filters/armor.svg';
import iconWeapon from '@/assets/images/filters/weapon.svg';
import iconMisc from '@/assets/images/filters/misc.svg';

export const FILTERS: IFilterItem[] = [
  { id: "all", label: "ALL ITEMS", icon: iconAll },
  { id: "armor", label: "ARMOR", icon: iconArmor },
  { id: "weapon", label: "WEAPONS", icon: iconWeapon },
  { id: "misc", label: "MISCELLANEOUS", icon: iconMisc },
];
