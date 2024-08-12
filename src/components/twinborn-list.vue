<script setup lang="ts">
import TwinbornCombo from './twinborn-combo.vue';
import { Twinborn } from '../data/twinborn-combinations';

const { twinbornCombos } = defineProps<{ twinbornCombos: Twinborn[] }>();
</script>

<template>
  <div class="twinborn-list">
    <TwinbornCombo
      v-for="combo in twinbornCombos"
      :key="combo.twinbornType"
      :twinborn="combo"
    />
  </div>
</template>

<style scoped>
.twinborn-list {
  display: grid;
  padding: 1rem;
  grid-gap: 1rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
</style>
