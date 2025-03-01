<script setup lang="ts">
import TwinbornCombo from './twinborn-combo.vue';
import { Twinborn } from '../data/twinborn-combinations';
import { ref } from 'vue';

const { twinbornCombos } = defineProps<{ twinbornCombos: Twinborn[] }>();
const selectedCombo = ref<Twinborn | undefined>(undefined);

function isSelected(combo: Twinborn) {
  return combo.allomanticPower.metal === selectedCombo.value?.allomanticPower.metal && combo.feruchemicalPower.metal === selectedCombo.value?.feruchemicalPower.metal;
}

function toggleCombo(combo: Twinborn) {
  selectedCombo.value = isSelected(combo) ? undefined : combo;
}
</script>

<template>
  <div
    class="twinborn-list"
    tabindex="-1"
  >
    <TwinbornCombo
      v-for="combo in twinbornCombos"
      :key="`${combo.allomanticPower.metal}-${combo.feruchemicalPower.metal}`"
      :twinborn="combo"
      :selected="isSelected(combo)"
      @click="() => toggleCombo(combo)"
      @keydown.enter="() => toggleCombo(combo)"
    />
  </div>
</template>

<style scoped>
.twinborn-list {
  display: grid;
  grid-gap: 1rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  grid-auto-rows: max-content;
  padding-bottom: 1rem;
  /* using padding here instead of margin so the element can take up the entire screen
     and can be scrolled without having to put the cursor in the list itself. */
  padding-left: 32.5%;
  padding-right: 32.5%;
}
</style>
