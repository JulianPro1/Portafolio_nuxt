<template>
  <div class="form-field flex flex-col">
    <label
      v-if="label"
      :for="inputId"
      class="block text-xs font-medium text-white mb-1.5"
    >
      {{ label }}
    </label>
    
    <input
      :id="inputId"
      :type="type"
      v-model="model"
      v-bind="$attrs"
      @blur="onBlur"
      :class="[
        'w-full px-3 py-2 bg-contact-accent-dark/30 border rounded-lg text-dark font-sans antialiased placeholder-gray-500/80 focus:outline-none focus:ring-1 focus:bg-contact-accent-dark/60 transition-all duration-300 text-sm',
        error 
          ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' 
          : 'border-contact-accent-dark/80 focus:border-contact-accent focus:ring-contact-accent/20'
      ]"
    />

    <!-- Contenedor animable para el error que evita layout shift -->
    <div
      class="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out text-left"
      :class="error ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <p class="text-[11px] text-red-400 mt-1 leading-none">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useId } from 'vue';

defineOptions({
  inheritAttrs: false
});

type Rule = (value: string) => boolean | string;

const props = withDefaults(
  defineProps<{
    label?: string;
    type?: string;
    rules?: Rule[];
    id?: string;
  }>(),
  {
    type: 'text',
    rules: () => [],
  }
);

const model = defineModel<string>({ default: '' });
const error = ref<string>('');
const isTouched = ref(false);
const inputId = props.id || useId();

const validate = (): boolean => {
  if (!props.rules || props.rules.length === 0) {
    error.value = '';
    return true;
  }

  for (const rule of props.rules) {
    const result = rule(model.value);
    if (typeof result === 'string') {
      error.value = result;
      return false;
    }
  }

  error.value = '';
  return true;
};

const resetValidation = () => {
  error.value = '';
  isTouched.value = false;
};

// Validar al cambiar el valor si ya ha sido tocado
watch(model, () => {
  if (isTouched.value) {
    validate();
  }
});

const onBlur = () => {
  isTouched.value = true;
  validate();
};

defineExpose({
  validate,
  resetValidation,
  error,
  isValid: () => !error.value
});
</script>
