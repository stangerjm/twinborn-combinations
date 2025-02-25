<script setup lang="ts">
import { ref } from 'vue';
import TwinbornList from '../components/twinborn-list.vue';
import { Metal, Twinborn, twinbornCombos } from '../data/twinborn-combinations';

const filter = ref<Metal | undefined>(undefined);
const combos = ref<Twinborn[]>(twinbornCombos);

function filterCombos() {
  combos.value = filter.value ?
    twinbornCombos.filter(({ allomanticPower, feruchemicalPower }) => allomanticPower.metal === filter.value || feruchemicalPower.metal === filter.value) :
    twinbornCombos;
}
</script>

<template>
  <div class="twinborn-configurableList">
    <select
      v-model="filter"
      @change="filterCombos"
    >
      <option
        v-for="metal in Object.keys(Metal)"
        :key="metal"
      >
        {{ metal }}
      </option>
    </select>
    <TwinbornList :twinborn-combos="combos" />
  </div>
</template>

<style scoped>
.twinborn-configurableList {
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  width: 35%;
  height: 100%;
  margin: 0 auto;
}

.test {
  color: white;
}
</style>
