import { describe, expect, test } from "vitest";
import NavButton from "../NavButton.vue";
import NavBar from "../NavBar.vue";
import { mount } from "@vue/test-utils";
import MapLegend from "../MapLegend.vue";
import { createTestingPinia } from "@pinia/testing";
import LeafletMap from "../LeafletMap.vue";


describe('component rendering', () => {
    


    test('NavButton', () => {
        const wrapper = mount(NavButton)
        expect(wrapper.isVisible()).toBe(true)
    })
    
    test('NavBar', () => {
        const wrapper = mount(NavBar)
        expect(wrapper.isVisible()).toBe(true)
    })

    test('MapLegend', () => {
        const wrapper = mount(MapLegend)
        expect(wrapper.isVisible()).toBe(true)
    })

    test('LeafletMap', () => {
        const wrapper = mount(LeafletMap, {
            global: {
                plugins: [createTestingPinia()],
            },
        })



        expect(wrapper.isVisible()).toBe(true)
    })
})

