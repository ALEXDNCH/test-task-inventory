import {FILTERS} from "@/constants/filters.ts";

export type TItemType = "armor" | "weapon" | "misc";
export type TFilterId = typeof FILTERS[number]['id'];
export type TCaseParamType = 1 | 2 | 3;

export interface IFilterItem {
  id: string;
  label: string;
  icon: string
}

export interface IInventoryItem {
  id: string;
  type: TItemType;
  name: string;
  imageUrl: string;
  count?: number;
  cooldown?: number;
  charges?: number;
  maxCharges?: number;
}
