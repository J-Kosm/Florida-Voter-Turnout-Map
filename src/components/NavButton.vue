<template>
<button data-test="button" class="button" type="button" @click="$emit('navButtonClicked', path)">
    <img :src="imgSrc" alt="">
    <span>{{ text }}</span>
    
</button>
</template>

<script>
export default {
    props: {
        path: {
            type: String,
            default: ""
        },
        imgSrc: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: "Button Text"
        },
        altText: {
            type: String,
            default: "Button Alt Text"
        },
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>

.button {
    display: flex;
    align-items: center;
    padding: 5px;
    flex-grow: 1;

    justify-content: center;

    color: black;
    border: none;
    border-radius: 8px;
    background-color: antiquewhite;
    font-size: clamp(12px, 1.5vw, 25px);
    margin: 0px 2px 0px;
}
.button:hover {
    background-color: burlywood;
}
.button img {
    width: 20px;
    height: 20px;
    padding-right: 5px;
}
@media only screen and (max-width: 600px) {
    .button span {
        display: none;
    }
}

</style>