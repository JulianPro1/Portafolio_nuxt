<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
    <!-- Card unificada: Formulario + Redes sociales -->
    <div class="lg:col-span-12">
      <div
        class="relative bg-gradient-to-br rounded-2xl border border-contact-accent-dark/80 p-4 hover:border-contact-accent/50 transition-all duration-500"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-contact-accent/10 to-about-highlight/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        ></div>
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Formulario -->
          <div class="lg:col-span-6 flex flex-col">
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-xl bg-contact-accent/20 border border-contact-accent/50"
              >
                <Icon name="mdi:send" class="w-4 h-4 text-contact-accent" />
              </div>
              <h2 class="text-lg font-semibold text-white">
                Envíame tu mensaje
              </h2>

              <!-- Iconos de redes sociales -->
              <div class="flex items-center gap-2 ml-auto">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-contact-accent hover:bg-contact-accent/20 hover:border-contact-accent/50 transition-all duration-300"
                >
                  <Icon name="mdi:github" class="text-lg" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-contact-accent hover:bg-contact-accent/20 hover:border-contact-accent/50 transition-all duration-300"
                >
                  <Icon name="mdi:linkedin" class="text-lg" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-contact-accent hover:bg-contact-accent/20 hover:border-contact-accent/50 transition-all duration-300"
                >
                  <Icon name="mdi:twitter" class="text-lg" />
                </a>
              </div>
            </div>
            <form @submit.prevent="handleSubmit" class="space-y-2">
              <!-- Grid para campos pequeños -->
              <div class="grid grid-cols-1 gap-2">
                <!-- Nombre -->
                <div>
                  <label class="block text-xs font-medium text-white mb-1.5">
                    Nombre
                  </label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-3 py-2 bg-contact-accent-dark/50 border border-contact-accent-dark/80 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-contact-accent focus:ring-1 focus:ring-contact-accent/20 transition-colors duration-300 text-sm"
                    placeholder="Tu nombre"
                  />
                </div>

                <!-- Apellido -->
                <div>
                  <label class="block text-xs font-medium text-white mb-1">
                    Apellido
                  </label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-3 py-2 bg-contact-accent-dark/50 border border-contact-accent-dark/80 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-contact-accent focus:ring-1 focus:ring-contact-accent/20 transition-colors duration-300 text-sm"
                    placeholder="Tu apellido"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-xs font-medium text-white mb-1">
                    Correo electrónico
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 bg-contact-accent-dark/50 border border-contact-accent-dark/80 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-contact-accent focus:ring-1 focus:ring-contact-accent/20 transition-colors duration-300 text-sm"
                    placeholder="tu@email.com"
                  />
                </div>

                <!-- Asunto -->
                <div>
                  <label class="block text-xs font-medium text-white mb-1">
                    Asunto
                  </label>
                  <input
                    v-model="form.subject"
                    type="text"
                    required
                    class="w-full px-3 py-2 bg-contact-accent-dark/50 border border-contact-accent-dark/80 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-contact-accent focus:ring-1 focus:ring-contact-accent/20 transition-colors duration-300 text-sm"
                    placeholder="¿Sobre qué es tu proyecto?"
                  />
                </div>
              </div>

              <!-- Mensaje -->
              <div>
                <label class="block text-xs font-medium text-white mb-1">
                  Detalles del proyecto
                </label>
                <textarea
                  v-model="form.message"
                  required
                  rows="3"
                  class="w-full px-3 py-2 bg-contact-accent-dark/50 border border-contact-accent-dark/80 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-contact-accent focus:ring-1 focus:ring-contact-accent/20 transition-colors duration-300 resize-none text-sm"
                  placeholder="Cuéntame sobre tu idea, objetivos y lo que tienes en mente..."
                ></textarea>
              </div>

              <!-- Botón enviar -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-2.5 px-6 bg-gradient-to-r from-contact-accent to-about-highlight text-white font-semibold rounded-lg hover:shadow-[0_4px_20px_hsla(160,90%,31%,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                <Icon v-if="!isSubmitting" name="mdi:send" class="w-4 h-4" />
                <Icon v-else name="mdi:loading" class="w-4 h-4 animate-spin" />
                {{ isSubmitting ? "Enviando..." : "Enviar mensaje" }}
              </button>
            </form>

            <!-- Mensaje de éxito -->
            <div
              v-if="showSuccess"
              class="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-xs"
            >
              ✅ Mensaje enviado correctamente. Te responderé lo antes posible.
            </div>
          </div>

          <!-- FAQ con Flash Cards -->
          <div class="lg:col-span-6 flex flex-col border-l border-white/10 pl-6">
            <h3 class="text-base font-semibold text-white mb-3">
              Preguntas Frecuentes
            </h3>
            <div class="relative flex-1 flex flex-col gap-3">
              <!-- BaseCarousel maneja swipe touch nativo + autoplay -->
              <div class="flex-1 min-h-[12rem]">
                <BaseCarousel
                  ref="faqCarouselRef"
                  :slide-count="faqs.length"
                  :autoplay="true"
                  :autoplay-delay="4000"
                  :autoplay-pause-on-hover="true"
                  :loop="true"
                  :speed="400"
                  @slide-change="onFaqSlideChange"
                >
                  <template #slide="{ index }">
                    <!-- Flash Card con efecto flip — sin cambios -->
                    <div class="relative w-full h-full min-h-[12rem] perspective-1000 px-1">
                      <div
                        class="relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer"
                        :class="{ 'rotate-y-180': isFlipped[index] }"
                        @mouseenter="isFlipped[index] = true"
                        @mouseleave="isFlipped[index] = false"
                        @touchstart="isFlipped[index] = !isFlipped[index]"
                      >
                        <!-- Frente: Pregunta -->
                        <div
                          class="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-contact-accent-dark/80 p-4 flex flex-col items-center justify-center text-center hover:border-contact-accent/50 transition-all duration-300"
                          :class="faqActiveIndex === index ? 'bg-contact-accent/20' : 'bg-white/5'"
                        >
                          <div
                            class="w-10 h-10 flex items-center justify-center rounded-xl mb-3 transition-all duration-300"
                            :class="faqActiveIndex === index ? 'bg-contact-accent/30 border border-contact-accent/60' : 'bg-contact-accent/10 border border-contact-accent/30'"
                          >
                            <Icon
                              name="mdi:help"
                              class="w-5 h-5 transition-colors duration-300"
                              :class="faqActiveIndex === index ? 'text-contact-accent' : 'text-contact-accent/70'"
                            />
                          </div>
                          <h4 class="font-medium text-lg leading-tight text-white">
                            {{ faqs[index]!.question }}
                          </h4>
                          <span class="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                            <Icon name="mdi:gesture-swipe-horizontal" class="w-3 h-3" />
                            Desliza · Toca para voltear
                          </span>
                        </div>

                        <!-- Reverso: Respuesta -->
                        <div
                          class="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl border border-contact-accent/50 bg-gradient-to-br from-contact-accent/20 to-about-highlight/20 p-4 flex flex-col items-center justify-center text-center"
                        >
                          <p class="text-[11px] leading-relaxed text-gray-200">
                            {{ faqs[index]!.answer }}
                          </p>
                          <span class="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                            <Icon name="mdi:gesture-swipe-horizontal" class="w-3 h-3" />
                            Desliza · Toca para volver
                          </span>
                        </div>
                      </div>
                    </div>
                  </template>
                </BaseCarousel>
              </div>

              <!-- Controles: flechas + dots -->
              <div class="flex items-center justify-center gap-2">
                <button
                  @click="faqCarouselRef?.prev()"
                  class="w-7 h-7 flex items-center justify-center rounded-full bg-contact-accent/20 border border-contact-accent/50 text-contact-accent hover:bg-contact-accent/30 hover:border-contact-accent transition-all duration-300"
                >
                  <Icon name="mdi:chevron-left" class="w-3.5 h-3.5" />
                </button>

                <div class="flex gap-1">
                  <button
                    v-for="(_, index) in faqs"
                    :key="index"
                    @click="faqCarouselRef?.goTo(index)"
                    class="h-1.5 rounded-full transition-all duration-300"
                    :class="faqActiveIndex === index ? 'bg-contact-accent w-4' : 'bg-contact-accent/30 w-1.5'"
                  />
                </div>

                <button
                  @click="faqCarouselRef?.next()"
                  class="w-7 h-7 flex items-center justify-center rounded-full bg-contact-accent/20 border border-contact-accent/50 text-contact-accent hover:bg-contact-accent/30 hover:border-contact-accent transition-all duration-300"
                >
                  <Icon name="mdi:chevron-right" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseCarousel from '~/components/Common/BaseCarousel.vue';

const apiForm = "https://formspree.io/f/xyzrdzod";

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    showSuccess.value = false;

    const response = await fetch(apiForm, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: `${form.value.firstName} ${form.value.lastName}`,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el formulario");
    }

    // Resetear formulario
    form.value = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    };

    showSuccess.value = true;

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error(error);
    alert(
      "Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo."
    );
  } finally {
    isSubmitting.value = false;
  }
};

