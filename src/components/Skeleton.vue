<template>
  <div
    class="flex w-full flex-col gap-8 border-b border-solid border-E9E9E9 pb-8 transition-colors duration-300 dark:border-3A3A3A md:gap-10 md:pb-10"
  >
    <!-- word -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <div class="skeleton h-10 w-[9.25rem] md:h-20 md:w-72"></div>
        <div class="skeleton h-6 w-[4.5rem] md:h-8 md:w-24"></div>
      </div>
      <div class="audio-player">
        <div
          class="skeleton h-12 w-12 !rounded-full md:h-[4.688rem] md:w-[4.688rem]"
        ></div>
      </div>
    </div>
    <!-- definitions -->
    <section class="flex w-full flex-col gap-10">
      <div class="flex w-full flex-col gap-10">
        <div class="flex items-center gap-6">
          <div class="skeleton h-5 w-11 md:w-20"></div>
          <div class="skeleton h-px w-full"></div>
        </div>
        <div class="flex w-full flex-col gap-10">
          <section class="flex w-full flex-col gap-4">
            <div class="skeleton h-5 w-20"></div>
            <ul
              class="ml-4 flex list-outside list-disc flex-col gap-3 marker:text-A445ED md:ml-9"
            >
              <li class="pl-5">
                <div class="skeleton mb-1 h-5 w-full"></div>
                <div class="skeleton h-5 w-4/5 md:hidden"></div>
              </li>
              <li class="pl-5">
                <div class="skeleton mb-1 h-5 w-full"></div>
                <div class="skeleton mb-1 h-5 w-full"></div>
                <div class="skeleton mb-1 h-5 w-full md:hidden"></div>
                <div class="skeleton mb-1 h-5 w-full md:hidden"></div>
                <div class="skeleton h-5 w-4/5"></div>
              </li>
              <li class="pl-5">
                <div class="skeleton mb-1 h-5 w-full"></div>
                <div class="skeleton mb-1 h-5 w-full"></div>
                <div class="skeleton h-5 w-4/5"></div>
              </li>
            </ul>
          </section>
          <section class="flex items-center gap-6">
            <div class="skeleton h-5 w-20 md:h-8 md:w-28"></div>
            <div class="skeleton h-5 w-40 md:w-52"></div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.skeleton {
  opacity: 0.6;
  border-radius: 2px;
  animation: skeleton-loading 0.7s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: rgba(164, 69, 237, 0.7);
  }

  100% {
    background-color: rgba(164, 69, 237, 1);
  }
}
</style>
