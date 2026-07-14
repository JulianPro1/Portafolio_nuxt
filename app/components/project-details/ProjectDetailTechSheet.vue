<template>
  <div class=" rounded-3xl p-6 space-y-6 border border-white/15 bg-neutral-950">
    <h3 class="text-lg font-bold text-white border-b border-gray-800 pb-3">
      Detalles del Proyecto
    </h3>
    
    <div class="space-y-4">
      <!-- Categoría -->
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center gap-2.5 text-global-text-muted text-sm font-light">
          <Icon name="mdi:tag" class="w-4.5 h-4.5 text-projects-accent" />
          <span>Categoría</span>
        </div>
        <span class="text-global-text text-sm font-medium">{{ category }}</span>
      </div>

      <!-- Duración -->
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center gap-2.5 text-global-text-muted text-sm font-light">
          <Icon name="mdi:clock-time-eight" class="w-4.5 h-4.5 text-projects-accent-light" />
          <span>Duración</span>
        </div>
        <span class="text-global-text text-sm font-medium">{{ duration }}</span>
      </div>

      <!-- Colaboradores -->
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center gap-2.5 text-global-text-muted text-sm font-light">
          <Icon name="mdi:account-group" class="w-4.5 h-4.5 text-projects-accent" />
          <span>Colaboradores</span>
        </div>
        <span class="text-global-text text-sm font-medium">
          {{ collaborators }} {{ collaborators === 1 ? 'persona' : 'personas' }}
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  collaborators: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const getStatusText = (status) => {
  const texts = {
    production: "En producción",
    development: "En desarrollo",
    personal: "Proyecto personal",
  };
  return texts[status] || "En desarrollo";
};
</script>

<style scoped>

</style>