// FAQ Carousel Logic — estado simplificado (Swiper maneja el resto)
const faqCarouselRef = ref<InstanceType<typeof BaseCarousel> | null>(null);
const faqActiveIndex = ref(0);
const isFlipped = ref<boolean[]>(Array(6).fill(false));

const onFaqSlideChange = (index: number) => {
  faqActiveIndex.value = index;
  // Resetear el flip al cambiar de slide
  isFlipped.value = Array(6).fill(false);
};

const faqs = [
  {
    question: "¿Cuál es tu tiempo de respuesta habitual?",
    answer:
      "Me comprometo a responder todos los mensajes en menos de 24 horas hábiles. Para consultas urgentes, suelen recibir respuesta el mismo día. Entiendo que tu tiempo es valioso y valoro cada oportunidad de colaboración.",
  },
  {
    question: "¿Trabajas con proyectos de cualquier tamaño?",
    answer:
      "Sí, adapto mi metodología según el alcance del proyecto. Desde landing pages hasta aplicaciones web complejas. Cada proyecto recibe la misma dedicación y atención al detalle, independientemente de su tamaño.",
  },
  {
    question: "¿Ofreces mantenimiento después del lanzamiento?",
    answer:
      "Absolutamente. Ofrezco paquetes de mantenimiento mensual que incluyen actualizaciones, seguridad, optimización de rendimiento y soporte técnico. Tu aplicación necesita evolucionar y yo estaré ahí para asegurar que siempre funcione perfectamente.",
  },
  {
    question: "¿Cómo garantizas la calidad del código?",
    answer:
      "Utilizo testing automatizado (unit, integration y E2E), code reviews, seguimiento de estándares de industria y herramientas de análisis estático. Además, proporciono documentación clara y código auto-documentado para facilitar futuros mantenimientos.",
  },
  {
    question: "¿Qué metodología de desarrollo utilizas?",
    answer:
      "Combino metodologías ágiles con entregas incrementales. Mantengo comunicación constante contigo para asegurar que el producto final cumpla exactamente con tus expectativas. Transparencia y colaboración son mis pilares.",
  },
  {
    question: "¿Puedo ver ejemplos de trabajos similares?",
    answer:
      "Claro que sí. En mi portafolio encontrarás proyectos reales con código abierto en GitHub. Además, durante nuestra llamada inicial puedo mostrarte casos de estudio específicos relacionados con tu industria o tipo de proyecto.",
  },
];


</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.flash-card-inner:hover {
  transform: rotateY(180deg);
}
</style>
