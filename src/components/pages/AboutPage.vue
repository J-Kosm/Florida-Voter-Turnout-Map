<template>
<div id="container">
    <h1>About</h1>
    <h2>Disclaimer</h2>
    <p>
        The data used for this visualization is only relevant to the 2022 General Election.
    </p>


    <h2>What is this site?</h2>
    <p>
        Each Florida county collects and publically reports statistical data regarding the state and federal elections.
        However, to my knowledge, there is no publicly available visualization of this data.
        This site is an attempt to visualize that public data in the form of a choropleth map.
    </p>

    <h2>What does "adjusted turnout" mean?</h2>
    <p>
        The official methodology used to calculate voter turnout percentage in Florida is to take the number of people that showed up to vote, <b>P</b>,
        and divide it by the number of people in the county that are registered to vote, <b>R</b>.
    </p>
    <p class="formula">
        <b>Official Voter Turnout %</b> = ( P / R ) x 10
    </p>
    <p>
        While I'm sure that the official statistics are calculated in that way for a reason, the resulting percentage can seem a little misleading.
        There is a significant part of the population that is essentially eligible to vote, but who are not currently registered, and they are not factored into the official turnout calculations.
        I thought it would be interesting to tweak the formula to account for this 'unregistered but otherwise eligible to vote' portion of the population.
        The 'adjusted turnout' data is the result obtained from the tweaked formula below, where <b>T</b> represents the total population for the county, and <b>U</b> represents the portion of the population that is too young to vote.
    </p>
    <p class="formula">
        <b>Adjusted Voter Turnout %</b> = ( P / ( T - U ) ) x 10
    </p>
    <p>
        It is important to note that this adjusted turnout formula is missing some important information, and therefore should not be considered an accurate metric.
        One's age is not the only factor that impacts their ability to vote.
        Ideally, this adjusted formula would also account for other attributes that would render someone ineligible to vote, such as non-citizenship status or felony conviction without restoration of voting rights.
    </p>

    <h2>How does the adjusted turnout formula affect the data?</h2>
    <p>
        Because the population size that we're comparing our turnout numbers to has increased to account for the 'unregistered but otherwise eligible' portion of the population, the turnout rate drops for every county.
        The counties that experience the biggest changes between their official and adjusted turnout consequentially have the largest proportions of 'unregistered but otherwise eligible' populations.
        This may indicate that those counties have the most to gain from focused voter registration efforts.
    </p>

    <h2>Data Sources</h2>
    <p>
        <span>Official Turnout and Registered Voters - <a href="https://results.elections.myflorida.com/">Florida Department of State's Election Reporting System.</a></span><br>
        <span>Total Population - <a href="https://bebr.ufl.edu/population-studies-data-archive/">Florida Estimates of Population 2022</a></span><br>
        <span>Age Demographics - <a href="https://bebr.ufl.edu/population-studies-data-archive/">Florida Estimates of Population 2023</a></span><br>
        <span><a href="https://github.com/danielcs88/fl_geo_json">Original Florida GeoJSON data</a> - danielcs88.</span><br>
    </p>

    <h2>Attributions</h2>
    <p>
        <span>UIcons - <a href="https://www.flaticon.com/uicons">Flaticon.</a></span><br>
        <span><a href="https://leafletjs.com/">Leaflet library</a> - Volodymyr Agafonkin.</span><br>
    </p>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
}
</script>

<style scoped>
#container {
    font-size: clamp(12px, 1.5vw, 18px);
    margin: 0em 4em 0em;
}
h1 {
    text-align: center;
}

p {
    padding-left: 4em;
    margin-bottom: 1em;
}
.formula {
    text-align: center;
}

@media only screen and (max-width: 600px) {
    p {
        padding-left: 1em;
        margin-bottom: 1em;
    }
}
</style>