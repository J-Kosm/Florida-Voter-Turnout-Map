import{_ as t,o as e,c as a,h as o}from"./index-BeVsDOVy.js";const i={data(){return{}}},d={id:"container"},s=o('<h1 data-v-0d2852e8>About</h1><h2 data-v-0d2852e8>Disclaimer</h2><p data-v-0d2852e8> The data used for this visualization is only relevant to the 2022 General Election. </p><h2 data-v-0d2852e8>What is this site?</h2><p data-v-0d2852e8> Each Florida county collects and publically reports statistical data regarding the state and federal elections. However, to my knowledge, there is no publicly available visualization of this data. This site is an attempt to visualize that public data in the form of a choropleth map. </p><h2 data-v-0d2852e8>What does &quot;adjusted turnout&quot; mean?</h2><p data-v-0d2852e8> The official methodology used to calculate voter turnout percentage in Florida is to take the number of people that showed up to vote, <b data-v-0d2852e8>P</b>, and divide it by the number of people in the county that are registered to vote, <b data-v-0d2852e8>R</b>. </p><p class="formula" data-v-0d2852e8><b data-v-0d2852e8>Official Voter Turnout %</b> = ( P / R ) x 10 </p><p data-v-0d2852e8> While I&#39;m sure that the official statistics are calculated in that way for a reason, the resulting percentage can seem a little misleading. There is a significant part of the population that is essentially eligible to vote, but who are not currently registered, and they are not factored into the official turnout calculations. I thought it would be interesting to tweak the formula to account for this &#39;unregistered but otherwise eligible to vote&#39; portion of the population. The &#39;adjusted turnout&#39; data is the result obtained from the tweaked formula below, where <b data-v-0d2852e8>T</b> represents the total population for the county, and <b data-v-0d2852e8>U</b> represents the portion of the population that is too young to vote. </p><p class="formula" data-v-0d2852e8><b data-v-0d2852e8>Adjusted Voter Turnout %</b> = ( P / ( T - U ) ) x 10 </p><p data-v-0d2852e8> It is important to note that this adjusted turnout formula is missing some important information, and therefore should not be considered an accurate metric. One&#39;s age is not the only factor that impacts their ability to vote. Ideally, this adjusted formula would also account for other attributes that would render someone ineligible to vote, such as non-citizenship status or felony conviction without restoration of voting rights. </p><h2 data-v-0d2852e8>How does the adjusted turnout formula affect the data?</h2><p data-v-0d2852e8> Because the population size that we&#39;re comparing our turnout numbers to has increased to account for the &#39;unregistered but otherwise eligible&#39; portion of the population, the turnout rate drops for every county. The counties that experience the biggest changes between their official and adjusted turnout consequentially have the largest proportions of &#39;unregistered but otherwise eligible&#39; populations. This may indicate that those counties have the most to gain from focused voter registration efforts. </p><h2 data-v-0d2852e8>Data Sources</h2><p data-v-0d2852e8><span data-v-0d2852e8>Official Turnout and Registered Voters - <a href="https://results.elections.myflorida.com/" data-v-0d2852e8>Florida Department of State&#39;s Election Reporting System.</a></span><br data-v-0d2852e8><span data-v-0d2852e8>Total Population - <a href="https://bebr.ufl.edu/population-studies-data-archive/" data-v-0d2852e8>Florida Estimates of Population 2022</a></span><br data-v-0d2852e8><span data-v-0d2852e8>Age Demographics - <a href="https://bebr.ufl.edu/population-studies-data-archive/" data-v-0d2852e8>Florida Estimates of Population 2023</a></span><br data-v-0d2852e8><span data-v-0d2852e8><a href="https://github.com/danielcs88/fl_geo_json" data-v-0d2852e8>Original Florida GeoJSON data</a> - danielcs88.</span><br data-v-0d2852e8></p><h2 data-v-0d2852e8>Attributions</h2><p data-v-0d2852e8><span data-v-0d2852e8>UIcons - <a href="https://www.flaticon.com/uicons" data-v-0d2852e8>Flaticon.</a></span><br data-v-0d2852e8><span data-v-0d2852e8><a href="https://leafletjs.com/" data-v-0d2852e8>Leaflet library</a> - Volodymyr Agafonkin.</span><br data-v-0d2852e8></p>',17),r=[s];function n(l,h,u,p,c,f){return e(),a("div",d,r)}const b=t(i,[["render",n],["__scopeId","data-v-0d2852e8"]]);export{b as default};
