<script>
    import { createEventDispatcher } from "svelte";
    import ItemInformation from "./ItemInformation.svelte";
    import PlayerCard from "./PlayerCard.svelte";
    
    export let data;

    var itemAmount = 1;

    $: players = data?.players || [];

    const dispatch = createEventDispatcher();

    const handlePlayerSelected = e => {
        dispatch('playerSelected', { itemAmount, target: e.detail })
    }
</script>

<div class="content">
    <div class="wrapper">
        <div class="icon">
            <svg width="53" height="28" viewBox="0 0 53 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 15.5C49.5 15.5 50.75 16 51.75 17C52.5 18 53 19.25 53 20.5L33 28L15.5 23V0.5H20.25L38.5 7.25C39.75 7.75 40.5 8.75 40.5 10C40.5 10.75 40.25 11.5 39.75 12C39.25 12.5 38.25 13 37.5 13H30.5L26 11.25L25.25 13.5L30.5 15.5H48ZM0.5 0.5H10.5V28H0.5V0.5Z" fill="white"/>
            </svg>                        
        </div>
        <div class="confirmation--text">
            <div class="top">
                Choose <b>Player</b> from List
            </div>
            <div class="bottom">
                Select to whom to hand over
            </div>
        </div>
        <div class="player--list">
            <div class="scroller">
                {#each players as { name, profile, distance, source } (source)}
                    <PlayerCard {name} {profile} {distance} {source} on:playerCardSelected={handlePlayerSelected} />
                {/each}
            </div>
            <div class="indicator">
                <svg width="512" height="12" viewBox="0 0 512 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.666667 6C0.666667 8.94552 3.05448 11.3333 6 11.3333C8.94552 11.3333 11.3333 8.94552 11.3333 6C11.3333 3.05448 8.94552 0.666667 6 0.666667C3.05448 0.666667 0.666667 3.05448 0.666667 6ZM500.667 6C500.667 8.94552 503.054 11.3333 506 11.3333C508.946 11.3333 511.333 8.94552 511.333 6C511.333 3.05448 508.946 0.666667 506 0.666667C503.054 0.666667 500.667 3.05448 500.667 6ZM6 7H506V5H6V7Z" fill="white" fill-opacity="0.15"/>
                </svg>                    
            </div>
        </div>
        <ItemInformation {data} bind:itemAmount={itemAmount} />
    </div>
</div>
<div class="backdrop">
</div>

<style>
    

    .backdrop, .content {
        position: absolute;
        inset: 0;
    }
    
    .wrapper {
        position: absolute;
        
        top: 21%;
        
        left: 50%;
        transform: translateX(-50%);

        /* background-color: red; */

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .wrapper > .icon {
        margin-bottom: 27px;
    }
    .scroller {
        height: 100%;
        width: 422px;
        margin-inline: auto;

        overflow-y: scroll;
    }

    .scroller {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.85) rgba(255, 255, 255, 0.15);
    }

    .scroller::-webkit-scrollbar {
        width: 2px;
    }

    .scroller::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.15);
    }

    .scroller::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 14px;
        border: 3px solid rgba(255, 255, 255, 0.85);
    }
    .player--list {
        width: 524px;
        height: 310px;
        position: relative;
    }

    .player--list .indicator {
        bottom: -9px;
        position: absolute;
    }
    .confirmation--text {
        margin-bottom: 50px;
    }
    .confirmation--text .top {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 0.05em;
        text-transform: uppercase;

        color: rgba(255, 255, 255, 0.45);
        text-align: center;
    }
    .confirmation--text .top b {
        font-weight: bold;
        color: rgba(255, 255, 255, 0.85);
    }
    .confirmation--text .bottom {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 30px;
        text-align: center;
        letter-spacing: 0.15em;
        text-transform: uppercase;

        color: #FFFFFF;
    }
    .backdrop {
        z-index: 1;
        background: linear-gradient(0deg, rgba(35, 147, 125, 0.05), rgba(35, 147, 125, 0.05)), rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(12.5px);
    }
    .content {
        z-index: 2;
        inset: 0;
        background-image: url('/static/confirm-backdrop-positive.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>