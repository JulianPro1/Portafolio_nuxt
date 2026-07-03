<template>
  <div class="space-y-4">
    <p>
      Especializado en el <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-fuchsia">modelado de agentes de inteligencia artificial</span>, estructurando sistemas interactivos con una arquitectura frontend robusta, modular y escalable. Diseño e implemento flujos de trabajo eficientes basados en <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-pink">skills y herramientas programadas a medida</span>.
    </p>
    <p>
      Mi enfoque combina la optimización de rendimiento, la integración fluida de APIs cognitivas y la reutilización de código para asegurar que cada interacción del agente sea rápida, precisa y brinde la mejor experiencia de usuario.
    </p>
    <div class="pt-3">
      <NuxtLink
        to="/skills"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-about-fuchsia to-about-pink text-white font-medium text-sm shadow-[0_4px_15px_rgba(217,70,239,0.3)] hover:shadow-[0_6px_20px_rgba(217,70,239,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span>Ver habilidades técnicas</span>
        <Icon name="mdi:arrow-right" class="w-4.5 h-4.5" />
      </NuxtLink>
    </div>
  </div>
</template>
