<template>
  <Topbar />

  <div
    class="flex w-full max-w-[736px] flex-col gap-6 px-6 pb-20 md:gap-10 md:px-10 md:pb-[7.5rem]"
  >
    <form @submit.prevent="handleSearch" class="relative flex flex-col gap-2">
      <input
        v-model="word"
        placeholder="Search for any word…"
        class="font-base w-full rounded-[16px] bg-F4F4F4 px-6 py-[0.875rem] font-bold leading-5 caret-A445ED transition-colors duration-300 placeholder:text-2D2D2D/25 focus:border-A445ED focus:outline-none focus:ring-1 dark:bg-1F1F1F dark:text-FFFFFF md:py-5 md:text-[1.25rem] md:leading-6"
        :class="[isInputEmpty ? 'focus:ring-FF5252' : 'focus:ring-A445ED']"
      />
      <button
        type="submit"
        class="absolute right-5 top-4 h-4 w-4 md:right-6 md:top-[1.438rem]"
      >
        <img
          class="h-full w-full object-cover"
          src="./assets/images/icon-search.svg"
          alt="search icon"
        />
      </button>
      <span v-if="isInputEmpty" class="font-body-s text-FF5252">
        Whoops, can’t be empty…
      </span>
    </form>
    <div v-if="loading">Loading...</div>
    <div
      v-else-if="definition && !isInputEmpty"
      class="flex w-full flex-col gap-6 md:gap-10"
    >
      <div
        class="flex w-full flex-col gap-8 border-b border-solid border-E9E9E9 pb-8 transition-colors duration-300 dark:border-3A3A3A md:gap-10 md:pb-10"
      >
        <!-- word -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <h1
              class="text-[2rem] font-bold leading-10 tracking-normal text-2D2D2D transition-colors duration-300 dark:text-FFFFFF md:text-[4rem] md:leading-[4.813rem]"
            >
              {{ definition.word }}
            </h1>
            <span
              v-if="phonetic.text"
              class="text-[1.125rem] leading-6 tracking-normal text-A445ED md:text-[1.5rem] md:leading-[1.813rem]"
              >{{ phonetic.text }}</span
            >
          </div>
          <div class="audio-player" v-if="phonetic.audio">
            <button
              @click="playAudio"
              class="h-12 w-12 md:h-[4.688rem] md:w-[4.688rem]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                viewBox="0 0 75 75"
                class="h-full w-full"
              >
                <circle
                  fill="#A445ED"
                  cx="37.5"
                  cy="37.5"
                  r="37.5"
                  opacity=".25"
                  class="transition-colors"
                  :class="{ 'opacity-100': isPlaying }"
                />

                <path
                  class="transition-colors"
                  :class="{ 'fill-FFFFFF': isPlaying }"
                  fill="#A445ED"
                  d="M29 27v21l21-10.5z"
                />
              </svg>
            </button>
            <audio
              ref="audioPlayer"
              :src="phonetic.audio"
              @ended="audioEnded"
            ></audio>
          </div>
        </div>
        <!-- definitions -->
        <section class="flex w-full flex-col gap-10">
          <div
            v-for="(meaning, i) in definition.meanings"
            :key="i"
            class="flex w-full flex-col gap-10"
          >
            <div class="flex items-center gap-6">
              <h2
                class="text-[1.125rem] font-bold italic leading-5 tracking-normal text-2D2D2D transition-colors duration-300 dark:text-white md:text-[1.5rem] md:leading-[1.813rem]"
              >
                {{ meaning.partOfSpeech }}
              </h2>
              <div
                class="h-px w-full bg-E9E9E9 transition-colors duration-300 dark:bg-3A3A3A"
              ></div>
            </div>
            <div class="flex w-full flex-col gap-10">
              <section class="flex w-full flex-col gap-4">
                <h3
                  class="font-base leading-5 tracking-normal text-757575 md:text-[1.25rem] md:leading-6"
                >
                  Meaning
                </h3>
                <ul
                  class="ml-4 flex list-outside list-disc flex-col gap-3 marker:text-A445ED md:ml-9"
                >
                  <li
                    v-for="(definition, i) in meaning.definitions"
                    :key="i"
                    class="pl-5 text-[0.938rem] leading-6 text-2D2D2D transition-colors duration-300 dark:text-FFFFFF md:text-[1.125rem] md:leading-6"
                  >
                    <p :class="{ 'mb-3': definition.example }">
                      {{ definition.definition }}
                    </p>
                    <p v-if="definition.example" class="text-757575">
                      "{{ definition.example }}"
                    </p>
                  </li>
                </ul>
              </section>
              <section
                v-if="meaning.synonyms.length"
                class="flex items-center gap-6"
              >
                <h3
                  class="font-base leading-5 tracking-normal text-757575 md:text-[1.5rem] md:leading-[1.813rem]"
                >
                  Synonyms
                </h3>
                <div>
                  <span
                    class="font-base font-bold leading-5 tracking-normal text-A445ED md:text-[1.25rem] md:leading-6"
                    v-for="(synonym, i) in meaning.synonyms"
                    :key="i"
                  >
                    {{ synonym
                    }}<span v-if="i < meaning.synonyms.length - 1">, </span>
                  </span>
                </div>
              </section>
              <section
                v-if="meaning.antonyms.length"
                class="flex items-center gap-6"
              >
                <h3
                  class="font-base leading-5 tracking-normal text-757575 md:text-[1.5rem] md:leading-[1.813rem]"
                >
                  Antonyms
                </h3>
                <div>
                  <span
                    v-for="(synonym, i) in meaning.antonyms"
                    :key="i"
                    class="font-base font-bold leading-5 tracking-normal text-A445ED md:text-[1.25rem] md:leading-6"
                  >
                    {{ synonym
                    }}<span v-if="i < meaning.antonyms.length - 1">, </span>
                  </span>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>

      <!-- source -->
      <div
        v-if="definition.sourceUrls.length"
        class="flex w-full flex-col gap-2 md:flex-row md:gap-5"
      >
        <h3 class="font-body-s text-757575 underline">Source</h3>
        <div class="flex w-full flex-col gap-2">
          <a
            v-for="(url, i) in definition.sourceUrls"
            :key="i"
            :href="url"
            class="font-body-s flex items-center gap-2 text-2D2D2D underline transition-colors duration-300 dark:text-FFFFFF"
          >
            <span>
              {{ url }}
            </span>
            <div class="h-3 w-3">
              <img
                class="h-full w-full object-cover"
                src="./assets/images/icon-new-window.svg"
                alt="new window icon"
              />
            </div>
          </a>
        </div>
      </div>
    </div>

    <div v-else class="mt-32 flex flex-col items-center gap-11 text-center">
      <span class="text-[4rem] leading-[4.5rem] tracking-normal">😕</span>
      <div class="flex flex-col gap-6">
        <h2 class="font-heading-s !font-bold capitalize text-2D2D2D">
          {{ error }}
        </h2>
        <p class="font-body-m text-757575">
          Sorry pal, we couldn't find definitions for the word you were looking
          for. You can try the search again at later time or head to the web
          instead.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Topbar from './components/TopBar.vue';
import getDefinition from './composables/getDefinition';
export default {
  setup() {
    const { definition, phonetic, error, loading, searchWord } =
      getDefinition();
    const word = ref('keyboard');
    const isInputEmpty = ref(false);
    const audioPlayer = ref(null);
    const isPlaying = ref(false);

    const handleSearch = () => {
      if (word.value) {
        isInputEmpty.value = false;
        searchWord(word.value);
      } else {
        isInputEmpty.value = true;
      }
    };

    const playAudio = () => {
      audioPlayer.value.play();
      isPlaying.value = true;
    };

    const audioEnded = () => {
      isPlaying.value = false;
    };

    searchWord('keyboard'); // Initial search

    return {
      definition,
      phonetic,
      error,
      loading,
      searchWord,
      handleSearch,
      word,
      isInputEmpty,
      isPlaying,
      playAudio,
      audioPlayer,
      audioEnded,
    };
  },
  components: {
    Topbar,
  },
};
</script>
