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
            map: null,
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
        this.restoreState()
    },

    methods: {
        init() {
            this.map = L.map(
                'map',
                this.mapOptions
            ).fitBounds(this.mapBounds)
            this.UIStore.updateBaseMaps()
            this.UIStore.baseMaps["% Turnout"].addTo(this.map)

            L.control.layers(this.UIStore.baseMaps, null, {collapsed: false, position: 'topright'}).addTo(this.map)
            
            this.map.on('baselayerchange', this.onBaseLayerChange)

            // radio button isn't clicked, and map style is more opaque than I defined.
            if (this.UIStore.geoJSONLayer != null) {
                this.UIStore.geoJSONLayer.resetStyle()
                console.log("NewLayer: ")
                console.log(this.UIStore.baseMaps[this.UIStore.mapStyle])
                this.UIStore.baseMaps[this.UIStore.mapStyle].addTo(this.map)
                return
            }
            this.UIStore.geoJSONLayer = this.UIStore.baseMaps["% Turnout"]
        },
        restoreState() {
            if (this.UIStore.county != null) {
                this.UIStore.geoJSONLayer.eachLayer(item => {
                    if (this.UIStore.countyName == item.feature.properties.county) {
                        this.UIStore.selectCounty(item)
                    }
                })
                this.UIStore.geoJSONLayer.addTo(this.map)
            }
        },
        onBaseLayerChange(e) {
            this.UIStore.geoJSONLayer.resetStyle()
            this.UIStore.geoJSONLayer = e.layer
            this.UIStore.mapStyle = e.name
            console.log(this.UIStore.mapStyle)
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