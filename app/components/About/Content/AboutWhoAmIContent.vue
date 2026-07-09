<script setup lang="ts">
defineProps<{
  data?: {
    name: string;
    experience: string;
    intro: string;
    skills: string[];
    description: string;
  }
}>()
</script>

<template>
  <div class="space-y-4" v-if="data">
    <p>
      Soy <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-fuchsia">{{ data.name }}</span>, {{ data.intro }} Con más de <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-fuchsia"> {{ data.experience }} </span> de experiencia, disfruto transformando diseños complejos en código limpio y eficiente.
    </p>
    <p>
      Me especializo en el ecosistema moderno de JavaScript, especialmente con 
      <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-pink">{{ data.skills[0] }}</span>,
      <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-fuchsia">{{ data.skills[1] }}</span> y
      <span class="text-about-accent-light font-medium transition-colors duration-300 group-hover:text-about-pink">{{ data.skills[2] }}</span>, {{ data.description }}
    </p>
  </div>
</template>
