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
            const tableData = {
                'Official Turnout': {
                    'Official %:': this.UIStore.turnoutPercentage  + " %",
                    'Official Turnout:': this.formatWithCommas(this.UIStore.officialTurnout),
                    'Registered Voters:': this.formatWithCommas(this.UIStore.registeredVoters),
                },
                'Adjusted Turnout': {
                    'Adjusted %:': this.UIStore.adjustedTurnoutPercentage  + " %",
                },
                'Demographics': {
                    'Total Population:': this.formatWithCommas(this.UIStore.totalPopulation),
                    'Voting Age Population:': this.formatWithCommas(this.UIStore.votingAgePopulation),
                    '17 and younger:': this.formatWithCommas(this.UIStore.youthPopulation),
                    '65 and older:': this.formatWithCommas(this.UIStore.elderPopulation),
                }
            }

            const table = document.getElementById('sidebar-results');

            while (table.hasChildNodes()) {
                table.removeChild(table.firstChild);
            }

            for (const [key, value] of Object.entries(tableData)) {
                const subheadingRow = document.createElement('tr')
                const subheadingData = document.createElement('td')
                subheadingData.innerText = key
                subheadingData.colSpan = 2
                subheadingData.className = "subheading"
                subheadingRow.appendChild(subheadingData)
                table.appendChild(subheadingRow)

                for (const [key, innerValue] of Object.entries(value)) {
                    const row = document.createElement('tr');
                    const text = document.createElement('td');
                    const data = document.createElement('td');

                    text.innerText = key
                    data.innerText = innerValue

                    row.appendChild(text);
                    row.appendChild(data);
                    table.appendChild(row);
                }
            }
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
#sidebar-results :deep(.subheading) {
    font-weight: bold;
    text-align: center;
    padding-top: 10px;
}


</style>