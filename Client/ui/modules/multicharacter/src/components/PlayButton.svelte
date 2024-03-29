<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { s_scale } from "../store/stores";

    const dispatch = createEventDispatcher()

    const handleClick = () => {
        dispatch('click')
    }
</script>

<div
    transition:fly={{x: '100%', duration: 250}}
    style="scale: {$s_scale};"
class="play--button--component">
    <div class="play--button--label">
        <span class="top">CHOOSE CHARACTER</span><br>
        <span class="btm">AND PLAY</span>
    </div>
    <div class="play--button--wrapper">
        <button 
        on:click={handleClick}
        class="play--button">
            <svg width="174" height="174" viewBox="0 0 174 174" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="87" cy="87" r="75" fill="#41CCB1" fill-opacity="0.1"/>
                <circle cx="87" cy="87" r="85" stroke="#41CCB1" stroke-opacity="0.05" stroke-width="4"/>
                <path d="M77 105L105 87L77 69V105ZM87 127C81.4667 127 76.2667 125.949 71.4 123.848C66.5333 121.749 62.3 118.9 58.7 115.3C55.1 111.7 52.2507 107.467 50.152 102.6C48.0507 97.7333 47 92.5333 47 87C47 81.4667 48.0507 76.2667 50.152 71.4C52.2507 66.5333 55.1 62.3 58.7 58.7C62.3 55.1 66.5333 52.2493 71.4 50.148C76.2667 48.0493 81.4667 47 87 47C92.5333 47 97.7333 48.0493 102.6 50.148C107.467 52.2493 111.7 55.1 115.3 58.7C118.9 62.3 121.749 66.5333 123.848 71.4C125.949 76.2667 127 81.4667 127 87C127 92.5333 125.949 97.7333 123.848 102.6C121.749 107.467 118.9 111.7 115.3 115.3C111.7 118.9 107.467 121.749 102.6 123.848C97.7333 125.949 92.5333 127 87 127Z" fill="#41CCB1" fill-opacity="0.75"/>
            </svg>            
        </button>
    </div>
</div>

<style>
     .play--button {
        cursor: pointer;
        transition: scale 50ms ease-in;
        transform-origin: 0 0;
    }
    .play--button:hover {
        scale: 1.05;
    }
    .play--button:hover > svg circle:nth-child(1) {
        fill-opacity: 0.15;
    }
    .play--button:hover > svg circle:nth-child(2) {
        stroke-opacity: 0.08;
    }
    .play--button--component {
        display: inline-flex;
        justify-content: flex-end;
        width: 447px;

        position: absolute;

        right: 102px;
        bottom: 39px;

        transform-origin: 100% 100%;
    }
    .play--button--label {
        position: absolute;
        
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        line-height: 190%;
        margin-right: -25px;

        font-family: 'Outfit';
        font-style: normal;

        text-align: right;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.65);

        z-index: 9;
        pointer-events: none;
    }
    .play--button--label .top {
        font-weight: 600;
        font-size: 24px;
        letter-spacing: 0.05em;
    }
    .play--button--label .btm {
        font-size: 40px;
        font-weight: 700;
        letter-spacing: 6px;
        color: #fff;
    }
    .play--button--wrapper {
        position: relative;

        width: 244px;
        height: 244px;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(155px);
    }
    .play--button {
        position: absolute;
        
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        background: transparent;
        border: 0;
        outline: 0;
    }
</style>