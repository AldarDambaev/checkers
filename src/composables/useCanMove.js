import { useOnTable } from "@/composables/useOnTable.js";

export function useCanMove(table) {
  const { onTable } = useOnTable();

  function canMove(way) {
    const { cx, cy } = way;
    return onTable(way) && table.value[cy][cx] === 0;
  }

  return {
    canMove,
  };
}