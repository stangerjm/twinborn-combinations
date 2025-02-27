<script setup lang="ts">
import { ref } from 'vue';
import TwinbornList from '../components/twinborn-list.vue';
import MetalFilter from '../components/metal-filter.vue';
import { Twinborn, twinbornCombos } from '../data/twinborn-combinations';
import { Filter } from '../interfaces/filters';

const combos = ref<Twinborn[]>(twinbornCombos);
const filters = ref<Filter>({});

function getFilteredCombos() {
  return combos.value.filter(({ allomanticPower, feruchemicalPower }) => {
    if (filters.value.Compounders) {
      return allomanticPower.metal === feruchemicalPower.metal;
    }

    if (filters.value.AllomanticMetal && filters.value.FeruchemicalMetal) {
      return allomanticPower.metal === filters.value.AllomanticMetal
        && feruchemicalPower.metal === filters.value.FeruchemicalMetal;
    }

    if (filters.value.AllomanticMetal) {
      return allomanticPower.metal === filters.value.AllomanticMetal;
    }

    if (filters.value.FeruchemicalMetal) {
      return feruchemicalPower.metal === filters.value.FeruchemicalMetal;
    }

    return true;
  });
}
</script>

<template>
  <div class="twinborn-configurableList">
    <MetalFilter v-model="filters" />
    <TwinbornList :twinborn-combos="getFilteredCombos()" />
  </div>
</template>

<style scoped>
.twinborn-configurableList {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
  padding-top: 1rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
