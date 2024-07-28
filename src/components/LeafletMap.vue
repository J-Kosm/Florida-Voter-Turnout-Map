<template>
<div id="map-container">
    <div id='map'></div>
    <div id="legend" class="map-overlay"></div>
</div>
</template>

<script>
import { useUIStore } from '@/stores/UI';
import { mapStores } from 'pinia';
import L from 'leaflet'

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
            ]
        }
    },
    computed: {
        ...mapStores(useUIStore)
    },
    mounted() {
        console.log("Mounted: LeafletMap")
        this.init()
    },

    methods: {
        init() {
            let map = L.map(
                'map',
                this.mapOptions
            ).fitBounds(this.mapBounds)
            this.UIStore.updateBaseMaps()
            this.UIStore.baseMaps["% Turnout"].addTo(map)

            L.control.layers(this.UIStore.baseMaps, null, {collapsed: false, position: 'topright'}).addTo(map)
            
            map.on('baselayerchange', this.onBaseLayerChange)

            this.UIStore.geoJSONLayer = this.UIStore.baseMaps["% Turnout"]
        },
        onBaseLayerChange(e) {
            this.UIStore.geoJSONLayer.resetStyle()
            this.UIStore.geoJSONLayer = e.layer
            this.UIStore.updateCountyFromLayer(this.UIStore.county)
        }
    }
}
</script>

<style scoped>
#map-container {
    flex-basis: 500px;
    min-height: 425px;
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