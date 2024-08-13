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
    <div class="twinborn-combination--section">
      <header class="twinborn-combination--title">
        <span>{{ twinborn.allomanticPower.metal }} <template v-if="twinborn.allomanticPower.names.length > 0">({{ twinborn.allomanticPower.names.join('/') }})</template></span>
        <AllomancySymbol :metal="twinborn.allomanticPower.metal" />
      </header>
      <main class="twinborn-combination--hidden">
        <div class="twinborn-combination--spacer" />
        {{ twinborn.allomanticPower.burningEffect }}
      </main>
    </div>
    <div class="twinborn-combination--spacer" />
    <div class="twinborn-combination--section">
      <header class="twinborn-combination--title">
        <span>{{ twinborn.feruchemicalPower.metal }} <template v-if="twinborn.feruchemicalPower.names.length > 0">({{ twinborn.feruchemicalPower.names.join('/') }})</template></span>
        <FeruchemySymbol :metal="twinborn.feruchemicalPower.metal" />
      </header>
      <main class="twinborn-combination--hidden">
        <div class="twinborn-combination--spacer" />
        When tapping - {{ twinborn.feruchemicalPower.tappingEffect }}<br>
        When storing - {{ twinborn.feruchemicalPower.storingEffect }}
      </main>
    </div>
  </div>
</template>

<style scoped>
.twinborn-combination {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto 1fr;
  justify-content: space-between;
  grid-gap: 1rem;
  align-items: center;
  border: 0.2rem solid #a1b1c2;
  border-radius: 0.75rem;
  color: white;
  background: #072d52;
  padding: 1rem;
}

.twinborn-combination--section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.twinborn-combination--section:not(:first-of-type) .twinborn-combination--title {
  justify-content: end;
}

.twinborn-combination--title {
  display: grid;
  grid-gap: 1rem;
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;
}

.twinborn-combination--spacer {
  width: 0.1rem;
  background: white;
  height: 100%;
  content: '';
  display: inline-block;
}

.twinborn-combination--hidden .twinborn-combination--spacer {
  height: 0.1rem;
  width: 100%;
}

.twinborn-combination--symbol {
  color: white;
}

.twinborn-combination:hover .twinborn-combination--hidden {
  max-height: 20rem;
  transition: max-height 650ms ease;
}

.twinborn-combination--hidden {
  display: grid;
  grid-gap: 1rem;
  margin-top: 1rem;
  overflow: hidden;
  max-height: 0;
  transition: max-height 250ms ease;
}
</style>
