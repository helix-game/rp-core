<script>
    import Slot from "./Slot.svelte";
    import WeightIndicator from "../WeightIndicator.svelte";
    import FastSlots from "./FastSlots.svelte";
    import Equipment from "./Equipment.svelte";
    import { closeContext } from "../../store/stores";

    export let showEquipment = true;
    export let showIndicator = true;
    export let invert = false;
    export let personal = false;
    export let data;

    const handleScroll = () => {
        $closeContext()
    }
</script>

{#if showIndicator}
    <WeightIndicator {invert} weight={data?.weight} />
{/if}
<div class="container {personal ? 'personal': ''}">
    <div class="container--title">
        <div class="label">
            <span class="focus">{personal ? "INVENTORY" : data.label}</span>
            <span class="reflection">{personal ? "INVENTORY" : data.label}</span>
        </div>
    </div>
    <figure class="content--wrapper {invert ? 'invert': ''}">
        {#if data?.pockets}
            <FastSlots invId={data?.id} pockets={data?.pockets} {invert} />
        {/if}
    
        <main>
            <figure class="inventory {invert ? 'invert ': ''}">
                <div class="indicators">    
                    <svg class="top--right--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13V13C12 6.37258 6.62742 1 0 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
                    </svg>
                    
                    <svg class="top--left--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13V13C1 6.37258 6.37258 1 13 1V1" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
                    </svg>

                    <svg class="bottom--left--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0V0C1 6.62742 6.37258 12 13 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
                    </svg>            

                    <svg class="bottom--right--corner" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0V0C12 6.62742 6.62742 12 -1.78814e-07 12V12" stroke="#626262" stroke-opacity="0.45" stroke-width="1.5"/>
                    </svg>

                    <svg class="left--middle--bar" width="1" height="575" viewBox="0 0 1 575" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="1" height="575" fill="white" fill-opacity="0.08"/>
                    </svg>

                    <svg class="right--middle--bar" width="1" height="575" viewBox="0 0 1 575" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="1" height="575" fill="white" fill-opacity="0.08"/>
                    </svg>

                    <svg class="bottom--middle--bar" width="582" height="1" viewBox="0 0 582 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="582" height="1" fill="white" fill-opacity="0.08"/>
                    </svg>                        

                    <svg class="top--middle--bar" width="582" height="1" viewBox="0 0 582 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="582" height="1" fill="white" fill-opacity="0.08"/>
                    </svg>                        
                </div>
                
                <div class="content">
                    <header class="{invert ? "invert" : ""}">
                        <div class="group">
                            <div class="icon">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.99998 18.3334C4.54165 18.3334 4.14915 18.1701 3.82248 17.8434C3.49581 17.5167 3.33276 17.1245 3.33331 16.6667V6.66675C3.33331 5.88897 3.56943 5.20841 4.04165 4.62508C4.51387 4.04175 5.11109 3.65286 5.83331 3.45841V1.66675H8.33331V3.33341H11.6666V1.66675H14.1666V3.45841C14.8889 3.65286 15.4861 4.04175 15.9583 4.62508C16.4305 5.20841 16.6666 5.88897 16.6666 6.66675V16.6667C16.6666 17.1251 16.5033 17.5176 16.1766 17.8442C15.85 18.1709 15.4578 18.334 15 18.3334H4.99998ZM12.0833 13.3334H13.75V10.0001H6.24998V11.6667H12.0833V13.3334Z" fill="black"/>
                                </svg>                        
                            </div>
                            <div class="inventory--title">BACKPACK</div>
                        </div>
                
                        <div class="inventory--level">
                            <span>2 LVL</span>
                        </div>
                    </header>
                
                    <section on:scroll={handleScroll}>
                        {#each Array(60) as _, index (index)}
                            <Slot data={data.slots[index + 1]} invId={data.id} empty={!data.slots[index + 1]} slot={index + 1} />
                        {/each}
                    </section>
                </div>
            </figure>
            {#if data?.equipment}
                <Equipment {invert} />
            {/if}
        </main>
    </figure>
</div>

<style>
    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    .container.personal .content--wrapper {
        gap: 89px;
    }
    .content--wrapper {
        display: flex;
        gap: 59px;
    }

    .container--title {
        height: 60px;
        display: flex;
        align-items: center;
        gap: 30px;
        margin-bottom: 49px;

        margin-top: 66px;
    }

    .container.personal .container--title {
        margin-top: 0;
    }

    .container--title .label {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        letter-spacing: 0.48em;
        text-transform: uppercase;

        color: #FFFFFF;
        position: relative;
    }
    .container--title .reflection {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        letter-spacing: 0.48em;
        text-transform: uppercase;
        background: linear-gradient(360deg, rgba(255, 255, 255, 0.1725) 20%, rgba(255, 255, 255, 0) 81.67%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        transform: scaleY(-1);
        position: absolute;
        left: 0;
        top: 75%;
    }

    .container {
        width: fit-content;
        overflow: hidden;
    }

    .container.personal {
        top: 66px;
        left: 193px;
        /* left: 160px; */
        position: absolute;
    }

    figure.inventory {
        width: 100%;
        height: 659px;
        width: 666px;
        position: relative;
    }

    .content--wrapper.invert {
        flex-direction: row-reverse;
    }
    .content--wrapper.invert .fast--slots .content {
        padding-left: 0;
        padding-right: 24px;
    }

    .inventory .content {
        position: absolute;

        border-radius: 25px;
        inset: 11px;

        border: 1px solid rgba(255, 255, 255, 0.05);
        background: radial-gradient(55.23% 55.23% at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.0062) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.01);
    
        padding-inline: 20px;
        padding-block: 20px;
    }

    header {
        margin-top: 3px;
        margin-bottom: 22px;

        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        padding-inline: 17px;
        box-sizing: border-box;

        background: radial-gradient(55.23% 55.23% at 50% 50%, rgba(255, 255, 255, 0.01) 0%, rgba(0, 217, 177, 0.0031) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(270deg, rgba(0, 217, 177, 0.15) 0%, rgba(0, 217, 177, 0) 60.84%), radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.02) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
        border-radius: 20px;
    }

    header.invert {
        background: radial-gradient(55.23% 55.23% at 50% 50%, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.0031) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(270deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60.84%), radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.02) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
        border-radius: 20px;
    }

    header.invert .inventory--level {
        background: #FFFFFF;
        box-shadow: 0px 0px 45px rgba(255, 255, 255, 0.45);
        color: rgba(0, 0, 0, 0.65);
        border-radius: 12px;
    }

    .icon {
        width: 36px;
        height: 36px;
        background: #FFFFFF;
        box-shadow: 0px 0px 35px rgba(255, 255, 255, 0.25);
        border-radius: 10px;
        position: relative;
    }
    .icon > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .inventory--title {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.285em;
        text-transform: uppercase;

        color: #FFFFFF;
    }

    .group {
        display: flex;
        gap: 18px;
        align-items: center;
    }

    .inventory--level > span {
        padding-inline: 14px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        align-items: center;
        text-align: right;
        letter-spacing: 0.12em;
        text-transform: uppercase;

        color: rgba(0, 0, 0, 0.65);
    }
    .inventory--level {
        height: 36px;
        background: #00D9B1;
        box-shadow: 0px 0px 45px rgba(0, 217, 177, 0.65);
        border-radius: 12px;

        display: flex;
        align-items: center;
    }

    section {
        display: flex;
        justify-content: space-between;
        flex-basis: 94px;
        flex-wrap: wrap;
        overflow-y: scroll;
        row-gap: 8px;
        column-gap: 7.6px;
        height: 502px;

        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        scroll-snap-type: y mandatory;
    }

    section::-webkit-scrollbar {
        display: none;
    }

    .indicators {
        position: absolute;
        inset: 0;
    }
    .indicators svg {
        position: absolute;
    }

    .top--right--corner {
        top: 0;
        right: 0;
    }
    .top--left--corner {
        top: 0;
        left: 0;
    }

    .bottom--left--corner {
        bottom: 0;
        left: 0;
    }

    .bottom--right--corner {
        bottom: 0;
        right: 0;
    }

    .left--middle--bar {
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .right--middle--bar {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .bottom--middle--bar {
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
    }

    .top--middle--bar {
        left: 50%;
        transform: translateX(-50%);
        top: 0;
    }

</style>