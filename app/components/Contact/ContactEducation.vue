<template>
  <div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="group relative rounded-2xl border border-contact-accent-dark/80 p-6 hover:border-contact-accent/50 transition-all duration-500"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-contact-accent/10 to-about-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        ></div>

        <div class="relative z-10">
          <div class="flex items-start gap-4 mb-4">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-xl bg-contact-accent/20 border border-contact-accent/60"
            >
              <Icon :name="experience.icon" class="w-6 h-6 text-contact-accent" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white mb-1">
                {{ experience.title }}
              </h3>
              <p class="text-sm text-contact-accent font-medium">
                {{ experience.institution }}
              </p>
            </div>
          </div>

          <p class="text-gray-300 text-sm mb-3">
            {{ experience.description }}
          </p>

          <div class="flex items-center gap-2 text-xs text-gray-400">
            <Icon name="mdi:calendar" class="w-3 h-3" />
            <span>{{ experience.period }}</span>
          </div>

          <div class="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <Icon name="mdi:map-marker" class="w-3 h-3" />
            <span>{{ experience.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const experiences = [
  {
    id: 1,
    title: "Ingeniería en Informática",
    institution: "IUJO - Extensión Barquisimeto",
    icon: "mdi:school",
    description:
      "Formación académica de excelencia en una institución de la Compañía de Jesús, donde desarrollé una base sólida en ingeniería de software, algoritmos y arquitectura de sistemas. Esta educación me proporcionó las herramientas técnicas y el pensamiento analítico necesario para abordar desafíos complejos en el desarrollo de soluciones digitales.",
    period: "Formación Profesional",
    location: "Barquisimeto, Venezuela",
  },
  {
    id: 2,
    title: "Desarrollador Full Stack",
    institution: "Ticktaps - Ticz",
    icon: "mdi:code-tags",
    description:
      "Experiencia profesional en una empresa venezolana líder en desarrollo tecnológico, donde participé en proyectos de desarrollo web, diseño de interfaces y aplicaciones móviles. Trabajé en automatización con hardware y proyectos de electrónica a medida, adquiriendo habilidades versátiles que me permiten ofrecer soluciones integrales desde el frontend hasta el backend, adaptándome a las necesidades específicas de cada cliente.",
    period: "Experiencia Profesional",
    location: "Venezuela",
  },
];
</script>
