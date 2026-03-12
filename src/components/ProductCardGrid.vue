<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'

interface CardItem {
  title: string
  description?: string
  image?: string
  price?: string
  tags?: string[]
  link?: string
  status?: string
}

const props = withDefaults(defineProps<{
  cards: CardItem[]
  columns?: number
}>(), {
  columns: 3,
})

const search = ref('')
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)

function parsePrice(price?: string): number | null {
  if (!price) return null
  if (price.toLowerCase() === 'free') return 0
  const match = price.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : null
}

const filteredCards = computed(() => {
  let result = props.cards

  // Price range filter
  if (priceMin.value !== null || priceMax.value !== null) {
    result = result.filter((card) => {
      const numeric = parsePrice(card.price)
      if (numeric === null) return true
      if (priceMin.value !== null && numeric < priceMin.value) return false
      if (priceMax.value !== null && numeric > priceMax.value) return false
      return true
    })
  }

  // Text search
  const q = search.value.toLowerCase().trim()
  if (q) {
    result = result.filter((card) => {
      return (
        card.title.toLowerCase().includes(q) ||
        card.description?.toLowerCase().includes(q) ||
        card.tags?.join(' ').toLowerCase().includes(q) ||
        card.link?.toLowerCase().includes(q) ||
        card.status?.toLowerCase().includes(q) ||
        card.price?.toLowerCase().includes(q)
      )
    })
  }

  return result
})

const gridClass = computed(() => {
  const colMap: Record<number, string> = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }
  return colMap[props.columns] || 'lg:grid-cols-3'
})
</script>

<template>
  <div class="not-prose">
    <div class="mb-4 flex flex-wrap items-center gap-3">
      <input
        v-model="search"
        type="text"
        placeholder="Search cards..."
        class="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary-400 dark:focus:ring-primary-400"
      />
      <div class="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
        <span>$</span>
        <input
          v-model.number="priceMin"
          type="number"
          min="0"
          step="any"
          placeholder="Min"
          class="w-20 rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary-400 dark:focus:ring-primary-400"
        />
        <span>&ndash;</span>
        <input
          v-model.number="priceMax"
          type="number"
          min="0"
          step="any"
          placeholder="Max"
          class="w-20 rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-primary-400 dark:focus:ring-primary-400"
        />
      </div>
    </div>

    <div
      v-if="filteredCards.length"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2"
      :class="gridClass"
    >
      <ProductCard
        v-for="card in filteredCards"
        :key="card.title"
        v-bind="card"
      />
    </div>

    <p v-else class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      No cards match your search.
    </p>
  </div>
</template>
