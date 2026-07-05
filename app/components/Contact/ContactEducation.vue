<template>
  <div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="education-card group relative rounded-2xl border border-contact-accent-dark p-6 hover:border-contact-accent transition-colors duration-500"
        style="will-change: transform, box-shadow, border-color, background-color;"
        @mousemove="onMouseMove"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-contact-accent/10 to-about-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        ></div>

        <div class="relative z-10">
          <div class="flex items-start gap-4 mb-4">
            <div
              class="education-icon w-12 h-12 flex items-center justify-center rounded-xl bg-contact-accent/20 border border-contact-accent"
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

          <div v-if="experience.url" class="mt-4 flex">
            <a
              :href="experience.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-contact-accent hover:text-white transition-colors duration-300 group/link border border-contact-accent hover:border-contact-accent bg-contact-accent/5 hover:bg-contact-accent/15 px-3 py-1.5 rounded-lg"
            >
              <span>{{ experience.urlText || 'Visitar sitio web' }}</span>
              <Icon name="mdi:open-in-new" class="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollTrigger ya está registrado por gsap.client.ts (plugin global)

const experiences = [
  {
    id: 1,
    title: "T.S.U en Informática",
    institution: "IUJO - Extensión Barquisimeto",
    icon: "mdi:school",
    description:
      "Formación académica de excelencia en una institución de la Compañía de Jesús, donde desarrollé una base sólida en ingeniería de software, algoritmos y arquitectura de sistemas. Esta educación me proporcionó las herramientas técnicas y el pensamiento analítico necesario para abordar desafíos complejos en el desarrollo de soluciones digitales.",
    period: "Formación Profesional",
    location: "Barquisimeto, Venezuela",
    url: "http://www.iujobarquisimeto.edu.ve",
    urlText: "Ver sitio web",
  },
  {
    id: 2,
    title: "Experiencia como Dev. Frontend",
    institution: "Ticktaps - Ticz",
    icon: "mdi:code-tags",
    description:
      "Experiencia como desarrollador frontend en esta destacada firma de software venezolana, enfocada en el desarrollo de aplicaciones web a medida y plataformas interactivas (como portales deportivos, sistemas de gestión escolar y soluciones corporativas). Mi rol se centró en construir interfaces web dinámicas, responsivas y optimizadas, colaborando en la creación de paneles de control web para la interacción y automatización con sistemas de hardware.",
    period: "Experiencia Profesional",
    location: "Barquisimeto, Venezuela",
    url: "https://ticktaps.com",
    urlText: "Visitar sitio web",
  },
  {
    id: 3,
    title: "Ingeniería de Agentes de IA",
    institution: "Formación Autodidacta",
    icon: "mdi:robot",
    description:
      "Especialización autónoma en el diseño, desarrollo e implementación de agentes de IA para la generación de código y automatización de software. Enfoque en la estructuración de flujos agenticos bajo estándares de calidad específicos, ingeniería de prompts avanzada y optimización del desarrollo asistido por modelos de lenguaje.",
    period: "Especialización Continua",
    location: "Remoto / Autodidacta",
  },
  {
    id: 4,
    title: "Especialización para Full Stack (NestJS)",
    institution: "Estudios Activos",
    icon: "mdi:database",
    description:
      "Actualmente enfocado en potenciar mi perfil backend mediante el estudio profundo de NestJS. Aprendiendo a diseñar arquitecturas modulares, APIs escalables con TypeScript, inyección de dependencias, seguridad avanzada y buenas prácticas en el ecosistema backend moderno.",
    period: "En Curso / Actualidad",
    location: "Remoto / Autodidacta",
  },
];

let ctx = null;

onMounted(() => {
  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray(".education-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 72%",
            scrub: 1,
          },
        }
      );
    });
  });
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});

const onMouseMove = (event) => {
  const card = event.currentTarget;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const xc = x / rect.width - 0.5;
  const yc = y / rect.height - 0.5;

  const maxTilt = 8;

  gsap.to(card, {
    rotateX: -yc * maxTilt,
    rotateY: xc * maxTilt,
    transformPerspective: 600,
    ease: "power1.out",
    duration: 0.3,
    overwrite: "auto",
  });
};

const onMouseEnter = (event) => {
  const card = event.currentTarget;

  if (card) {
    gsap.killTweensOf(card);
    gsap.to(card, {
      scale: 1.02,
      ease: "power2.out",
      duration: 0.3,
    });
  }
};

const onMouseLeave = (event) => {
  const card = event.currentTarget;

  if (card) {
    gsap.killTweensOf(card);
    gsap.to(card, {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.4,
      clearProps: "transform",
    });
  }
};
</script>
