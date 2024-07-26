<template>
<div id="content">
    <LeafletMap></LeafletMap>
</div>
</template>

<script>
import LeafletMap from '../LeafletMap.vue';
/* import SideBar from '../SideBar.vue'; */

export default {
    components: {
        LeafletMap,
    },
    data() {
        return {

        }
    },
}
</script>

<style scoped>
#content {
    height: 550px;
}
</style>