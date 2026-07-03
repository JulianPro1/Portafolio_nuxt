<template>
  <div
    ref="cardRef"
    class="w-full font-mono text-xs rounded-xl border border-white/[0.08] bg-gradient-to-br from-about-base/95 to-about-accent-dark/20 p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
  >
    <!-- Header -->
    <div ref="headerRef" class="flex items-center justify-between pb-3 mb-4 border-b border-white/5 select-none">
      <span class="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Quality Assurance Dashboard</span>
      <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse"></span>
    </div>

    <!-- Metric rows -->
    <div class="space-y-4">
      <div ref="row0" class="flex justify-between items-center text-[10px]">
        <span ref="label0" class="reveal-text text-gray-400">Clean Code Rating:</span>
        <span ref="badge0" class="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow-[0_0_6px_rgba(16,185,129,0.15)] inline-block overflow-hidden">A+ Excellent</span>
      </div>

      <div ref="row1" class="flex justify-between items-center text-[10px]">
        <span ref="label1" class="reveal-text text-gray-400">Core Web Vitals:</span>
        <span ref="badge1" class="text-about-pink font-bold bg-about-pink/10 px-2 py-0.5 rounded">
          <span ref="vitalsNum">0</span> / <span ref="vitalsNum2">0</span> Mobile &amp; Desktop
        </span>
      </div>

      <div ref="row2" class="flex justify-between items-center text-[10px]">
        <span ref="label2" class="reveal-text text-gray-400">ESLint / Prettier:</span>
        <span ref="badge2" class="text-emerald-400 font-semibold flex items-center gap-1">
          <span ref="checkMark" class="inline-block">✔</span>
          <span ref="errorsNum">0</span> Errors &amp; Warnings
        </span>
      </div>

      <div ref="row3" class="border-t border-white/5 pt-3.5 flex justify-between items-center text-[9px]">
        <span ref="label3" class="reveal-text text-gray-500">Unit Tests Suite:</span>
        <span ref="badge3" class="text-about-fuchsia font-bold">
          PASS (<span ref="assertionsNum">0</span> assertions)
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{ isActive: boolean }>();

const cardRef       = ref<HTMLElement | null>(null);
const headerRef     = ref<HTMLElement | null>(null);
const row0          = ref<HTMLElement | null>(null);
const row1          = ref<HTMLElement | null>(null);
const row2          = ref<HTMLElement | null>(null);
const row3          = ref<HTMLElement | null>(null);
const label0        = ref<HTMLElement | null>(null);
const label1        = ref<HTMLElement | null>(null);
const label2        = ref<HTMLElement | null>(null);
const label3        = ref<HTMLElement | null>(null);
const badge0        = ref<HTMLElement | null>(null);
const badge1        = ref<HTMLElement | null>(null);
const badge2        = ref<HTMLElement | null>(null);
const badge3        = ref<HTMLElement | null>(null);
const vitalsNum     = ref<HTMLElement | null>(null);
const vitalsNum2    = ref<HTMLElement | null>(null);
const errorsNum     = ref<HTMLElement | null>(null);
const assertionsNum = ref<HTMLElement | null>(null);
const checkMark     = ref<HTMLElement | null>(null);

let animated = false;
let cycleInterval: ReturnType<typeof setInterval> | null = null;

const badge0Texts = [
  'A+ Excellent',
  '0 Warnings',
  '100% Coverage',
  'Zero Tech Debt',
  'SOLID Principles',
];

// Counts an element's text from 0 to target
function animateCounter(el: HTMLElement | null, target: number, duration: number, delay: number) {
  if (!el) return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    delay,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = String(Math.round(obj.val));
    },
  });
}

function runAnimation() {
  if (animated) return;
  animated = true;

  const rows   = [row0.value, row1.value, row2.value, row3.value];
  const labels = [label0.value, label1.value, label2.value, label3.value];
  const badges = [badge0.value, badge1.value, badge2.value, badge3.value];

  // ── Initial states ──────────────────────────────────────────────────────────
  gsap.set(cardRef.value,   { opacity: 0, y: 16 });
  gsap.set(headerRef.value, { opacity: 0, x: -10 });
  gsap.set(rows,   { opacity: 0, y: 12 });
  gsap.set(badges, { opacity: 0, scale: 0.8, x: 6 });

  // Clip-path reveal: text slides in from the bottom of its own bounding box
  gsap.set(labels, { clipPath: 'inset(0 0 100% 0)', opacity: 1 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1 · Card slides in
  tl.to(cardRef.value,   { opacity: 1, y: 0, duration: 0.35 })

  // 2 · Header sweeps in from left
    .to(headerRef.value, { opacity: 1, x: 0, duration: 0.25 }, '-=0.15')

  // 3 · Rows stagger up quickly
    .to(rows, { opacity: 1, y: 0, duration: 0.28, stagger: 0.07 }, '-=0.1')

  // 4 · Labels clip-path reveal (fast wipe-up, one after another)
    .to(labels, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.22,
      stagger: 0.07,
      ease: 'power2.out',
    }, '-=0.3')

  // 5 · Badges slide + scale in with a spring
    .to(badges, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.35,
      stagger: 0.08,
      ease: 'back.out(1.6)',
    }, '-=0.4');

  // Start cycling badge0 text after initial animation settles
  tl.call(() => startBadgeCycle(), [], '+=0.4');

  // ── Number counters (start as rows become visible) ──────────────────────────
  const baseDelay = 0.55; // roughly when rows finish appearing
  animateCounter(vitalsNum.value,     100, 1.5, baseDelay);
  animateCounter(vitalsNum2.value,    100, 1.5, baseDelay + 0.08);
  animateCounter(errorsNum.value,       0, 0.0, baseDelay + 0.16); // stays 0, still triggers
  animateCounter(assertionsNum.value,  36, 1.4, baseDelay + 0.24);

  // Checkmark pops in
  gsap.set(checkMark.value, { scale: 0, opacity: 0 });
  gsap.to(checkMark.value, {
    scale: 1,
    opacity: 1,
    duration: 0.35,
    delay: baseDelay + 0.18,
    ease: 'back.out(2)',
  });
}

function startBadgeCycle() {
  if (!badge0.value) return;
  let idx = 0;

  cycleInterval = setInterval(() => {
    const el = badge0.value;
    if (!el) return;

    idx = (idx + 1) % badge0Texts.length;
    const next = badge0Texts[idx];

    gsap.timeline()
      .to(el, { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in' })
      .call(() => { el.textContent = next ?? null; })
      .to(el, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
  }, 2000);
}

watch(
  () => props.isActive,
  (active) => { if (active) runAnimation(); },
  { immediate: true },
);

onUnmounted(() => {
  if (cycleInterval) clearInterval(cycleInterval);
});
</script>
