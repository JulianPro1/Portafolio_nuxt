<template>
  <section ref="orchestratorRef" class="relative overflow-hidden h-full w-full px-5 pt-20 pb-10">
    <div class="relative w-full h-full max-w-5xl mx-auto">
      <!-- Header Section -->
      <div class="header-section opacity-0 mb-8">
        <SectionTitle
          domain="contact"
          :badge="contactIndex.badge"
          :title="contactIndex.title"
          :highlight="contactIndex.highlight"
          :description="contactIndex.description"
          align="center"
        />
      </div>

      <!-- Tarjetas de Acción Rápida (WhatsApp & Email) -->
      <div class="quick-actions-section opacity-0">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ContactQuickAction
            v-for="(action, index) in contactIndex.quickActions"
            :key="index"
            :href="action.href"
            :icon="action.icon"
            :title="action.title"
            :description="action.description"
            :external="action.external"
          />
        </div>
      </div>

      <!-- Bento Grid Layout: Formulario + FAQs -->
      <div class="form-section opacity-0 mb-12">
        <ContactForm
          :is-submitting="isSubmitting"
          :show-success="showSuccess"
          :faqs="faqs"
          @submit="handleFormSubmit"
        />
      </div>

      <!-- Sección de Educación / Trayectoria -->
      <div class="education-section opacity-0 border-t border-white/5 pt-10">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-white mb-2">{{ contactIndex.educationTitle }}</h2>
          <p class="text-sm text-gray-400">{{ contactIndex.educationDescription }}</p>
        </div>
        <ContactEducation :experiences="experiences" />
      </div>
    </div>

    <!-- Floating Tip Bubble -->
    <FloatingTip
      v-if="showFloatingTip"
      v-model:open="isTipOpen"
      :message="contactIndex.floatingTip"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import SectionTitle from "../Common/SectionTitle.vue";
import ContactForm from "./ContactForm.vue";
import ContactEducation from "./ContactEducation.vue";
import ContactQuickAction from "./ContactQuickAction.vue";
import FloatingTip from "../Common/FloatingTip.vue";

const { data: contactData } = await useAsyncData('contact-index', () => queryCollection('contactIndex').first());
const { data: contactEdu } = await useAsyncData('contact-education', () => queryCollection('contactEducation').first());
const { data: contactFaq } = await useAsyncData('contact-faqs', () => queryCollection('contactFaqs').first());

const contactIndex = computed(() => contactData.value || {
  badge: "Contacto directo",
  title: "Hablemos de tu",
  highlight: "Proyecto",
  description: "Estoy aquí para ayudarte a construir experiencias web excepcionales.",
  quickActions: [],
  educationTitle: "Formación y Trayectoria",
  educationDescription: "Conoce más sobre mi preparación académica y mi experiencia en el sector tecnológico.",
  floatingTip: "Sigue scrolleando para conocer mi formación como desarrollador."
});

const experiences = computed(() => contactEdu.value?.experiences || []);
const faqs = computed(() => contactFaq.value?.faqs || []);

const showFloatingTip = ref(false);
const orchestratorRef = ref(null);
const isTipOpen = ref(false);
const hasScrolledToEducation = ref(false);
const apiForm = "https://formspree.io/f/xyzrdzod";
const isSubmitting = ref(false);
const showSuccess = ref(false);
let ctx = null;
let observer = null;

onMounted(() => {
  const educationEl = orchestratorRef.value?.querySelector(".education-section");
  
  // Check if education section is already visible on mount (e.g., page reload)
  if (educationEl) {
    const rect = educationEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      hasScrolledToEducation.value = true;
    }
  }

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.7 }
    });
    
    tl.fromTo(".header-section", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1 }
    )
    .fromTo(".quick-actions-section", 
      { scale: 0.97, y: 15, opacity: 0 }, 
      { scale: 1, y: 0, opacity: 1 }, 
      "-=0.45"
    )
    .fromTo(".form-section", 
      { scale: 0.98, y: 15, opacity: 0 }, 
      { scale: 1, y: 0, opacity: 1 }, 
      "-=0.45"
    )
    .fromTo(".education-section", 
      { y: 25, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      "-=0.45"
    )
    .add(() => {
      showFloatingTip.value = true;
      // Abrir el globo de texto casi en paralelo con la entrada del botón flotante
      setTimeout(() => {
        if (!hasScrolledToEducation.value) {
          isTipOpen.value = true;
        }
      }, 200);
    }, "-=0.3");
  }, orchestratorRef.value);

  // Close floating tip when education section is scrolled into view
  if (educationEl) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasScrolledToEducation.value = true;
            isTipOpen.value = false;
          }
        });
      },
      {
        threshold: 0.15,
      }
    );
    observer.observe(educationEl);
  }
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
  if (observer) {
    observer.disconnect();
  }
});

const handleFormSubmit = async (formData) => {
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
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el formulario");
    }

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
</script>

<style scoped>
</style>
