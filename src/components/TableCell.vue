<template>
  <div class="table-cell" @click="moveChecker">
    <div
      v-if="figureType !== 0"
      class="table-cell__figure"
      :class="{
        'table-cell__figure--white': figureType === 1,
        'table-cell__figure--black': figureType === 2,
        'table-cell__figure--active': isActive
      }"
      @click.stop="findWays"
    />
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from "vue";
  import { storeToRefs } from "pinia";
  import { useMainStore } from "@/store";

  import { useOnTable } from "@/composables/useOnTable.js";
  import { useCanMove } from "@/composables/useCanMove.js";
  import { useMoveCalculate } from "@/composables/useMoveCalculate.js";

  const emit = defineEmits(["showWay", "moveChecker"]);
  const store = useMainStore();
  const { table, currentChecker } = storeToRefs(store);

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const figureType = ref(props.data.figureType);
  const cx = ref(props.data.cx);
  const cy = ref(props.data.cy);
  const current = reactive({
    cx: cx.value,
    cy: cy.value,
    figureType: figureType.value,
  });

  const isActive = computed(
    () =>
      currentChecker.value &&
      currentChecker.value.cx === current.cx &&
      currentChecker.value.cy === current.cy
  );

  // Импортируем композаблы
  const { onTable } = useOnTable();
  const { canMove } = useCanMove(table);
  const { moveCalculate } = useMoveCalculate(table, figureType);

  function findWays() {
    let ways = [
      {
        position: "topLeft",
        cx: cx.value - 1,
        cy: cy.value - 1,
      },
      {
        position: "topRight",
        cx: cx.value + 1,
        cy: cy.value - 1,
      },
      {
        position: "bottomLeft",
        cx: cx.value - 1,
        cy: cy.value + 1,
      },
      {
        position: "bottomRight",
        cx: cx.value + 1,
        cy: cy.value + 1,
      },
    ].filter((item) => onTable(item));

    ways = moveCalculate(ways).filter((item) => canMove(item));

    emit("showWay", { ways, current });
  }

  function moveChecker() {
    emit("moveChecker", current);
  }
</script>

<style lang="less">
  .table-cell {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;

    &__figure {
      box-sizing: border-box;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid @gray;
      cursor: pointer;

      &--black {
        background-color: @black;
        &.table-cell__figure--active {
          box-shadow: 0 0 4px 2px @black;
        }
      }

      &--white {
        background-color: @white;
        &.table-cell__figure--active {
          box-shadow: 0 0 4px 2px @white;
        }
      }
    }
  }
</style>