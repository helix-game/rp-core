<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import { inventory_state, useOptimisationMode } from '../store/stores';
    import INVENTORY_STATES from '../state';

    export let data;

    var item;
    var itemImage;
    var x;
    var y;

    const dispatch = createEventDispatcher()
    
    const handleMouseMove = e => {
        x = e.clientX;
        y = e.clientY;
        item.style.left = x + 'px' 
        item.style.top = y + 'px'
    }

    const handleMouseUp = (e) => {
        if (document.elementFromPoint(x, y).closest('.hand--over'))
            return dispatch('giveItemToPlayer', data)
        
        if (document.elementFromPoint(x, y).closest('.throw--out'))
            return dispatch('dropItem', data)
        
        var slot = document.elementFromPoint(x, y).closest('.slot')
        
        if (slot)
        {
            var toSlot = {
                slot: parseInt(slot.getAttribute('data-slot')), name: slot.getAttribute('data-name'), extra: slot.getAttribute('data-extra'), id : slot.getAttribute('data-inventory-id') 
            }
            var fromSlot = {
                slot: data.slot, name: data.name, extra: data.extra, id: data.id
            }

            dispatch('dragSlotHandler', { toSlot, fromSlot })
        }
        else
            dispatch('dragSlotHandler', null)
    }
</script>

<div bind:this={item} transition:fade={{delay: 50, duration:50}} class="slot--clone">
    <div bind:this={itemImage} class="item--image" style="background-image: url(./assets/items/{data.name}.png)"></div>
    <div class="amount">{data.count || 0}</div>
</div>

{#if $inventory_state == INVENTORY_STATES.PERSONAL_INVENTORY}
    {#if $useOptimisationMode == false}
        <div transition:fade class="hand--over--glow">
            <svg width="651" height="1080" viewBox="0 0 651 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_14352_81204)">
                <rect x="-463" y="-62" width="514" height="1204" rx="257" fill="white" fill-opacity="0.35"/>
                </g>
                <defs>
                <filter id="filter0_f_14352_81204" x="-1063" y="-662" width="1714" height="2404" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="300" result="effect1_foregroundBlur_14352_81204"/>
                </filter>
                </defs>
            </svg>            
        </div>
        <div transition:fade class="throw--glow">
            <svg width="651" height="1080" viewBox="0 0 651 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_14352_80858)">
                <rect x="600" y="-62" width="514" height="1204" rx="257" fill="#E03232" fill-opacity="0.45"/>
                </g>
                <defs>
                <filter id="filter0_f_14352_80858" x="0" y="-662" width="1714" height="2404" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="300" result="effect1_foregroundBlur_14352_80858"/>
                </filter>
                </defs>
            </svg>                
        </div>
    {/if}
    <div transition:fade class="hand--over">
        <div class="content">
            <div class="icon">
                <svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6C19.6 6 20.1 6.2 20.5 6.6C20.8 7 21 7.5 21 8L13 11L6 9V0H7.9L15.2 2.7C15.7 2.9 16 3.3 16 3.8C16 4.1 15.9 4.4 15.7 4.6C15.5 4.8 15.1 5 14.8 5H12L10.2 4.3L9.9 5.2L12 6H19ZM0 0H4V11H0V0Z" fill="white"/>
                </svg>                
            </div>
            <div class="text">
                <div class="top">
                    Hand Over
                </div>
                <div class="bottom">
                    to the player
                </div>
            </div>
        </div>
    </div>

    <div transition:fade class="throw--out">
        <div class="content">
            <div class="icon">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V6C13 4.9 12.1 4 11 4H3C1.9 4 1 4.9 1 6V16ZM6.65 7.35C6.85 7.15 7.16 7.15 7.36 7.35L11 11H9V15H5V11H3L6.65 7.35ZM10.5 1L9.79 0.29C9.61 0.11 9.35 0 9.09 0H4.91C4.65 0 4.39 0.11 4.21 0.29L3.5 1H1C0.45 1 0 1.45 0 2C0 2.55 0.45 3 1 3H13C13.55 3 14 2.55 14 2C14 1.45 13.55 1 13 1H10.5Z" fill="#E03232"/>
                </svg>                             
            </div>
            <div class="text">
                <div class="top">
                    Throw
                </div>
                <div class="bottom">
                    on the ground
                </div>
            </div>
        </div>
    </div>
{/if}

<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} />
<style>
    .hand--over--glow {
        position: absolute;
        left: 0;
        mix-blend-mode: plus-lighter;
        pointer-events: none;
    }
    .throw--glow {
        position: absolute;
        right: 0;
        pointer-events: none;
    }
    .throw--out {
        position: absolute;
        width: 294px;
        height: 659px;
        
        right: calc(0% - 294px / 2);
        top: 50%;
        transform: translateY(-50%);

        background: rgba(224, 50, 50, 0.03);
        border: 1px dashed rgba(224, 50, 50, 0.3);
        border-radius: 50px;
    }

    .throw--out .icon {
        width: 50px;
        height: 50px;

        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(224, 50, 50, 0.15) 0%, rgba(224, 50, 50, 0) 54.08%, rgba(224, 50, 50, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(224, 50, 50, 0.15);
        border: 1px solid rgba(224, 50, 50, 0.35);
        border-radius: 100%;

        margin-inline: auto;
        margin-bottom: 10px;

        position: relative;
    }

    .throw--out .content {
        position: absolute;
        top: 50%;
        left: 32px;
        transform: translateY(-50%);
    }

    .hand--over {
        position: absolute;
        width: 294px;
        height: 661px;

        left: calc(0% - 294px / 2);
        top: 50%;
        transform: translateY(-50%);

        background: rgba(255, 255, 255, 0.02);
        border: 1px dashed rgba(255, 255, 255, 0.25);
        border-radius: 50px;
    }
    .slot--clone {
        position: absolute;

        transform: translate(-50%, -50%);

        box-sizing: border-box;
        width: 94px;
        height: 94px;

        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 24px;

        z-index: 999;

        pointer-events: none;
    }
    .amount {
        height: 26px;
        padding-inline: 10px;
        background: #FFFFFF;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.45);
        border-radius: 10px;

        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 0.02em;

        width:fit-content;
        line-height: 26px;

        color: #000000;
        position: absolute;
        /* left: 50%; */
        /* top: -20%; */
        z-index: 99;

        bottom: 0;
        left: 0;
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;

        
        /* transform: translateX(-50%); */
    }
    .item--image {
        width: 54px;
        height: 54px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }

    .hand--over .content {
        position: absolute;
        top: 50%;
        right: 36px;
        transform: translateY(-50%);
    }

    .hand--over .content .icon {
        width: 50px;
        height: 50px;

        background: radial-gradient(89.53% 69.19% at 35.47% 23.84%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 54.08%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 100%;
        position: relative;

        margin-inline: auto;
        margin-bottom: 10px;
    }
    .hand--over .content .icon svg, .throw--out .content .icon svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .hand--over .content .text, .throw--out .content .text {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.05em;
        text-align: center;
        color: #FFFFFF;
    }
    .throw--out .content .text {
        color: #E03232;
    }
    
    .hand--over .content .text .top, .throw--out .content .text .top {
        font-size: 16px;
    }
    
    .hand--over .content .text .bottom, .throw--out .content .text .bottom {
        opacity: 0.65;
        font-size: 14px;
    }
</style>