<template>
<div class="side-bar">
    <div class="sidebar-title">
        <h1>
            Click on the map or use the dropdown menu to view county statistics!
        </h1>
        <select
            name="" 
            id="county-select"
        >
            <option value=""> Select a county </option>
            <option v-for="c in UIStore.countyNames" :key="c" :value="c">{{ c }}</option>
        </select>
        <br>
        <p>
            Not registered to vote yet?
            <a href="https://registertovoteflorida.gov/home">Click here!</a>
        </p>
    </div>
</div>
</template>

<script>
import { mapStores } from 'pinia';
import { useUIStore } from '@/stores/UI';

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapStores(useUIStore)
    },
    methods: {
        
    },
    mounted() {
        console.log("Mounted: SideBar")
    }
}
</script>

<style scoped>
.side-bar {
    display: flex;
    flex-direction: column;
    flex-basis: 250px;

    align-items: center;

    background-color:rgb(183,212,168);
    margin-inline: 25px;
    border-radius: 50px;
    border: 2px solid black;
    padding: 15px 25px;
}
</style>