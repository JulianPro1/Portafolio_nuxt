<template>
  <Transition name="slide" mode="out-in">
    <slot />
  </Transition>
</template>

<style scoped>
/* Transiciones CSS puras - sin animaciones JS de propiedades complejas */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
