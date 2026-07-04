<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
    <!-- Card unificada: Formulario + Redes sociales -->
    <div class="lg:col-span-12">
      <div
        class="relative bg-gradient-to-br rounded-2xl border border-contact-accent-dark p-4 hover:border-contact-accent transition-all duration-500"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-contact-accent/10 to-about-highlight/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        ></div>
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Formulario -->
          <div ref="formContainer" class="lg:col-span-6 flex flex-col">
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-9 h-9 flex items-center justify-center rounded-xl bg-contact-accent/20 border border-contact-accent header-icon"
              >
                <Icon name="mdi:send" class="w-4 h-4 text-contact-accent" />
              </div>
              <h2 class="text-lg font-semibold text-white form-title">
                Envíame tu mensaje
              </h2>

              <!-- Iconos de redes sociales -->
              <div class="flex items-center gap-2 ml-auto social-links">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-contact-accent hover:bg-contact-accent/20 hover:border-contact-accent/50 transition-all duration-300 social-btn"
                >
                  <Icon name="mdi:github" class="text-lg" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-contact-accent hover:bg-contact-accent/20 hover:border-contact-accent/50 transition-all duration-300 social-btn"
                >
                  <Icon name="mdi:linkedin" class="text-lg" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-contact-accent hover:bg-contact-accent/20 hover:border-contact-accent/50 transition-all duration-300 social-btn"
                >
                  <Icon name="mdi:twitter" class="text-lg" />
                </a>
              </div>
            </div>
            <form @submit.prevent="handleSubmit" class="space-y-2">
              <!-- Grid para campos pequeños -->
              <div class="grid grid-cols-1 gap-2">
                <!-- Nombre -->
                <BaseInput
                  ref="firstNameInput"
                  v-model="form.firstName"
                  label="Nombre"
                  placeholder="Tu nombre"
                  :rules="[rules.required, rules.minLength(2)]"
                />

                <!-- Apellido -->
                <BaseInput
                  ref="lastNameInput"
                  v-model="form.lastName"
                  label="Apellido"
                  placeholder="Tu apellido"
                  :rules="[rules.required, rules.minLength(2)]"
                />

                <!-- Email -->
                <BaseInput
                  ref="emailInput"
                  v-model="form.email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  :rules="[rules.required, rules.email]"
                />

                <!-- Asunto -->
                <BaseInput
                  ref="subjectInput"
                  v-model="form.subject"
                  label="Asunto"
                  placeholder="¿Sobre qué es tu proyecto?"
                  :rules="[rules.required, rules.minLength(4)]"
                />
              </div>

              <!-- Mensaje -->
              <BaseTextarea
                ref="messageInput"
                v-model="form.message"
                label="Detalles del proyecto"
                rows="3"
                :emoji-picker="true"
                placeholder="Cuéntame sobre tu idea, objetivos y lo que tienes en mente..."
                :rules="[rules.required, rules.minLength(10)]"
              />

              <BaseGradientButton
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3 submit-btn group/btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon v-if="!isSubmitting" name="mdi:send" class="w-4 h-4 submit-icon transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                <Icon v-else name="mdi:loading" class="w-4 h-4 animate-spin" />
                <span class="font-bold">{{ isSubmitting ? "Enviando..." : "Enviar mensaje" }}</span>
              </BaseGradientButton>
            </form>

            <!-- Toast de éxito reutilizable -->
            <BaseToast v-model:show="showSuccess" />
          </div>

          <!-- FAQ componentizado -->
          <div class="lg:col-span-6 flex flex-col border-l border-white/10 pl-6">
            <h3 class="text-base font-semibold text-white mb-3">
              Preguntas Frecuentes
            </h3>
            <FaqCarousel />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import FaqCarousel from '~/components/Contact/FaqCarousel.vue';
import BaseInput from '~/components/Common/BaseInput.vue';
import BaseTextarea from '~/components/Common/BaseTextarea.vue';
import BaseToast from '~/components/Common/BaseToast.vue';
import BaseGradientButton from '~/components/Common/BaseGradientButton.vue';

const apiForm = "https://formspree.io/f/xyzrdzod";

// Referencias a los componentes para validación
const firstNameInput = ref<InstanceType<typeof BaseInput> | null>(null);
const lastNameInput = ref<InstanceType<typeof BaseInput> | null>(null);
const emailInput = ref<InstanceType<typeof BaseInput> | null>(null);
const subjectInput = ref<InstanceType<typeof BaseInput> | null>(null);
const messageInput = ref<InstanceType<typeof BaseTextarea> | null>(null);

// Reglas de validación
const rules = {
  required: (val: string) => !!val.trim() || 'Este campo es obligatorio',
  email: (val: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(val) || 'Introduce un correo electrónico válido';
  },
  minLength: (min: number) => (val: string) => val.trim().length >= min || `Debe tener al menos ${min} caracteres`,
};

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const isMounted = ref(false);
const formContainer = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  isMounted.value = true;
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });
    
    // Configuración inicial (evita flash de contenido no animado)
    gsap.set(['.header-icon', '.form-title', '.social-btn', '.form-field', '.submit-btn'], {
      opacity: 0
    });

    tl.fromTo('.header-icon', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 })
      .fromTo('.form-title', { x: -20, opacity: 0 }, { x: 0, opacity: 1 }, '<0.1')
      .fromTo('.social-btn', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08 }, '<0.15')
      .fromTo('.form-field', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06 }, '<0.15')
      .fromTo('.submit-btn', { y: 15, opacity: 0 }, { y: 0, opacity: 1 }, '<0.2');
  }, formContainer.value || undefined);
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});

const handleSubmit = async () => {
  // Validar todos los campos antes de ejecutar la animación
  const isValid = [
    firstNameInput.value?.validate(),
    lastNameInput.value?.validate(),
    emailInput.value?.validate(),
    subjectInput.value?.validate(),
    messageInput.value?.validate()
  ].every(result => result === true);

  if (!isValid) {
    return;
  }

  try {
    // Animación de vuelo del avión de papel (icono)
    const icon = formContainer.value?.querySelector('.submit-icon');
    if (icon) {
      await new Promise<void>((resolve) => {
        gsap.to(icon, {
          x: 25,
          y: -25,
          opacity: 0,
          scale: 0.5,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => resolve()
        });
      });
    }

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

    // Limpiar validaciones
    firstNameInput.value?.resetValidation();
    lastNameInput.value?.resetValidation();
    emailInput.value?.resetValidation();
    subjectInput.value?.resetValidation();
    messageInput.value?.resetValidation();

    showSuccess.value = true;
  } catch (error) {
    console.error(error);
    alert(
      "Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo."
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
</style>
