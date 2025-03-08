<script setup lang="ts">
import { ref, useTemplateRef, onUpdated } from 'vue';
import { Metal } from '../data/twinborn-combinations';
import { Filter, FilterType } from '../interfaces/filters';
import { includes, equals } from '../utils/compare';

const filterMap: { [key in FilterType]: string } = {
  AllomanticMetal: 'Allomantic metal',
  FeruchemicalMetal: 'Feruchemical metal',
  Compounders: 'Compounders',
};

const selectedFilterType = ref<FilterType | undefined>(undefined);
const highlightedFilterType = ref<FilterType | undefined>(undefined);
const highlightedMetal = ref<Metal | undefined>(undefined);
const selectedFilters = defineModel<Filter>({ required: true });
const searchText = ref<string | undefined>(selectedFilters.value.Search);
const isOpen = ref<boolean>(false);

const highlightedMetalElement = useTemplateRef<HTMLSpanElement[]>('highlighted-metal');
const highlightedFilterElement = useTemplateRef<HTMLSpanElement[]>('highlighted-filter');
const filterInput = useTemplateRef<HTMLInputElement>('filter-input');

onUpdated(() => {
  highlightedFilterElement.value?.find((el) => el.classList.contains('twinborn-metalFilter--filterType__highlighted'))
    ?.scrollIntoView({ block: 'end' });

  highlightedMetalElement.value?.find((el) => el.classList.contains('twinborn-metalFilter--filterType__highlighted'))
    ?.scrollIntoView({ block: 'end' });
});

// lol
function getFilteredFilters() {
  return Object.entries(filterMap).filter(([_, label]) => searchText.value == null || includes(label, searchText.value));
}

function getFilteredMetals() {
  const metalSearch = searchText.value?.split('=')[1]?.trim();
  return Object.values(Metal).filter((metal) => metalSearch == null || includes(metal, metalSearch));
}

function selectFilterType({ filter, label }: { filter: string; label: string }) {
  highlightedFilterType.value = undefined;

  if (filter === 'Compounders') {
    selectCompounders();
    return;
  }

  selectedFilterType.value = filter as FilterType;
  searchText.value = `${label} = `;
}

function selectFilter(metalInput: string) {
  // remove compounders only filter
  const { Compounders: _, ...filters } = selectedFilters.value;
  const metal = Object.keys(Metal).find((m) => equals(m, metalInput)) ?? metalInput;

  selectedFilters.value = {
    ...filters,
    [selectedFilterType.value as FilterType]: metal,
    Search: undefined,
  };

  clearInput();
}

function selectCompounders() {
  // remove other filters
  selectedFilters.value = {
    Compounders: true,
  };

  clearInput();
}

function clearInput() {
  isOpen.value = false;
  selectedFilterType.value = undefined;
  searchText.value = undefined;
  highlightedMetal.value = undefined;
  highlightedFilterType.value = undefined;
}

function removeFilter(key: FilterType) {
  const { [key]: _, ...filters } = selectedFilters.value;
  selectedFilters.value = filters;
  filterInput.value?.focus();
}

function shouldShowMetalDropdown() {
  // don't show metal list if search can't match any known metals
  if (getFilteredMetals().length < 1) {
    return false;
  }

  // only show metal list if selecting a filter that requires selection of a metal
  if (selectedFilterType.value === 'AllomanticMetal' || selectedFilterType.value === 'FeruchemicalMetal') {
    return true;
  }

  // show the metal list if the user has typed in a search that requires selection of a metal
  if ((searchText.value?.includes('=') && ['AllomanticMetal', 'FeruchemicalMetal'].some((label) => equals(searchText.value?.split('=')[0] ?? '', label)))) {
    return true;
  }

  return false;
}

function shouldShowFilterDropdown() {
  return !selectedFilterType.value && !searchText.value?.includes('=') && getFilteredFilters().length > 0;
}
</script>

