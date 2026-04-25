export function useOnTable() {
  function onTable(way) {
    const { cx, cy } = way;
    return cx >= 0 && cx < 8 && cy >= 0 && cy < 8;
  }

  return {
    onTable,
  };
}