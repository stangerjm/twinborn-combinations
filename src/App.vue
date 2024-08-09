<script setup lang="ts">
import { twinbornCombos } from './data/twinborn-combinations';
</script>

<template>
  <div>
    <div
      v-for="combo in twinbornCombos"
      :key="combo.twinbornType"
    >
      <b>{{ combo.twinbornType }}</b>
      <div>
        Allomancy: {{ combo.allomanticPower.metal }}<br>
        {{ combo.allomanticPower.burningEffect }}
      </div>
      <div>
        Feruchemy: {{ combo.feruchemicalPower.metal }}<br>
        When tapping - {{ combo.feruchemicalPower.tappingEffect }}<br>
        When storing - {{ combo.feruchemicalPower.storingEffect }}
      </div>
    </div>
  </div>
  <HelloWorld msg="Twinborn Combinations!" />
</template>

<style scoped>
</style>
