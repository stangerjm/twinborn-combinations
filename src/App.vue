<script setup lang="ts">
import { twinbornCombos } from './data/twinborn-combinations';
import TwinbornList from './components/twinborn-list.vue';
</script>

<template>
  <div class="twinborn">
    <TwinbornList :twinborn-combos="twinbornCombos" />
  </div>
</template>

<style scoped>
.twinborn {
  width: 100%;
  height: 100%;
}
</style>
