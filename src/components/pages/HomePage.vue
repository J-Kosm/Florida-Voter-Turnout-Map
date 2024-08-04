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
}
</script>

<style scoped>
#content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: center;
    gap: 25px;

    box-sizing: border-box;
    padding: 2em;
}
.leaflet-map {
    flex-grow: 2;
}
.sidebar {
    flex-grow: 1;
}

</style>