<template>
<button class="button" type="button" @click="$emit('navButtonClicked', path)">
    <img :src="imgSrc" alt="">
    {{ text }}
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
    border-radius: 18px;
    background-color: antiquewhite;
    font-size: clamp(12px, 1.5vw, 25px);
}
.button:hover {
    background-color: burlywood;
}
.button img {
    width: 20px;
    height: 20px;
    padding-right: 5px;
}

</style>