<template>
<div id="content">
    <LeafletMap class="leaflet-map"></LeafletMap>
    <SideBar class="sidebar"></SideBar>
</div>
</template>

<script>
import LeafletMap from '../LeafletMap.vue';
import SideBar from '../SideBar.vue';

export default {
    components: {
        LeafletMap,
        SideBar
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
#content {
    display: flex;
    flex-direction: row;
    justify-content: center;

    box-sizing: border-box;
    gap: 20px;
    flex: 1 0 auto;
    padding: 2em;
}
.leaflet-map {
    flex-grow: 2;
}
.sidebar {
    flex-grow: 1;
}

</style>