<template>
  <div class="space-y-4">
    <p>
      Especializado en el <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-fuchsia">modelado de agentes de inteligencia artificial</span>, estructurando sistemas interactivos con una arquitectura frontend robusta, modular y escalable. Diseño e implemento flujos de trabajo eficientes basados en <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-pink">skills y herramientas programadas a medida</span>.
    </p>
    <p>
      Mi enfoque combina la optimización de rendimiento, la integración fluida de APIs cognitivas y la reutilización de código para asegurar que cada interacción del agente sea rápida, precisa y brinde la mejor experiencia de usuario.
    </p>
    <div class="pt-3">
      <BaseGradientButton
        to="/skills"
        text="Ver habilidades técnicas"
        icon="mdi:arrow-right"
      />
    </div>
  </div>
</template>

<script setup>
import BaseGradientButton from '~/components/Common/BaseGradientButton.vue';
</script>
