import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    msg: "Hello, world!?"
  }),
  getters: {

  },
  actions: {

  }
})

/* export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
}) */
