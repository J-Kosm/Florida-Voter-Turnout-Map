import { defineStore } from 'pinia'
import L from 'leaflet'
import 'leaflet-choropleth'
import geoData from '@/data/map_data.json'

export const useUIStore = defineStore('UI', {
  state: () => ({
    baseMaps: null,
    geoJSONLayer: null,
    county: null,
    mapStyle: null,
  }),


  getters: {
    // County Details
    countyName: (state) => {
      return state.county.feature.properties.county
    },
    // Official Turnout
    officialTurnout: (state) => {
      return state.county.feature.properties.turnout
    },
    registeredVoters: (state) => {
      return state.county.feature.properties.voterReg
    },
    turnoutPercentage() {
      return ((this.officialTurnout / this.registeredVoters) * 100).toFixed(1)
    },
    // Adjusted Turnout
    adjustedTurnoutPercentage() {
      return ((this.officialTurnout / this.votingAgePopulation) * 100).toFixed(1)
    },
    votingAgePopulation() {
      return this.totalPopulation - this.youthPopulation
    },
    // Population
    totalPopulation: (state) => {
      return state.county.feature.properties.totalPop
    },
    youthPopulation: (state) => {
      return state.county.feature.properties.youthPop
    },
    elderPopulation: (state) => {
      return state.county.feature.properties.elderPop
    },
  },
  actions: {
    updateBaseMaps() {
      this.baseMaps = {
        "Official Turnout %": L.choropleth(geoData, this.sharedLayerOpts((feature) => {
            return (feature.properties.turnout / feature.properties.voterReg) * 100
        })),
        "Adjusted Turnout %": L.choropleth(geoData, this.sharedLayerOpts((feature) => {
            return ((feature.properties.turnout / (feature.properties.totalPop - feature.properties.youthPop)) * 100)
        })),
        "Total Population": L.choropleth(geoData, this.sharedLayerOpts((feature) => {
            return feature.properties.totalPop
        }))
      }
      
    },
    sharedLayerOpts(func) {
        return {
            valueProperty: func,
            scale: ['#222b3d', '#67ff4f'], 
            steps: 5, 
            mode: 'e', 
            style: {
                color: 'black', 
                weight: 2,
                fillOpacity: 0.8
            },
            onEachFeature: (feature, layer) => {
                layer.on(
                    'click',
                    () => {
                      this.updateCounty(layer)
                    }
                )
            }
        }
    },
    updateCounty(clickedCounty) {
      // Do nothing if same county was clicked
      if (this.county != null && (this.county == clickedCounty)) {
        console.log("same county selected")
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
    selectCounty(clickedCounty) {
      this.county = clickedCounty
      this.county.setStyle({
        weight: 3,
        color: 'white',
        fillOpacity: 1.0
      })
      this.county.bringToFront()
    },
    updateCountyFromLayer(county) {
      this.geoJSONLayer.eachLayer( (layer) => {
        if (this.county == null) {
          return
        }
        if (layer.feature.properties.county == county.feature.properties.county) {
          this.county = layer
          this.county.setStyle({
            weight: 3,
            color: 'white',
            fillOpacity: 1.0
          })
          this.county.bringToFront()
        }
      })
    }
  }
})


