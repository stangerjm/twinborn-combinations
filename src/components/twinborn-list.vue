<script setup lang="ts">
import TwinbornCombo from './twinborn-combo.vue';
import { Twinborn } from '../data/twinborn-combinations';

const { twinbornCombos } = defineProps<{ twinbornCombos: Twinborn[] }>();
</script>

<template>
  <div class="twinborn-list">
    <TwinbornCombo
      v-for="combo in twinbornCombos"
      :key="`${combo.allomanticPower.metal}-${combo.feruchemicalPower.metal}`"
      :twinborn="combo"
    />
  </div>
</template>

<style scoped>
.twinborn-list {
  display: grid;
  justify-content: center;
  padding: 1rem;
  grid-gap: 1rem;
  height: 100%;
  width: 35%;
  margin: 0 auto;
  overflow-y: scroll;
}
</style>
