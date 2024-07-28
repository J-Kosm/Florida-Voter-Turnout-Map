import { defineStore } from 'pinia'

export const useUIStore = defineStore('UI', {
  state: () => ({
    map: null,
    geoJSONLayer: null,
    county: null,
  }),
  getters: {
    countyName: (state) => {
      return state.county.feature.properties.county
    },
  },
  actions: {
    updateStyle(clickedCounty) {

      // Do nothing if same county was clicked
      if (this.county != null && (this.countyName == clickedCounty.feature.properties.county)) {
        // console.log("same county clicked")
        return
      }
      // de-select previous county 
      if (this.county != null) {
        this.geoJSONLayer.resetStyle(this.county)
      }
      
      // select new county
      this.county = clickedCounty
      this.county.setStyle({
        weight: 3,
        color: 'white',
        fillOpacity: 1.0
      })
      this.county.bringToFront()
    },
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
