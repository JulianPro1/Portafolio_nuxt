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

    <!-- Wave 1 animation -->
    <span
      :class="[
        'absolute left-0 bottom-[-120%] h-full w-full transition-all duration-700 ease-in-out group-hover/btn:bottom-[35%]',
        variantClasses[variant].span2
      ]"
      style="clip-path: polygon(0 45%, 12% 25%, 25% 48%, 38% 28%, 50% 50%, 63% 30%, 75% 52%, 88% 32%, 100% 46%, 100% 100%, 0 100%)"
    ></span>

    <!-- Wave 2 animation -->
    <span
      :class="[
        'absolute left-0 bottom-[-135%] h-full w-full transition-all duration-700 ease-in-out delay-75 group-hover/btn:bottom-[10%]',
        variantClasses[variant].span3
      ]"
      style="clip-path: polygon(0 55%, 12% 35%, 25% 58%, 38% 38%, 50% 60%, 63% 40%, 75% 62%, 88% 42%, 100% 56%, 100% 100%, 0 100%)"
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
    shadow: 'shadow-[0_0_18px_hsla(50,80%,48%,0.12)] hover:shadow-[0_0_28px_hsla(50,80%,48%,0.28)]',
    span1: 'bg-projects-accent-light',
    span2: 'bg-projects-accent-light/80',
    span3: 'bg-projects-accent-dark/95'
  },
  skills: {
    border: 'border-skills-accent hover:border-skills-accent-light',
    text: 'text-skills-accent-light',
    shadow: 'shadow-[0_0_18px_hsla(0,84%,50%,0.12)] hover:shadow-[0_0_28px_hsla(0,84%,50%,0.28)]',
    span1: 'bg-skills-accent-light',
    span2: 'bg-skills-accent',
    span3: 'bg-skills-accent-dark/95'
  },
  about: {
    border: 'border-about-accent hover:border-about-accent',
    text: 'text-about-accent-light',
    shadow: 'shadow-[0_0_18px_hsla(270,67%,45%,0.12)] hover:shadow-[0_0_28px_hsla(270,67%,45%,0.35)]',
    span1: 'bg-about-accent',
    span2: 'bg-about-accent-light',
    span3: 'bg-about-accent-dark/95'
  },
  contact: {
    border: 'border-contact-accent hover:border-contact-accent-light',
    text: 'text-contact-accent-light',
    shadow: 'shadow-[0_0_18px_hsla(160,90%,31%,0.12)] hover:shadow-[0_0_28px_hsla(160,90%,31%,0.28)]',
    span1: 'bg-contact-accent-light',
    span2: 'bg-contact-accent',
    span3: 'bg-contact-accent-dark/95'
  }
};
</script>
