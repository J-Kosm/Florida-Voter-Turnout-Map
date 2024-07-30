import { defineStore } from 'pinia'
import L from 'leaflet'
import 'leaflet-choropleth'
import geoData from '@/data/map_data.json'

export const useUIStore = defineStore('UI', {
  state: () => ({
    // LeafletMap State
    map: null,
    baseMaps: null,
    geoJSONLayer: null,
    county: null,
    
    // SideBar state
    countyNames: null,
    tableLabels: null,
    mapStyle: null,




  }),


  getters: {
    countyName: (state) => {
      return state.county.feature.properties.county
    },
    officialTurnout: (state) => {
      return state.county.feature.properties.turnout
    },
    registeredVoters: (state) => {
      return state.county.feature.properties.voterReg
    },
    totalPopulation: (state) => {
      return state.county.feature.properties.totalPop
    },
    youthPopulation: (state) => {
      return state.county.feature.properties.youthPop
    },
    elderPopulation: (state) => {
      return state.county.feature.properties.elderPop
    },


    votingAgePopulation() {
      return this.totalPopulation - this.youthPopulation
    },
    

/*  
    officialTurnoutPercentage: (state) => {
      return
    },
*/
  },
  actions: {
    updateBaseMaps() { // this is more like 'setBaseMaps()', as nothing is being passed in to update.
      this.baseMaps = {
        "% Turnout": L.choropleth(geoData, this.sharedLayerOpts((feature) => {
            return ( feature.properties.turnout / feature.properties.voterReg) * 100
        })),
        "Total Population": L.choropleth(geoData, this.sharedLayerOpts((feature) => {
            return feature.properties.totalPop
        }))
      }
      
    },
    sharedLayerOpts(func) { // probably doesn't have to exist like this
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
    updateCounty(clickedCounty) { // map style changes should be moved to map component function?
      
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
      console.log(this.county)
      console.log(this.geoJSONLayer)
      this.county.setStyle({
        weight: 3,
        color: 'white',
        fillOpacity: 1.0
      })
      this.county.bringToFront()
    },
    selectCounty(clickedCounty) { // should be moved to map component?
      // select new county
      this.county = clickedCounty
      this.county.setStyle({
        weight: 3,
        color: 'white',
        fillOpacity: 1.0
      })
      this.county.bringToFront()
    },
    updateCountyFromLayer(county) { // reconsider
      this.geoJSONLayer.eachLayer( (layer) => {
        if (layer.feature.properties.county == county.feature.properties.county) {
          console.log(layer.feature.properties.county + " is the same as " + county.feature.properties.county)
          // select new county
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


