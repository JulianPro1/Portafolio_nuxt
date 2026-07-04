<template>
  <NuxtLink
    :to="to"
    :class="[
      'group/btn relative items-center justify-center gap-2 overflow-hidden rounded-full border bg-transparent px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold transition-all duration-300 hover:text-global-bg',
      props.fullWidth ? 'flex w-full' : 'inline-flex',
      variantClasses[variant].border,
      variantClasses[variant].text,
      variantClasses[variant].shadow
    ]"
  >
    <!-- Background overlay on hover -->
    <span
      :class="[
        'absolute inset-x-0 bottom-0 h-0 transition-all duration-700 ease-in-out group-hover/btn:h-full',
        variantClasses[variant].span1
      ]"
    ></span>

  

    <!-- Button label and icon -->
    <span class="relative z-10">
      <slot />
    </span>
    <Icon
      name="mdi:arrow-right"
      class="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string;
  variant: 'projects' | 'skills' | 'about' | 'contact';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  fullWidth: false
});

const variantClasses = {
  projects: {
    border: 'border-projects-accent hover:border-projects-accent-light',
    text: 'text-projects-accent-light',
    shadow: 'shadow-[0_0_18px_hsla(225,75%,48%,0.12)] hover:shadow-[0_0_28px_hsla(225,75%,48%,0.28)]',
    span1: 'bg-projects-accent-light'
  },
  skills: {
    border: 'border-skills-accent hover:border-skills-accent-light',
    text: 'text-skills-accent-light',
    shadow: 'shadow-[0_0_18px_hsla(180,75%,42%,0.12)] hover:shadow-[0_0_28px_hsla(180,75%,42%,0.28)]',
    span1: 'bg-skills-accent-light'
  },
  about: {
    border: 'border-about-accent hover:border-about-accent',
    text: 'text-about-accent-light',
    shadow: 'shadow-[0_0_18px_hsla(270,67%,45%,0.12)] hover:shadow-[0_0_28px_hsla(270,67%,45%,0.35)]',
    span1: 'bg-about-accent'
  },
  contact: {
    border: 'border-contact-accent hover:border-contact-accent-light',
    text: 'text-contact-accent-light',
    shadow: 'shadow-[0_0_18px_hsla(160,90%,31%,0.12)] hover:shadow-[0_0_28px_hsla(160,90%,31%,0.28)]',
    span1: 'bg-contact-accent-light'
  }
};
</script>
