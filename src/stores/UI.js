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
  },
  actions: {
    updateBaseMaps() {
      this.baseMaps = {
        "% Turnout": L.choropleth(geoData, this.sharedLayerOpts((feature) => {
            return ( feature.properties.turnout / feature.properties.voterReg) * 100
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
    selectCounty(clickedCounty) {
      // select new county
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
        if (layer.feature.properties.county == county.feature.properties.county) {
          // select new county
          // dropdown menu not updating properly
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
