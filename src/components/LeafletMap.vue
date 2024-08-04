<template>
<div id="map-container">
    <div ref='map' id='map'></div>
    <MapLegend></MapLegend>
</div>
</template>

<script>
import MapLegend from './MapLegend.vue';
import { useUIStore } from '@/stores/UI';
import { mapStores } from 'pinia';
import L from 'leaflet'




export default {
    components: {
        MapLegend
    },
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
                this.$refs.map,
                this.mapOptions
            ).fitBounds(this.mapBounds)
            this.UIStore.updateBaseMaps()
            this.UIStore.baseMaps["Official Turnout %"].addTo(this.map)
            if (this.UIStore.mapStyle == null) {
                this.UIStore.mapStyle = "Official Turnout %"
            }

            L.control.layers(this.UIStore.baseMaps, null, {collapsed: false, position: 'topright'}).addTo(this.map)
            
            this.map.on('baselayerchange', this.onBaseLayerChange)

            // radio button isn't clicked, and map style is more opaque than I defined.
            if (this.UIStore.geoJSONLayer != null) {
                this.UIStore.geoJSONLayer.resetStyle()
                this.UIStore.baseMaps[this.UIStore.mapStyle].addTo(this.map)
                return
            }
            this.UIStore.geoJSONLayer = this.UIStore.baseMaps["Official Turnout %"]
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
            this.UIStore.updateCountyFromLayer(this.UIStore.county)
        }
    }
}
</script>

<style scoped>
#map-container {
    flex-grow: 2;
    position: relative;
    flex-basis: 500px;
    min-height: 500px;
    
}

#map {
    height: 100%;
    background-color: rgb(184,228,244);
    z-index: 0;
}

</style>