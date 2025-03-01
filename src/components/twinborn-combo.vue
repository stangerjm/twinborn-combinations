<script setup lang="ts">
import { Twinborn } from '../data/twinborn-combinations';
import FeruchemySymbol from '../components/feruchemy-symbol.vue';
import AllomancySymbol from '../components/allomancy-symbol.vue';

interface TwinbornComboProps {
  twinborn: Twinborn;
  selected?: boolean;
}

const { twinborn, selected } = defineProps<TwinbornComboProps>();
</script>

<template>
  <div
    class="twinborn-combination"
    tabindex="0"
  >
    <span
      class="twinborn-combination--selectIcon"
      :class="selected ? 'twinborn-combination--selectIcon__selected' : 'twinborn-combination--selectIcon__closed'"
    />
    <div class="twinborn-combination--section">
      <header class="twinborn-combination--title">
        <span>{{ twinborn.allomanticPower.metal }} <template v-if="twinborn.allomanticPower.names.length > 0">({{ twinborn.allomanticPower.names.join('/') }})</template></span>
        <AllomancySymbol :metal="twinborn.allomanticPower.metal" />
      </header>
      <main :class="selected ? 'twinborn-combination--show' : 'twinborn-combination--hidden'">
        <div class="twinborn-combination--spacer" />
        {{ twinborn.allomanticPower.burningEffect }}
      </main>
    </div>
    <div class="twinborn-combination--spacer" />
    <div class="twinborn-combination--section">
      <header class="twinborn-combination--title twinborn-combination--feruchemicalMetal">
        <span>{{ twinborn.feruchemicalPower.metal }} <template v-if="twinborn.feruchemicalPower.names.length > 0">({{ twinborn.feruchemicalPower.names.join('/') }})</template></span>
        <FeruchemySymbol :metal="twinborn.feruchemicalPower.metal" />
      </header>
      <main :class="selected ? 'twinborn-combination--show' : 'twinborn-combination--hidden'">
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
  grid-template-columns: auto 1fr auto 1fr;
  justify-content: space-between;
  grid-gap: 1rem;
  align-items: center;
  border: 0.2rem solid var(--item-border-color);
  border-radius: 0.75rem;
  color: white;
  background: var(--item-background-color);
  padding: 1rem;
  overflow: hidden;
  margin-top: 0.1rem;
}

.twinborn-combination:hover {
  cursor: pointer;
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

.twinborn-combination--show .twinborn-combination--spacer,
.twinborn-combination--hidden .twinborn-combination--spacer {
  height: 0.1rem;
  width: 100%;
}

.twinborn-combination--symbol {
  color: white;
}

.twinborn-combination--show,
.twinborn-combination--hidden {
  display: grid;
  grid-gap: 1rem;
}

.twinborn-combination--show {
  max-height: 20rem;
  transition: max-height 650ms ease, margin-top 350ms ease;
  display: grid;
  grid-gap: 1rem;
  margin-top: 1rem;
}

.twinborn-combination--hidden {
  overflow: hidden;
  max-height: 0;
  transition: max-height 250ms ease, margin-top 250ms ease;
}

.twinborn-combination--selectIcon {
  margin-top: 0.4rem;
  align-self: start;
}

.twinborn-combination--selectIcon__selected {
  min-width: 2rem;
  height: 2rem;
  background-image: url('../assets/arrow-up.svg');
  background-size: 2rem;
  background-repeat: no-repeat;
}

.twinborn-combination--selectIcon__closed {
  min-width: 2rem;
  height: 2rem;
  background-image: url('../assets/arrow-down.svg');
  background-size: 2rem;
  background-repeat: no-repeat;
}

.twinborn-combination--feruchemicalMetal {
  text-align: right;
}
</style>
