<template>
  <div class="relative h-full p-4 sm:p-5 flex flex-col overflow-hidden text-left select-none">

    <!-- Badge superior -->
    <div class="relative z-10 mb-3 sm:mb-5 flex items-center justify-between gap-3">
      <div class="skeleton-block h-5 w-28 rounded-full"></div>
    </div>

    <!-- Cuerpo -->
    <div class="relative z-10 flex flex-1 flex-col justify-between">
      <div>
        <!-- Título (2 líneas) -->
        <div class="mb-2 sm:mb-3 space-y-1.5">
          <div class="skeleton-block h-7 w-20 rounded-md"></div>
          <div class="skeleton-block h-7 w-32 rounded-md"></div>
        </div>

        <!-- Descripción -->
        <div class="space-y-1.5">
          <div class="skeleton-block h-3 w-full rounded-full"></div>
          <div class="skeleton-block h-3 w-5/6 rounded-full"></div>
          <div class="skeleton-block h-3 w-4/6 rounded-full"></div>
        </div>
      </div>

      <div class="mt-3 sm:mt-5 space-y-3 sm:space-y-4">
        <!-- Grid 4 categorías -->
        <div class="grid grid-cols-4 gap-1.5 sm:gap-2">
          <div
            v-for="i in 4"
            :key="i"
            class="skeleton-block rounded-xl h-12 sm:h-14"
          ></div>
        </div>

        <!-- Botón CTA -->
        <div class="skeleton-block h-9 w-full rounded-xl"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-block {
  position: relative;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.06);
}

.skeleton-block::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 40%,
    rgba(255, 255, 255, 0.14) 50%,
    rgba(255, 255, 255, 0.08) 60%,
    transparent 100%
  );
  animation: shimmer 1.6s infinite ease-in-out;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