<template>
  <div
    class="twinborn-metalFilter"
    tabindex="-1"
  >
    <div class="twinborn-metalFilter--inputContainer">
      <input
        ref="filter-input"
        v-model="searchText"
        type="search"
        aria-label="Metal filter"
        @input="(e) => {
          isOpen = true;
          selectedFilters.Search = (e.target as HTMLInputElement).value;

          // clear out the highlighted filter when the user types
          highlightedFilterType = undefined;

          const value = (e.target as HTMLInputElement | null)?.value;
          if (value && value.includes('=')) {
            const [filterText] = value.split('=').map((item) => item.trim());
            const [filterType] = Object.entries(filterMap).find(([_, label]) => equals(label, filterText)) ?? [];

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
          isOpen = true;

          if (highlightedFilterType) {
            selectFilterType({ filter: highlightedFilterType, label: filterMap[highlightedFilterType] });
            return;
          }

          if (highlightedMetal) {
            selectFilter(highlightedMetal);
            return;
          }

          if (value && value.includes('=')) {
            const [_, metal] = value.split('=').map((item) => item.trim());
            if (Object.keys(Metal).some(m => equals(m, metal))) {
              selectFilter(metal);
              clearInput();
            }
          }
        }"
        @keydown.arrow-down="(e) => {
          e.preventDefault();

          // do not highlight the next item if the dropdown isn't open yet
          if (!isOpen) {
            return;
          }

          if (shouldShowFilterDropdown()) {
            const possibleFilters = getFilteredFilters().map((([filter]) => filter)) as FilterType[];
            const currentIndex = highlightedFilterType ? possibleFilters.indexOf(highlightedFilterType) : -1;

            // only highlight the next filter if there is a next filter in the list
            if (currentIndex + 1 === possibleFilters.length) {
              return;
            }

            highlightedFilterType = possibleFilters[currentIndex + 1];
          }

          if (shouldShowMetalDropdown()) {
            const possibleMetals = getFilteredMetals().map(((metal) => metal)) as Metal[];
            const currentIndex = highlightedMetal ? possibleMetals.indexOf(highlightedMetal) : -1;

            // only highlight the next metal if there is a next metal in the list
            if (currentIndex + 1 === possibleMetals.length) {
              return;
            }

            highlightedMetal = possibleMetals[currentIndex + 1];
          }
        }"
        @keydown.arrow-up="(e) => {
          e.preventDefault();

          // do not highlight the next item if the dropdown isn't open yet
          if (!isOpen) {
            return;
          }

          if (shouldShowFilterDropdown()) {
            const possibleFilters = getFilteredFilters().map((([filter]) => filter)) as FilterType[];
            const currentIndex = highlightedFilterType ? possibleFilters.indexOf(highlightedFilterType) : -1;

            // only highlight the next filter if there is a next filter in the list
            if (currentIndex - 1 < 0) {
              return;
            }

            highlightedFilterType = possibleFilters[currentIndex - 1];
          }

          if (shouldShowMetalDropdown()) {
            const possibleMetals = getFilteredMetals().map(((metal) => metal)) as Metal[];
            const currentIndex = highlightedMetal ? possibleMetals.indexOf(highlightedMetal) : -1;

            // only highlight the next metal if there is a next metal in the list
            if (currentIndex - 1 < 0) {
              return;
            }

            highlightedMetal = possibleMetals[currentIndex - 1];
          }
        }"
        @focus="() => isOpen = true"
        @click="() => isOpen = true"
        @blur="() => {
          isOpen = false;
          highlightedMetal = undefined;
          highlightedFilterType = undefined;
        }"
        @keydown.escape="() => {
          isOpen = false;
          highlightedMetal = undefined;
          highlightedFilterType = undefined;
        }"
      >
      <div
        v-if="shouldShowFilterDropdown()"
        class="twinborn-metalFilter--filters"
        :class="{ 'twinborn-metalFilter--filters__show': isOpen }"
      >
        <span class="twinborn-metalFilter--title">Filters</span>
        <span
          v-for="[filter, label] in getFilteredFilters()"
          :key="filter"
          ref="highlighted-filter"
          class="twinborn-metalFilter--filterType"
          :class="{
            'twinborn-metalFilter--filterType__highlighted': filter === highlightedFilterType,
          }"
          @mousedown="(e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
          }"
          @click="() => {
            if (filter as FilterType === 'Compounders') {
              selectCompounders();
              return;
            }

            selectFilterType({ filter, label });
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
          ref="highlighted-metal"
          class="twinborn-metalFilter--filterType"
          :class="{
            'twinborn-metalFilter--filterType__highlighted': metal === highlightedMetal,
          }"
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
      v-if="Object.keys(selectedFilters).filter((key) => key !== 'Search').length > 0"
      class="twinborn-metalFilter--list"
    >
      <span
        v-for="key in Object.keys(selectedFilters).filter((key) => !['Compounders', 'Search'].includes(key))"
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
  max-height: 50vh;
  overflow-y: auto;
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

.twinborn-metalFilter--filterType__highlighted {
  background-color: var(--item-background-color-hover);
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
