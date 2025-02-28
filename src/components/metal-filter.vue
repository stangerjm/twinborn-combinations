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

// lol
function getFilteredFilters() {
  return Object.entries(filterMap).filter(([_, label]) => searchText.value == null || label.toLowerCase().includes(searchText.value.trim().toLowerCase()));
}

function getFilteredMetals() {
  const metalSearch = searchText.value?.split('=')[1]?.trim();
  return Object.values(Metal).filter((metal) => metalSearch == null || metal.toLowerCase().includes(metalSearch.toLowerCase()));
}

function selectFilter(metalInput: string) {
  // remove compounders only filter
  const { Compounders: _, ...filters } = selectedFilters.value;
  const metal = Object.keys(Metal).find((m) => m.toLowerCase() === metalInput.toLowerCase()) ?? metalInput;

  selectedFilters.value = {
    ...filters,
    [selectedFilterType.value as FilterType]: metal,
  };
}

function clearInput() {
  selectedFilterType.value = undefined;
  searchText.value = undefined;
}

function removeFilter(key: FilterType) {
  const { [key]: _, ...filters } = selectedFilters.value;
  selectedFilters.value = filters;
}

function shouldShowMetalDropdown() {
  if (getFilteredMetals().length < 1) {
    return false;
  }

  if (selectedFilterType.value === 'AllomanticMetal' || selectedFilterType.value === 'FeruchemicalMetal') {
    return true;
  }

  if ((searchText.value?.includes('=') && Object.values(filterMap).some((label) => searchText.value?.split('=')[0].trim().toLowerCase() === label.toLowerCase()))) {
    return true;
  }

  return false;
}
</script>

<template>
  <div
    class="twinborn-metalFilter"
    tabindex="-1"
  >
    <div class="twinborn-metalFilter--inputContainer">
      <input
        v-model="searchText"
        type="search"
        @input="(e) => {
          const value = (e.target as HTMLInputElement | null)?.value;
          if (value && value.includes('=')) {
            const [filterText] = value.split('=').map((item) => item.trim());
            const [filterType] = Object.entries(filterMap).find(([_, label]) => label.toLowerCase() === filterText.toLowerCase()) ?? [];

            if (filterType) {
              selectedFilterType = filterType as FilterType;
            }

            return;
          }

          // user is tying a search. Any previously selected filter types should be cleared
          selectedFilterType = undefined;
        }"
        @keydown.enter="(e) => {
          const value = (e.target as HTMLInputElement | null)?.value;

          if (value && value.includes('=')) {
            const [_, metal] = value.split('=').map((item) => item.trim());
            if (Object.keys(Metal).map(m => m.toLowerCase()).includes(metal.toLowerCase())) {
              selectFilter(metal);
              clearInput();
            }
          }
        }"
        @focus="() => isOpen = true"
        @blur="() => isOpen = false"
      >
      <div
        v-if="!selectedFilterType && !searchText?.includes('=') && getFilteredFilters().length > 0"
        class="twinborn-metalFilter--filters"
        :class="isOpen ? 'twinborn-metalFilter--filters__show' : undefined"
      >
        <span class="twinborn-metalFilter--title">Filters</span>
        <span
          v-for="[filter, label] in getFilteredFilters()"
          :key="filter"
          class="twinborn-metalFilter--filterType"
          @mousedown="(e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
          }"
          @click="() => {
            if (filter as FilterType === 'Compounders') {
              // remove other filters
              selectedFilters = {
                Compounders: true,
              };

              clearInput();
              return;
            }

            selectedFilterType = filter as FilterType;
            searchText = `${label} = `;
          }"
        >
          {{ label }}
        </span>
      </div>
      <div
        v-if="shouldShowMetalDropdown()"
        class="twinborn-metalFilter--filters"
        :class="isOpen ? 'twinborn-metalFilter--filters__show' : undefined"
      >
        <span class="twinborn-metalFilter--title">Metals</span>
        <span
          v-for="metal in getFilteredMetals()"
          :key="metal"
          class="twinborn-metalFilter--filterType"
          @mousedown="(e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
          }"
          @click="() => {
            selectFilter(metal);

            clearInput();
          }"
        >
          {{ metal }}
        </span>
      </div>
    </div>
    <div
      v-if="Object.keys(selectedFilters).length > 0"
      class="twinborn-metalFilter--list"
    >
      <span
        v-for="key in Object.keys(selectedFilters).filter((key) => key !== 'Compounders')"
        :key="key"
        class="twinborn-metalFilter--filter"
      >
        {{ filterMap[key as FilterType] }} = {{ selectedFilters[key as FilterType] }}
        <span
          class="twinborn-metalFilter--removeFilter"
          tabindex="0"
          @keydown.enter="() => removeFilter(key as FilterType)"
          @click="() => removeFilter(key as FilterType)"
        />
      </span>
      <span
        v-if="selectedFilters.Compounders"
        class="twinborn-metalFilter--filter"
      >
        Compounders only
        <span
          class="twinborn-metalFilter--removeFilter"
          tabindex="0"
          @keydown.enter="() => removeFilter('Compounders')"
          @click="() => removeFilter('Compounders')"
        />
      </span>
    </div>
  </div>
</template>

<style scoped>
.twinborn-metalFilter {
  /* usually I would prefer to put the width of the parent to the 35% here but in this case
     I want the list to be scrollable while the search bar is static. `position: fixed` isn't
     helpful here since there isn't a good way to target the width of the parent element who's
     width will take up the entire screen instead of the 35%. */
  width: 35%;
  margin: 0 auto;
}

.twinborn-metalFilter--inputContainer {
  position: relative;
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

.twinborn-metalFilter--filters {
  display: none;
  border: 0.1rem solid var(--item-border-color);
  background-color: var(--item-background-color);
  border-radius: 0.75rem;
  margin-top: 0.5rem;
}

.twinborn-metalFilter--filters__show {
  display: inline-grid;
  position: absolute;
  top: 100%;
  left: 0;
}

.twinborn-metalFilter--title,
.twinborn-metalFilter--filterType {
  padding: 0.5rem 1rem;
  border-bottom: 0.1rem solid var(--item-border-color);
}

.twinborn-metalFilter--filterType {
  padding-left: 3rem;
  cursor: pointer;
}

.twinborn-metalFilter--filterType:hover {
  background-color: var(--item-background-color-hover);
}

.twinborn-metalFilter--filterType:last-child {
  border-bottom: none;
  border-radius: 0rem 0rem 1rem 1rem;
}

.twinborn-metalFilter--list {
  margin-top: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
}

.twinborn-metalFilter--filter {
  display: inline-flex;
  border: 0.1rem solid var(--item-border-color);
  background-color: var(--item-background-color);
  border-radius: 0.75rem;
  padding: 0.75rem;
}

.twinborn-metalFilter--removeFilter {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background-image: url('../assets/close.svg');
  background-size: 2rem;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 97%;
  margin-left: 1rem;
  cursor: pointer;
}
</style>
