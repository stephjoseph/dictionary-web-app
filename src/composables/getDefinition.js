import { ref } from 'vue';

export default function getDefinition() {
  const definition = ref(null);
  const error = ref(null);
  const loading = ref(false);

  async function searchWord(word) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data[0]);
        if (data.length > 0) {
          definition.value = data[0];
        } else {
          error.value = 'No definition found';
        }
      }
      console.log(definition.value);
    } catch (err) {
      error.value = 'Error fetching data';
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    definition,
    error,
    loading,
    searchWord,
  };
}
