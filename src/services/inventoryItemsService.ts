import type {TCaseParamType, IInventoryItem} from "@/types/item.type";
import axios from "axios";

export async function getInventoryItems(caseId: TCaseParamType): Promise<IInventoryItem[]> {
  const res = await axios.get(
    `https://us-central1-seven-seven-bit-inhouse-helper.cloudfunctions.net/vueDevTestTask-getInventoryState?case=${caseId}`,
  );
  return res.data.inventory;
}
