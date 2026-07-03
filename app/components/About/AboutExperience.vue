<template>
  <div class="space-y-4">
    <p>
      Como Desarrollador Frontend en <strong>
        <a
          href="https://ticz.io/"
          target="_blank"
          rel="noopener noreferrer"
          class="link-ticktaps text-about-accent-light font-medium transition-all duration-300 hover:text-[var(--contact-accent)] focus:text-[var(--contact-accent)] group-hover:text-[var(--contact-accent)] group-focus-within:text-[var(--contact-accent)] cursor-pointer underline-offset-2"
          :class="{ 'text-[var(--contact-accent)] glow-contact': isActive }"
        >
         Ticktaps (ticz.io)
        </a>
      </strong>, construyo aplicaciones web dinámicas y eficientes utilizando el ecosistema de <strong>Vue, Nuxt y TypeScript</strong>.
    </p>
    <p>
      He colaborado en proyectos destacados como la <strong>Liga Mayor de Béisbol Profesional (LMBP)</strong>, la <strong>Federación Nacional de Fútbol (FVF)</strong>, la aplicación automotriz <strong>Mi Changan APP</strong>, la plataforma de colaboradores del <strong>Regnum Christi</strong> , <strong>entre otros</strong>. Enfocándome en lograr arquitecturas limpias, excelente performance y una buena experiencia de usuario .
    </p>
    <div class="pt-2">
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-about-fuchsia to-about-pink text-white font-medium text-sm shadow-[0_4px_15px_rgba(217,70,239,0.3)] hover:shadow-[0_6px_20px_rgba(217,70,239,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span>Ver proyectos realizados</span>
        <Icon name="mdi:arrow-right" class="w-4.5 h-4.5" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});
</script>
