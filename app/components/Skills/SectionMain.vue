<template>
  <section class="py-20 px-4 relative overflow-hidden bg-black">

    <div class="relative max-w-7xl mx-auto">
      <!-- Header -->
      <AnimatedElement variant="title" delay="300ms">
        <SectionTitle
          domain="skills"
          badge="Fundamentos técnicos"
          title="Mis"
          highlight="Habilidades"
          description="Los fundamentos teóricos y técnicos que definen mi enfoque como desarrollador frontend moderno."
        />
      </AnimatedElement>

      <!-- Grid de Categorías y Habilidades (Bento Grid) -->
      <div class="mt-16 space-y-16">
        <!-- Loop por cada categoría principal -->
        <div
          v-for="category in categories"
          :key="category.name"
          class="space-y-6"
        >
          <!-- Título de Categoría -->
          <AnimatedElement variant="card" delay="350ms">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-skills-accent/20 to-skills-accent-light/20 border border-skills-accent text-skills-accent"
              >
                <Icon :name="category.icon" class="w-6 h-6" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white tracking-wide">
                  {{ category.name }}
                </h2>
                <p class="text-gray-400 text-sm">
                  {{ category.description }}
                </p>
              </div>
            </div>
          </AnimatedElement>

          <!-- Tarjetas de Habilidades (Bento Layout) -->
          <AnimatedElement variant="card" delay="400ms">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard
                v-for="skill in category.items"
                :key="skill.id"
                :skill="skill"
                :is-highlighted="skill.highlight"
                @select="openSkillModal"
              />
            </div>
          </AnimatedElement>
        </div>

        <!-- Principios Fundamentales -->
        <div class="space-y-6 pt-8">
          <AnimatedElement variant="card" delay="450ms">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 flex items-center justify-center rounded-xl border border-skills-accent text-skills-accent"
              >
                <Icon name="mdi:lightbulb" class="w-6 h-6" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white tracking-wide">
                  Principios Fundamentales
                </h2>
                <p class="text-gray-400 text-sm">
                  Los pilares éticos y de diseño que guían mi desarrollo
                </p>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement variant="card" delay="500ms">
            <PrinciplesGroup />
          </AnimatedElement>
        </div>
      </div>
    </div>

    <!-- Modal Interactivo de Detalle -->
    <BaseModal :is-open="isModalOpen" @close="closeSkillModal">
      <div v-if="selectedSkill" class="space-y-5">
        <div class="flex items-center gap-4 border-b border-white/10 pb-4">
          <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-skills-accent/10 border border-skills-accent text-skills-accent">
            <Icon :name="selectedSkill.icon" class="w-6 h-6" />
          </div>
          <div>
            <span class="text-xs uppercase font-semibold tracking-wider text-skills-accent-light">
              {{ selectedSkill.category }}
            </span>
            <h3 class="text-xl font-bold text-white">{{ selectedSkill.title }}</h3>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Descripción General</h4>
            <p class="text-gray-200 text-sm leading-relaxed">
              {{ selectedSkill.description }}
            </p>
          </div>

          <div class="bg-black/35 rounded-xl border border-white/5 p-4 space-y-2">
            <h4 class="text-xs font-semibold text-skills-accent-light uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="mdi:application-cog" class="w-4 h-4" />
              Aplicación en este Portafolio
            </h4>
            <p class="text-gray-300 text-xs leading-relaxed">
              {{ selectedSkill.practicalCase }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2 pt-2">
            <span
              v-for="tag in selectedSkill.tags"
              :key="tag"
              class="px-2.5 py-1 rounded-full text-xs border border-skills-accent text-skills-accent-light bg-skills-accent/5"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-white/10">
          <BaseGradientButton
            text="Entendido"
            @click="closeSkillModal"
          />
        </div>
      </div>
    </BaseModal>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AnimatedElement from '@/components/Common/AnimatedElement.vue'
import SectionTitle from '@/components/Common/SectionTitle.vue'
import BaseModal from '@/components/Common/BaseModal.vue'
import BaseGradientButton from '@/components/Common/BaseGradientButton.vue'
import SkillCard from '@/components/Skills/SkillCard.vue'
import PrinciplesGroup from '@/components/Skills/PrinciplesGroup.vue'
import type { Skill } from '@/types'

interface DetailedSkillCategory {
  name: string
  description: string
  icon: string
  items: Skill[]
}

const { data: skillsDoc } = await useAsyncData('skills', () => queryCollection('skills').first())

const selectedSkill = ref<Skill | null>(null)
const isModalOpen = ref(false)

const openSkillModal = (skill: Skill) => {
  selectedSkill.value = skill
  isModalOpen.value = true
}

const closeSkillModal = () => {
  isModalOpen.value = false
}

// Data-driven categories configuration
const categories = computed(() => ((skillsDoc.value as any)?.categories || []) as DetailedSkillCategory[])
</script>
