<template>
  <section class="relative overflow-hidden h-full w-full px-5 pt-20">
    <div class="relative w-full h-full">
      <!-- Header Section -->
      <AnimatedElement variant="title" delay="300ms">
        <div class="mb-8 lg:mb-8">
          <SectionTitle
            domain="contact"
            badge="Contacto directo"
            title="Hablemos de tu"
            highlight="Proyecto"
            description="Estoy aquí para ayudarte a construir experiencias web excepcionales."
            align="center"
          />
        </div>
      </AnimatedElement>

      <!-- Bento Grid Layout -->
      <AnimatedElement variant="card" delay="400ms">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- ContactForm con FAQ integrado - Columna completa -->
          <div class="lg:col-span-12 order-1 lg:order-1">
            <ContactForm />
          </div>
        </div>
      </AnimatedElement>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from "../Common/SectionTitle.vue";
import ContactForm from "./ContactForm.vue";
import AnimatedElement from "../Common/AnimatedElement.vue";
</script>

<style scoped>
</style>
