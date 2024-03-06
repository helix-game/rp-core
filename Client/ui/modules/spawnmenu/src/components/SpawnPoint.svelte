<script>
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";

    export let idx;
    export let state = 2;
    export let values = {};
    // export let colours = {
    //     background: 'rgba(131, 112, 255, 0.3)'
    // }

    const dispatch = createEventDispatcher()

    const handleClick = () => {
        if (state !== 3) return;
        dispatch('click', idx)
    }
</script>

<div transition:fly={{ y: '100%' }} style="grid-column-start: {idx + 1}; background-image: url('./assets/spawn_point_{idx}.png');" class="spawn--point {state === 2 ? ' locked' : ''}">
    <!-- <div class="color--overlay" style="background-color: {colours?.background};"></div> -->
    <div class="group">
        {#if state === 1}
            <div class="group online--wrap">
                <span class="label">
                    ONLINE
                </span>
                <span class="online--count">
                    {values?.online}
                </span>
            </div>
        {:else if state === 2}
            <div class="group content">
                <div class="icon">
                    <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 21C1.45 21 0.979333 20.8043 0.588 20.413C0.196 20.021 0 19.55 0 19V9C0 8.45 0.196 7.979 0.588 7.587C0.979333 7.19567 1.45 7 2 7H3V5C3 3.61667 3.48767 2.43733 4.463 1.462C5.43767 0.487333 6.61667 0 8 0C9.38333 0 10.5627 0.487333 11.538 1.462C12.5127 2.43733 13 3.61667 13 5V7H14C14.55 7 15.021 7.19567 15.413 7.587C15.8043 7.979 16 8.45 16 9V19C16 19.55 15.8043 20.021 15.413 20.413C15.021 20.8043 14.55 21 14 21H2ZM8 16C8.55 16 9.021 15.8043 9.413 15.413C9.80433 15.021 10 14.55 10 14C10 13.45 9.80433 12.979 9.413 12.587C9.021 12.1957 8.55 12 8 12C7.45 12 6.97933 12.1957 6.588 12.587C6.196 12.979 6 13.45 6 14C6 14.55 6.196 15.021 6.588 15.413C6.97933 15.8043 7.45 16 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7Z" fill="white"/>
                    </svg>                        
                </div>

                <p>
                    {values?.label}
                </p>

                <div class="divider">
                    <div class="bar--box"></div>
                    <div class="bar"></div>
                    <div class="bar--box"></div>
                </div>
            </div>
        {:else if state === 3}
            <div class="group content">
                <div class="labels">
                    <p class="subheader">
                        {values?.subheader}
                    </p>
                    <p class="main">
                        {values?.label}
                    </p>
                </div>

                <div class="divider">
                    <div class="bar--box"></div>
                    <div class="bar"></div>
                    <div class="bar--box"></div>
                </div>
            </div>
        {/if}
    
        <button on:click={handleClick}>{values?.value}</button>
    </div>
</div>
<style>
    .spawn--point.locked {
        cursor: unset;
    }
    .group .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    .group p {
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        color: #FFFFFF;
        text-align: center;
        width: 100%;
    }
    .group .labels .subheader {
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.65);
        text-transform: uppercase;
    }
    .group .labels .main {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        color: #FFFFFF;
        text-transform: uppercase;
    }
    .divider {
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;

        width: 83px;
    }
    .divider .bar--box {
        width: 3px;
        height: 3px;
        background: #fff;
    }
    .divider .bar {
        height: 1px;
        background: rgba(255, 255, 255, 0.35);
        width: 100%;
    }
    .color--overlay {
        position: absolute;
        inset: 0;
    }
    .spawn--point {
        width: 100%;
        height: 100%;
        border-radius: 10px;

        /* background-image: ; */
        background-size: 100%;
        background-position: center;

        -webkit-mask-image: linear-gradient(180deg, rgba(217, 217, 217, 0.15) 0%, #D9D9D9 47.4%);

        position: relative;

        transition: background-size 50ms ease-in;
        cursor: pointer;
    }
    .spawn--point:not(.locked):hover {
        background-size: 105%;
    }

    .spawn--point > .group {
        position: absolute;
        bottom: 117px;
        left: 50%;
        transform: translateX(-50%);

        width: 100%;
        padding-inline: 15px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .online--wrap {
        display: flex;
        gap: 5px;
    }

    .label {
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 34px;
        text-align: center;
        text-transform: uppercase;
        color: #FFFFFF;

        width: 80px;
        height: 34px;

        display: block;
    }
    
    .online--count {
        display: inline-block;
        padding-inline: 12px;
        height: 34px;
        line-height: 34px;
        background: linear-gradient(99.46deg, #3C3F76 5%, #202566 98.11%);
        border-radius: 10px;
        color: rgba(255, 255, 255, 0.75);
    }


    button {
        margin-top: 22px;

        padding-inline: 36px;
        padding-block: 9px;

        border-radius: 5rem;

        border: 2px solid #fff;
        background: transparent;
        color: #fff;
        
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        align-items: center;
        text-align: center;
        text-transform: uppercase;
    }
    
    .spawn--point:not(.locked) button:hover {
        background: #fff;
        color: #000;
        cursor: pointer;
    }
</style>