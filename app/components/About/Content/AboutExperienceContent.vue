<script setup lang="ts">
defineProps<{
  data?: {
    company: string;
    companyUrl: string;
    role: string;
    ecosystem: string;
    projects: string[];
    projectsTrailing: string;
  }
}>()
</script>

<template>
  <div class="space-y-4" v-if="data">
    <p>
      Como {{ data.role }} en <strong>
        <NuxtLink
          :to="data.companyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="link-ticktaps text-about-accent-light font-medium transition-all duration-300 hover:text-[var(--contact-accent)] focus:text-[var(--contact-accent)] group-hover:text-[var(--contact-accent)] group-focus-within:text-[var(--contact-accent)] cursor-pointer underline-offset-2"
        >
          {{ data.company }}
        </NuxtLink>
      </strong>, construyo aplicaciones web dinámicas y eficientes utilizando el ecosistema de <strong>{{ data.ecosystem }}</strong>.
    </p>
    <p>
      He colaborado en proyectos destacados como la <strong>{{ data.projects[0] }}</strong>, la <strong>{{ data.projects[1] }}</strong>, la aplicación automotriz <strong>{{ data.projects[2] }}</strong>, la plataforma de colaboradores del <strong>{{ data.projects[3] }}</strong> , <strong>{{ data.projectsTrailing }}</strong>. Enfocándome en lograr arquitecturas limpias, excelente performance y una buena experiencia de usuario.
    </p>
  </div>
</template>
