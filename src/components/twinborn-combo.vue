<script setup lang="ts">
import { Twinborn } from '../data/twinborn-combinations';
import FeruchemySymbol from '../components/feruchemy-symbol.vue';
import AllomancySymbol from '../components/allomancy-symbol.vue';

interface TwinbornComboProps {
  twinborn: Twinborn;
}

const { twinborn } = defineProps<TwinbornComboProps>();
</script>

<template>
  <div class="twinborn-combination">
    <b>{{ twinborn.twinbornType }}</b>
    <AllomancySymbol :metal="twinborn.allomanticPower.metal" />
    <FeruchemySymbol :metal="twinborn.feruchemicalPower.metal" />
    <div class="twinborn-combination--hidden">
      <div>
        Allomancy: {{ twinborn.allomanticPower.metal }}<br>
        {{ twinborn.allomanticPower.burningEffect }}
      </div>
      <div>
        Feruchemy: {{ twinborn.feruchemicalPower.metal }}<br>
        When tapping - {{ twinborn.feruchemicalPower.tappingEffect }}<br>
        When storing - {{ twinborn.feruchemicalPower.storingEffect }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.twinborn-combination {
  border: 0.2rem solid #a1b1c2;
  color: white;
  background: #072d52;
  border-radius: 0.75rem;
  padding: 1rem;
}

.twinborn-combination--symbol {
  color: white;
}

.twinborn-combination--hidden {
  display: none;
}
</style>
