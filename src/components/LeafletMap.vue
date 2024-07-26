<template>
<div id="map-container">
    <div id='map'></div>
</div>
</template>

<script>
import L from 'leaflet'
import 'leaflet-choropleth'
import geoData from '@/data/map_data.json'

export default {
    data() {
        return {
            mapOptions: {
                zoomControl: false,
                dragging: false,
                boxZoom: false,
                doubleClickZoom: false,
                scrollWheelZoom: false,
                zoomSnap: 0.25,
            },
            mapBounds: [
                [31.083518,-87.696912],
                [24.409639,-79.937745]
            ],
            baseMaps: {
                "% Turnout": L.choropleth(geoData, this.sharedLayerOpts((feature) => {
                    return ( feature.properties.turnout / feature.properties.voterReg) * 100
                })),
                "Total Population": L.choropleth(geoData, this.sharedLayerOpts((feature) => {
                    return feature.properties.totalPop
                }))
            }
        }
    },
    mounted() {
        this.init()
    },

    methods: {
        init() {
            let map = L.map(
                'map',
                this.mapOptions
            ).fitBounds(this.mapBounds)
            this.baseMaps["% Turnout"].addTo(map)
            
            let control = L.control.layers(this.baseMaps, null, {collapsed: false, position: 'bottomright'})
            control.addTo(map)
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
                            console.log("Clicked")
                        }
                    )
                }
            }
        }
    }
}
</script>

<style scoped>
#map-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

#map {
    height: 100%;
    background-color: rgb(184,228,244);
    z-index: 0;
}

</style>

<!-- #map-container {
    flex-grow: 6;
    flex-basis: 500px;
    min-height: 425px;
    position: relative;
}
#map {
    width: 100%;
    height: 100%;
    background-color: rgb(184,228,244);
    z-index: 0;
}
.map-overlay {
    position: absolute;
    background: #fff;
    margin-right: 20px;
    font-family: Arial, sans-serif;
    overflow: auto;
    border-radius: 10px;
    z-index: 1;

    left: 5%;
    bottom: 5%;
}
#legend {
  border: 2px solid rgb(0, 0, 0);
  padding: 14px;
}
.legend-row {
  display: flex;
  justify-content: space-between;
}
.legend-key {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 14px;
} -->