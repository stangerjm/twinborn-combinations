<script setup lang="ts">
import { ref } from 'vue';
import { Metal } from '../data/twinborn-combinations';
import { Filter, FilterType } from '../interfaces/filters';

const filterMap: { [key in FilterType]: string } = {
  AllomanticMetal: 'Allomantic metal',
  FeruchemicalMetal: 'Feruchemical metal',
  Compounders: 'Compounders',
};

const selectedFilterType = ref<keyof Filter | undefined>(undefined);
const selectedFilters = defineModel<Filter>({ required: true });
const searchText = ref<string | undefined>(undefined);
const isOpen = ref<boolean>(false);
</script>

<template>
  <div
    class="twinborn-metalFilter"
    tabindex="-1"
    @focus.capture="() => isOpen = true"
    @blur.capture="() => isOpen = false"
  >
    <input
      v-model="searchText"
      type="search"
    >
    <div
      class="twinborn-metalFilter--dropdown"
      :class="isOpen ? 'twinborn-metalFilter--dropdown__show' : undefined"
    >
      <div
        v-if="!selectedFilterType"
        class="twinborn-metalFilter--filters"
      >
        <span class="twinborn-metalFilter--title">Filters</span>
        <span
          v-for="[filter, label] in Object.entries(filterMap)"
          :key="filter"
          class="twinborn-metalFilter--filter"
          @click="() => {
            if (filter as FilterType === 'Compounders') {
              // remove other filters
              selectedFilters = {
                Compounders: true,
              };
              isOpen = false;
              selectedFilterType = undefined;
              return;
            }
            selectedFilterType = filter as FilterType;
          }"
        >
          {{ label }}
        </span>
      </div>
      <div
        v-if="selectedFilterType === 'AllomanticMetal' || selectedFilterType === 'FeruchemicalMetal'"
        class="twinborn-metalFilter--filters"
      >
        <span class="twinborn-metalFilter--title">Metals</span>
        <span
          v-for="metal in Object.keys(Metal)"
          :key="metal"
          class="twinborn-metalFilter--filter"
          @click="() => {
            selectedFilters = {
              ...selectedFilters,
              [selectedFilterType as FilterType]: metal,
              // remove compounders only filter
              Compounders: false,
            };
            isOpen = false;
            selectedFilterType = undefined;
          }"
        >
          {{ metal }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.twinborn-metalFilter {
  width: 100%;
}

input {
  width: 100%;
  padding: 0.5rem;
  background-image: url('../assets/search.svg');
  background-repeat: no-repeat;
  background-size: 1.5rem;
  background-position-y: center;
  background-position-x: 0.5rem;
  border-radius: 0.75rem;
  border: 0.1rem solid var(--item-border-color);
  background-color: var(--item-background-color);
  color: white;
  padding-left: 3rem;
}

.twinborn-metalFilter--dropdown {
  display: none;
  border: 0.1rem solid var(--item-border-color);
  background-color: var(--item-background-color);
  border-radius: 0.75rem;
  margin-top: 0.5rem;
}

.twinborn-metalFilter--dropdown__show {
  display: inline-block;
}

.twinborn-metalFilter--filters {
  display: grid;
}

.twinborn-metalFilter--title,
.twinborn-metalFilter--filter {
  padding: 0.5rem 1rem;
  border-bottom: 0.1rem solid var(--item-border-color);
}

.twinborn-metalFilter--filter {
  padding-left: 3rem;
  cursor: pointer;
}

.twinborn-metalFilter--filter:hover {
  background-color: var(--item-background-color-hover);
}

.twinborn-metalFilter--filter:last-child {
  border-bottom: none;
  border-radius: 0rem 0rem 1rem 1rem;
}
</style>
