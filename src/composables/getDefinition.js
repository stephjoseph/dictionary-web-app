import { ref } from 'vue';

export default function getDefinition() {
  const definition = ref(null);
  const phonetic = ref(null);
  const error = ref(null);
  const loading = ref(false);

  async function searchWord(word) {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );

      const data = await res.json();
      console.log(data[0]);
      if (data.length > 0) {
        definition.value = data[0];
        const phonetics = definition.value.phonetics;

        if (phonetics.length) {
          let prioritizedItem = null; // Initialize a variable to store the prioritized item

          for (const item of phonetics) {
            if (item.text && item.audio) {
              // If an item with both text and audio is found, set and break the loop
              phonetic.value = item;
              prioritizedItem = item;
              break;
            } else if (!prioritizedItem && (item.text || item.audio)) {
              // If no item with both text and audio is found but an item has either text or audio, set it
              phonetic.value = item;
            }
          }

          if (!prioritizedItem) {
            // If no item with both text and audio or either text or audio is found, set a default value
            phonetic.value = { audio: null, text: null };
          }
        } else {
          phonetic.value = { audio: null, text: null };
        }
      } else {
        definition.value = null;
        error.value = 'No definitions found';
      }

      console.log(phonetic.value);
    } catch (err) {
      error.value = 'Error fetching data';
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    definition,
    phonetic,
    error,
    loading,
    searchWord,
  };
}
