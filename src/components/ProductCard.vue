<script setup lang="ts">
interface Props {
  title: string
  description?: string
  image?: string
  price?: string
  tags?: string[]
  link?: string
  status?: string
}

const props = defineProps<Props>()

const tagColors = [
  'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
  'bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300',
  'bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300',
  'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
]

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  completed: 'bg-primary-500',
  archived: 'bg-gray-500',
  wip: 'bg-yellow-500',
}

function getStatusColor(status: string): string {
  return statusColors[status.toLowerCase()] || 'bg-accent-500'
}

function getTagColor(index: number): string {
  return tagColors[index % tagColors.length]
}
</script>

<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link || undefined"
    :target="link ? '_blank' : undefined"
    :rel="link ? 'noopener noreferrer' : undefined"
    class="not-prose group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
  >
    <!-- Image -->
    <div v-if="image" class="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-700" style="aspect-ratio: 2 / 3;">
      <img
        :src="image"
        :alt="title"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <!-- Status badge -->
      <span
        v-if="status"
        class="absolute right-2 top-2 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow"
        :class="getStatusColor(status)"
      >
        {{ status }}
      </span>
    </div>

    <!-- Status badge (no image) -->
    <div v-if="!image && status" class="flex justify-end px-4 pt-3">
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow"
        :class="getStatusColor(status)"
      >
        {{ status }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h3>

      <div v-if="description" class="group/desc relative mt-1.5">
        <p class="line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {{ description }}
        </p>
        <div class="pointer-events-none absolute left-0 top-0 z-10 hidden w-full rounded-md bg-white p-2 shadow-lg ring-1 ring-gray-200 group-hover/desc:block dark:bg-gray-800 dark:ring-gray-600">
          <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="tags && tags.length" class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="(tag, i) in tags"
          :key="tag"
          class="rounded-full px-2 py-0.5 text-xs font-medium"
          :class="getTagColor(i)"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Spacer to push price down -->
      <div class="flex-1"></div>

      <!-- Footer: price -->
      <div v-if="price" class="mt-4 border-t border-gray-100 pt-3 dark:border-gray-700">
        <span class="text-base font-bold text-primary-600 dark:text-primary-400">
          {{ price }}
        </span>
      </div>
    </div>
  </component>
</template>
