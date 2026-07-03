<template>
  <div class="waves-container">
    <svg
      class="wave wave1"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        :fill="gradientColor"
        fill-opacity="0.3"
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
    <svg
      class="wave wave2"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        :fill="gradientColor"
        fill-opacity="0.2"
        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
    <svg
      class="wave wave3"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        :fill="gradientColor"
        fill-opacity="0.1"
        d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,197.3C960,224,1056,224,1152,197.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  gradient: {
    type: String,
    default: 'about-gradient-subtle'
  }
})

const gradientColor = computed(() => {
  const gradients = {
    'about-gradient': 'hsl(270, 67%, 45%)',
    'about-gradient-subtle': 'hsl(270, 67%, 45%)',
    'about-gradient-accent': 'hsl(38, 98%, 52%)',
  }
  return gradients[props.gradient] || 'hsl(270, 67%, 45%)'
})
</script>

<style scoped>
.waves-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 400px;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 150%;
  height: 320px;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.wave1 {
  animation: wave-move 8s ease-in-out infinite;
  opacity: 0.5;
}

.wave2 {
  animation: wave-move 10s ease-in-out infinite reverse;
  opacity: 0.4;
}

.wave3 {
  animation: wave-move 12s ease-in-out infinite;
  animation-delay: -2s;
  opacity: 0.3;
}

@keyframes wave-move {
  0% {
    transform: translateX(0) translateZ(0);
  }
  50% {
    transform: translateX(-100px) translateZ(0);
  }
  100% {
    transform: translateX(0) translateZ(0);
  }
}
</style>
