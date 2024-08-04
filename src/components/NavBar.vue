<template>
<div id="navbar">
    <div id="button-container">
        <NavButton :img-src="homeButtonImg" text="Home" path="/Florida-Voter-Turnout-Map/" @navButtonClicked="onNavButtonClicked"></NavButton>
        <NavButton :img-src="aboutButtonImg" text="About" path="/Florida-Voter-Turnout-Map/about" @navButtonClicked="onNavButtonClicked"></NavButton>
    </div>

    <div id="title">
         {{ titleText }}
    </div>

    <div id="attribution">
        UIcons by <a href="https://www.flaticon.com/uicons">Flaticon</a>
    </div>

</div>
</template>

<script>
import NavButton from './NavButton.vue';
import homeButtonImg from '@/assets/home.svg'
import aboutButtonImg from '@/assets/interrogation.svg'

export default {
    components: {
        NavButton
    },
    data() {
        return {
            homeButtonImg,
            aboutButtonImg,
            titleText: "Florida Voter Turnout Map",
            

        }
    },
    methods: {
        onNavButtonClicked(i) {
            this.$router.push(i)
        }
    }
}
</script>

<style scoped>
#navbar {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    margin-bottom: 0px;
    overflow: hidden;
    max-height: 75px;
    background-color: rgb(251,203,121);
    box-shadow: 0px 5px 5px #7c7c7c;
}
#navbar * {
    padding: 4px;
}
#button-container {
    display: flex;
    max-height: 67px;
    justify-content: center;
}
#title {
    text-align: center;
    max-height: 67px;
    align-content: center;
    font-size: clamp(12px, 1.5vw, 30px);
    margin: 0;
}
#attribution {
    align-self: center;
    justify-self: center;
    font-size: clamp(12px, 1vw, 14px);
}
</style>