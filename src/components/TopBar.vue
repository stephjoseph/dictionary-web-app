<template>
  <div
    class="flex w-full max-w-[736px] items-center justify-between p-6 md:px-10 md:py-14"
  >
    <a href="/" class="h-8 w-7">
      <img
        class="h-full w-full object-cover"
        src="../assets/images/logo.svg"
        alt="logo"
      />
    </a>
    <div class="flex items-center gap-4 md:gap-7">
      <div class="relative">
        <button
          ref="toggleDropdownRef"
          class="flex cursor-pointer items-center gap-4 md:gap-[1.125rem]"
          @click="toggleDropdown"
        >
          <div
            class="text-[1.125rem] font-bold leading-6 tracking-normal text-2D2D2D dark:text-FFFFFF"
          >
            {{ selectedFont }}
          </div>
          <div class="h-[0.375rem] w-3">
            <img
              class="h-full w-full object-cover"
              src="../assets/images/icon-arrow-down.svg"
              alt="arrow down icon"
            />
          </div>
        </button>
        <Transition name="fade">
          <ul
            ref="dropdownRef"
            v-if="isOpen"
            class="absolute right-0 top-[2.75rem] z-50 flex h-[9.5rem] w-[11.438rem] flex-col gap-4 rounded-[16px] bg-FFFFFF p-6 shadow-[0_5px_30px_0px_rgba(0,0,0,0.1)] dark:bg-1F1F1F dark:shadow-[0_5px_30px_0px_#A445ED]"
          >
            <li
              v-for="(option, index) in options"
              :key="index"
              @click="selectOption(option)"
              class="cursor-pointer text-[1.125rem] leading-6 tracking-normal text-2D2D2D hover:text-A445ED dark:text-FFFFFF"
              :class="[
                selectedFont === option ? 'font-bold' : '',
                option === 'Sans Serif'
                  ? 'font-sans'
                  : option === 'serif'
                  ? 'font-serif'
                  : option === 'Mono'
                  ? 'font-mono'
                  : '',
              ]"
            >
              {{ option }}
            </li>
          </ul>
        </Transition>
      </div>
      <div class="h-8 w-px bg-E9E9E9"></div>
      <div class="flex items-center gap-3 md:gap-5">
        <label class="switch">
          <input type="checkbox" v-model="darkMode" />
          <div class="slider round"></div>
        </label>
        <div class="relative h-[1.125rem] w-[1.125rem]">
          <Transition name="fade">
            <img
              v-if="!darkMode"
              class="absolute left-0 top-0 h-full w-full object-cover"
              src="../assets/images/icon-moon.svg"
              alt="light mode icon"
            />
            <img
              v-else
              class="absolute left-0 top-0 h-full w-full object-cover"
              src="../assets/images/icon-moon-purple.svg"
              alt="light mode icon"
            />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
export default {
  setup() {
    const options = ref(['Sans Serif', 'Serif', 'Mono']);
    const selectedFont = ref('Sans Serif');
    const isOpen = ref(false);
    const darkMode = ref(false);
    const toggleDropdownRef = ref(false);
    const dropdownRef = ref(null);

    // Watch for changes in darkMode and update the body class accordingly
    watch(darkMode, (newValue) => {
      if (newValue) {
        document.body.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.body.classList.remove('dark');
        localStorage.theme = 'light';
      }
    });

    const changeFont = () => {
      switch (selectedFont.value) {
        case 'Sans Serif':
          document.body.classList.remove('font-serif', 'font-mono');
          document.body.classList.add('font-sans');
          break;
        case 'Serif':
          document.body.classList.remove('font-sans', 'font-mono');
          document.body.classList.add('font-serif');
          break;
        case 'Mono':
          document.body.classList.remove('font-sans', 'font-serif');
          document.body.classList.add('font-mono');
          break;
        default:
          null;
      }
    };
    // set font on load
    changeFont();

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option) => {
      selectedFont.value = option;
      isOpen.value = false;
      isOpen.value = false;
      changeFont();
    };

    const handleClickOutside = (event) => {
      if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target) &&
        !toggleDropdownRef.value.contains(event.target)
      ) {
        isOpen.value = false;
      }
    };

    onMounted(() => {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.body.classList.add('dark');
        darkMode.value = true;
      } else {
        document.body.classList.remove('dark');
        darkMode.value = false;
      }

      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });
    return {
      options,
      selectedFont,
      isOpen,
      toggleDropdown,
      selectOption,
      toggleDropdownRef,
      dropdownRef,
      darkMode,
    };
  },
};
</script>
<style lang="scss" scoped>
// switch styles
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  input {
    display: none;

    &:checked {
      & + .slider:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
      }

      & + .slider {
        background: #a445ed;
      }
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #757575;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
      position: absolute;
      content: '';
      height: 14px;
      width: 14px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    &.round {
      border-radius: 14.5px;

      &:before {
        border-radius: 50%;
      }
    }
  }
}

// transition styles
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
