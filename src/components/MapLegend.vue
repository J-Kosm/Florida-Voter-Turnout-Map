<template>
<div id="legend" class="map-overlay">
    <span>High</span>
    <div id="colors"></div>
    <span>Low</span>
</div>
</template>

<script>
export default {
}
</script>

<style>
.map-overlay {
    position: absolute;
    left: 5%;
    bottom: 5%;
}
</style>

<style scoped>
.map-overlay {
    display: flex;
    flex-direction: column;
    background: #fff;
    height: 150px;
    font-family: Arial, sans-serif;
    overflow: auto;
    border-radius: 10px;
    z-index: 1;
    align-items: center;
}
#legend {
  border: 2px solid rgb(0, 0, 0);
  padding: 14px;
}
#colors {
    width: 25px;
    height: 100%;
    background: linear-gradient(#67ff4f, #222b3d);
    z-index: 2;
    margin: 2px 0px 2px;
}
</style>