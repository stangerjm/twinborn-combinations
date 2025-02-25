<script setup lang="ts">
import TwinbornCombo from './twinborn-combo.vue';
import { Twinborn } from '../data/twinborn-combinations';
import { ref } from 'vue';

const { twinbornCombos } = defineProps<{ twinbornCombos: Twinborn[] }>();
const selectedCombo = ref<Twinborn | undefined>(undefined);

function isSelected(combo: Twinborn) {
  return combo.allomanticPower.metal === selectedCombo.value?.allomanticPower.metal && combo.feruchemicalPower.metal === selectedCombo.value?.feruchemicalPower.metal;
}
</script>

<template>
  <div class="twinborn-list">
    <TwinbornCombo
      v-for="combo in twinbornCombos"
      :key="`${combo.allomanticPower.metal}-${combo.feruchemicalPower.metal}`"
      :twinborn="combo"
      :selected="isSelected(combo)"
      @click="selectedCombo = isSelected(combo) ? undefined : combo"
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
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
}
</style>
