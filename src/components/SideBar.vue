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
            :value="UIStore.countyName"
        >
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
        init() { // really only needs to ever happen once
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
        generateTable() { // would be better if this accepted the chosen map style as an argument and prioritized that specific information somehow.
            
            const tableLabels = [
                // Official Turnout
                'Official Turnout %:',
                'Official Turnout:',
                'Registered Voters:',
                // Adjusted Turnout
                'Adjusted Turnout %:',
                'Voting Age Population:',
                // Population
                'Total Population:',
                'Youth Population:',
                'Elder Population:'
            ]
            let tableData = [
                // Official Turnout
                this.UIStore.turnoutPercentage  + " %",
                this.UIStore.registeredVoters,
                this.formatWithCommas(this.UIStore.officialTurnout),
                // Adjusted Turnout
                this.UIStore.adjustedTurnoutPercentage  + " %",
                this.formatWithCommas(this.UIStore.votingAgePopulation),
                // Population
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
.sidebar-title {
    text-align: center;
    margin-bottom: 10px;
}
.sidebar-title h1 {
    font-size: clamp(12px, 1.5vw, 30px);
}
.sidebar-title select {
    padding-inline: 12px;
}
.sidebar-title p, select {
    font-size: clamp(12px, 1vw, 18px);
}

#sidebar-results {
    justify-content: space-evenly;
    width: 100%;
    font-size: clamp(12px, 1.25vw, 18px);
    border-top: 2px solid black;
    padding: 20px 25px
}
#sidebar-results td:first-child {
    font-weight: bold;
}
#sidebar-results td:last-child {
    float: right;
}
</style>