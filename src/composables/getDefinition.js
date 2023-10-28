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
      `      console.log(data[0]);`;
      if (data.length > 0) {
        definition.value = data[0];
        const phonetics = definition.value.phonetics;

        phonetics.forEach((item) => {
          if (item.text && item.audio) {
            phonetic.value = item;
          }
        });
      } else {
        definition.value = null;
        error.value = 'No definition found';
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
