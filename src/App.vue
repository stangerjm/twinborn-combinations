<script setup lang="ts">
import ConfigurableList from './views/configurable-list.vue';
</script>

<template>
  <div class="twinborn">
    <ConfigurableList />
  </div>
</template>

<style scoped>
.twinborn {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
}
</style>
