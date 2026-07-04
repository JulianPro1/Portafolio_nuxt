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
      <BaseGradientButton
        to="/projects"
        text="Ver proyectos realizados"
        icon="mdi:arrow-right"
      />
    </div>
  </div>
</template>

<script setup>
import BaseGradientButton from '~/components/Common/BaseGradientButton.vue';

defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});
</script>
