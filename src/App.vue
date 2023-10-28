<template>
  <div>Dictionary Web App</div>

  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="definition">
    <h2>{{ definition.word }}</h2>
  </div>
  <div v-else>No definition found.</div>
</template>

<script>
import getDefinition from './composables/getDefinition';
export default {
  setup() {
    const { definition, error, loading, searchWord } = getDefinition();

    searchWord('hello');

    return { definition, error, loading, searchWord };
  },
};
</script>
