import { useOnTable } from "@/composables/useOnTable.js";

export function useMoveCalculate(table, figureType) {
  const { onTable } = useOnTable();

  function editWay(way) {
    const { cx, cy, position } = way;

    const options = {
      topLeft: (x, y) => ({ cx: x - 1, cy: y - 1 }),
      topRight: (x, y) => ({ cx: x + 1, cy: y - 1 }),
      bottomLeft: (x, y) => ({ cx: x - 1, cy: y + 1 }),
      bottomRight: (x, y) => ({ cx: x + 1, cy: y + 1 }),
    };

    return Object.assign({ position }, options[position](cx, cy));
  }

  function moveCalculate(ways) {
    const availableWays = {
      1: ["topLeft", "topRight"],
      2: ["bottomLeft", "bottomRight"],
    };

    const availableArr = [];

    ways.forEach((way) => {
      const { cx, cy, position } = way;
      const tableCell = table.value[cy][cx];
      const isAllowed = availableWays[figureType.value].includes(position);

      if (tableCell === 0 && !isAllowed) return;
      else if (tableCell === 0 && isAllowed) {
        return availableArr.push(way);
      } else if (tableCell && tableCell !== figureType.value) {
        return availableArr.push(editWay(way));
      }
    });

    return availableArr;
  }

  return {
    moveCalculate,
  };
}