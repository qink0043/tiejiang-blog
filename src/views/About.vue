<template>
  <div class="px-6 lg:px-12 pt-40 pb-40 min-h-screen">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      <div class="lg:col-span-4 space-y-12 animate-reveal">
        <div class="relative group">
          <div
            class="absolute -inset-2 border-2 border-accent opacity-20 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 translate-y-4"
          ></div>
          <div
            class="relative border-4 border-primary-950 dark:border-white aspect-square overflow-hidden bg-primary-100 dark:bg-primary-900"
          >
            <img
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800"
              alt="FORGE"
              class="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>

        <div class="space-y-4">
          <div
            class="text-[10px] font-black tracking-[0.5em] text-accent uppercase"
          >
            ID_IDENTIFIER
          </div>
          <h1 class="text-6xl font-black italic uppercase leading-none">
            THE_FORGE.
          </h1>
          <p class="font-mono text-xs text-primary-400">
            LOC: 127.0.0.1 | STATUS: ONLINE
          </p>
        </div>
      </div>

      <div class="lg:col-span-8 space-y-24">
        <section class="max-w-2xl space-y-8 animate-content-fade">
          <h2
            class="text-2xl font-black uppercase italic border-b-2 border-primary-950 dark:border-white pb-2 inline-block"
          >
            Persona_Init.
          </h2>
          <p
            class="text-xl font-medium leading-relaxed italic text-primary-800 dark:text-primary-200"
          >
            占位文字
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div v-for="item in stack" :key="item.name" class="space-y-3">
              <div class="flex items-center gap-3">
                <component :is="item.icon" class="w-5 h-5 text-accent" />
                <span class="text-sm font-black uppercase tracking-tighter">
                  {{ item.name }}
                </span>
              </div>
              <p class="text-xs text-primary-400 font-mono">{{ item.desc }}</p>
              <div class="h-1 bg-primary-100 dark:bg-primary-800 relative">
                <div
                  class="absolute inset-y-0 left-0 bg-accent"
                  :style="{ width: item.level }"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Principles: Asymmetric List -->
        <section
          class="space-y-12 animate-content-fade"
          style="animation-delay: 200ms"
        >
          <h2
            class="text-2xl font-black uppercase italic border-b-2 border-primary-950 dark:border-white pb-2 inline-block"
          >
            Operation_Manual.
          </h2>
          <div
            class="space-y-12 pl-12 border-l border-primary-100 dark:border-primary-800"
          >
            <div
              v-for="rule in principles"
              :key="rule.id"
              class="relative group"
            >
              <div
                class="absolute -left-[61px] top-0 text-[10px] font-mono font-black text-accent bg-[var(--bg-main)] py-1"
              >
                {{ rule.id }}
              </div>
              <h3
                class="text-lg font-black uppercase tracking-widest mb-2 group-hover:text-accent transition-colors"
              >
                {{ rule.title }}
              </h3>
              <p
                class="text-sm text-primary-600 dark:text-primary-400 leading-relaxed max-w-xl"
              >
                {{ rule.content }}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CodeBracketIcon,
  ServerIcon,
  CpuChipIcon,
  CommandLineIcon,
} from '@heroicons/vue/24/outline'

const stack = [
  {
    name: 'Frontend / Node.js',
    level: '90%',
    desc: 'Vue 3 / React / Infrastructure',
    icon: CodeBracketIcon,
  },
  {
    name: 'Systems / Go',
    level: '85%',
    desc: 'Distributed Systems / CLI / Perf',
    icon: ServerIcon,
  },
  {
    name: 'Infrastructure',
    level: '80%',
    desc: 'Docker / K8s / CI-CD',
    icon: CpuChipIcon,
  },
  {
    name: 'DevOps',
    level: '75%',
    desc: 'Automation / Security / Monitoring',
    icon: CommandLineIcon,
  },
]

const principles = [
  {
    id: '01',
    title: 'EQUALITY_OF_LOGIC',
    content:
      '逻辑的严密性高于表现层的华丽。任何无法被推导的组件都是系统的负债。',
  },
  {
    id: '02',
    title: 'MINIMALIST_OVERHEAD',
    content: '追求极低的心智负担与系统开销。奥卡姆剃刀原则在工程中同样适用。',
  },
  {
    id: '03',
    title: 'TRUTH_IN_CODE',
    content: '代码即事实。文档应仅作为推理的辅助，而非真理的来源。',
  },
]
</script>
