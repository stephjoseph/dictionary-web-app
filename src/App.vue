<template>
  <Topbar />

  <div class="flex w-full flex-col gap-6 px-6 pb-20">
    <form @submit.prevent="handleSearch" class="relative">
      <input
        v-model="word"
        placeholder="Search for any word…"
        class="focus:ring-sky-500D font-base w-full rounded-[16px] bg-F4F4F4 px-6 py-[0.875rem] font-bold leading-5 caret-A445ED transition-colors duration-300 placeholder:text-2D2D2D/25 focus:border-A445ED focus:outline-none focus:ring-1 focus:ring-A445ED"
      />
      <button type="submit" class="absolute right-5 top-4 h-4 w-4">
        <img
          class="h-full w-full object-cover"
          src="./assets/images/icon-search.svg"
          alt="search icon"
        />
      </button>
    </form>
    <div v-if="loading">Loading...</div>
    <div v-else-if="definition" class="flex w-full flex-col gap-8">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <h1>{{ definition.word }}</h1>
          <span>{{ phonetic.text }}</span>
        </div>
        <div class="audio-player">
          <button @click="playAudio" class="h-12 w-12">
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
    </div>
    <div v-else>{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Topbar from './components/TopBar.vue';
import getDefinition from './composables/getDefinition';
export default {
  setup() {
    const { definition, phonetic, error, loading, searchWord } =
      getDefinition();
    const word = ref('keyboard');
    const audioPlayer = ref(null);
    const isPlaying = ref(false);

    const handleSearch = () => {
      if (word.value) {
        searchWord(word.value);
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
