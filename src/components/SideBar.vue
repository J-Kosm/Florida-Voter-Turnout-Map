<template>
<div class="side-bar" v-if="UIStore.county === null">
    <div class="sidebar-title">
        <h1>
            Click on the map or use the dropdown menu to view county statistics!
        </h1>
        <select
            name="" 
            id="county-select"
            @change="onMenuItemClicked"
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
<div class="side-bar" v-else>
    <div class="sidebar-title">
        <h1>
            {{ UIStore.countyName }} County
        </h1>
        <select
            name="" 
            id="county-select"
            @change="onMenuItemClicked"
        >
            <option value="" selected="true">{{ UIStore.county.feature.properties.county }}</option>
            <option v-for="c in UIStore.geoJSONLayer.getLayers()" :key="c" :value="c.feature.properties.county">{{ c.feature.properties.county }}</option>
        </select>
        <br>
        <p>
            Not registered to vote yet?
            <a href="https://registertovoteflorida.gov/home">Click here!</a>
        </p>
    </div>

    <table id="sidebar-results">
    </table>
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
    watch: {
        'UIStore.county': {
            handler() {
                this.generateTable();
            },
            flush: 'post'
        },
    },
    mounted() {
        console.log("Mounted: SideBar")
        this.init()
        this.restoreState()
    },
    methods: {
        init() {
            let x = []
            this.UIStore.geoJSONLayer.eachLayer(function (layer) {
                x.push(layer.feature.properties.county)
            })
            this.UIStore.countyNames = x
        },
        restoreState() {
            if (this.UIStore.county != null) {
            this.generateTable()
        }
        },
        onMenuItemClicked(e) {
            this.UIStore.geoJSONLayer.eachLayer(item => {
                if (e.target.value == item.feature.properties.county) {
                    this.UIStore.updateCounty(item)
                }
            })
        },
        generateTable() {
            const tableLabels = [
                'Official Turnout:',
                'Total Population:',
                'Youth Population:',
                'Elder Population:'
            ]
            let tableData = [
                this.formatWithCommas(this.UIStore.officialTurnout),
                this.formatWithCommas(this.UIStore.totalPopulation),
                this.formatWithCommas(this.UIStore.youthPopulation),
                this.formatWithCommas(this.UIStore.elderPopulation)
            ]

            const table = document.getElementById('sidebar-results');

            while (table.hasChildNodes()) {
                table.removeChild(table.firstChild);
            }

            tableLabels.forEach((label, i) => {
                const row = document.createElement('tr');
                const text = document.createElement('td');
                const data = document.createElement('td');
                row.id = "resultsRow";
                text.className = 'table-text';
                data.className = 'table-data';

                text.innerText = label;
                data.innerText = tableData[i];

                row.appendChild(text);
                row.appendChild(data);
                table.appendChild(row);
            })
        },
        formatWithCommas(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    },
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